'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { X, Users, CreditCard, CheckCircle } from 'lucide-react';
import { loadRazorpayScript, openRazorpayCheckout } from '@/lib/razorpay';
import type { Team, User } from '@/types';

interface RegistrationDialogProps {
  team: Team;
  teamMembers: User[];
  currentUser: User;
  onClose: () => void;
  onSuccess: () => void;
}

export function RegistrationDialog({
  team,
  teamMembers,
  currentUser,
  onClose,
  onSuccess,
}: RegistrationDialogProps) {
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'summary' | 'processing' | 'success'>('summary');

  const REGISTRATION_FEE = 199;

  const handleProceedToPayment = async () => {
    if (!acceptedTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    setLoading(true);
    setPaymentStep('processing');

    try {
      // Load Razorpay script
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error('Failed to load payment gateway');
        setPaymentStep('summary');
        setLoading(false);
        return;
      }

      // Create order
      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamId: team.teamId,
          userId: currentUser.uid,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Open Razorpay checkout
      openRazorpayCheckout({
        key: orderData.key,
        amount: orderData.amount * 100,
        currency: orderData.currency,
        name: 'Global SDG AI Hackathon',
        description: 'Team Registration Fee',
        order_id: orderData.orderId,
        handler: async (response) => {
          // Payment successful, verify on backend
          await handlePaymentSuccess(response);
        },
        prefill: {
          name: currentUser.name,
          email: currentUser.email,
          contact: currentUser.phone,
        },
        theme: {
          color: '#000000',
        },
        modal: {
          ondismiss: () => {
            setPaymentStep('summary');
            setLoading(false);
            toast.info('Payment cancelled');
          },
        },
      });

      setLoading(false);
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Failed to initiate payment');
      setPaymentStep('summary');
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (response: any) => {
    setLoading(true);
    try {
      const verifyResponse = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          teamId: team.teamId,
          userId: currentUser.uid,
        }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyData.success) {
        throw new Error(verifyData.error || 'Payment verification failed');
      }

      setPaymentStep('success');
      toast.success('Payment successful! Registration completed.');
      
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (error: any) {
      console.error('Verification error:', error);
      toast.error(error.message || 'Payment verification failed');
      setPaymentStep('summary');
    } finally {
      setLoading(false);
    }
  };

  if (paymentStep === 'success') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-center">Registration Successful!</CardTitle>
            <CardDescription className="text-center">
              Your team has been successfully registered for the hackathon.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-neutral-600 mb-4">
              Redirecting to dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Registration Summary</CardTitle>
              <CardDescription>Review your team details before proceeding</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              disabled={loading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Team Details */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Details
            </h3>
            <div className="space-y-2 bg-neutral-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-neutral-600">Team Name:</span>
                <span className="font-medium">{team.teamName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Team Code:</span>
                <span className="font-mono font-medium">{team.teamCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Team Members:</span>
                <span className="font-medium">{teamMembers.length}/4</span>
              </div>
            </div>
          </div>

          {/* Team Members List */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Members</h3>
            <div className="space-y-2">
              {teamMembers.map((member, index) => (
                <div
                  key={member.uid}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-neutral-600">{member.email}</p>
                  </div>
                  {member.uid === team.leaderId && (
                    <span className="text-xs bg-neutral-900 text-white px-2 py-1 rounded">
                      Leader
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Payment Details */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Details
            </h3>
            <div className="space-y-2 bg-neutral-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-neutral-600">Registration Fee:</span>
                <span className="font-medium">₹{REGISTRATION_FEE}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Processing Fee:</span>
                <span className="font-medium">₹0</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount:</span>
                <span>₹{REGISTRATION_FEE}</span>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
              disabled={loading}
            />
            <Label
              htmlFor="terms"
              className="text-sm leading-relaxed cursor-pointer"
            >
              I agree to the{' '}
              <a href="/terms" target="_blank" className="text-blue-600 hover:underline">
                terms and conditions
              </a>{' '}
              and understand that the registration fee is non-refundable.
            </Label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleProceedToPayment}
              disabled={!acceptedTerms || loading}
              className="flex-1"
              size="lg"
            >
              {loading ? 'Processing...' : `Pay ₹${REGISTRATION_FEE}`}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              disabled={loading}
              size="lg"
            >
              Cancel
            </Button>
          </div>

          {/* Security Note */}
          <p className="text-xs text-center text-neutral-500">
            🔒 Your payment is secured by Razorpay. We never store your card details.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
