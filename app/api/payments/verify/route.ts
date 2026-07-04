import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { updateDocument, getDocument, addDocument, FieldValue } from '@/lib/firebase/server';

export async function POST(request: NextRequest) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      teamId,
      userId 
    } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !teamId || !userId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET!)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Verify team exists and user is the leader
    const teamDoc = await getDocument('teams', teamId);

    if (!teamDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Team not found' },
        { status: 404 }
      );
    }

    const teamData = teamDoc.data();

    if (teamData?.leaderId !== userId) {
      return NextResponse.json(
        { success: false, error: 'Only team leader can verify payment' },
        { status: 403 }
      );
    }

    // Check if payment is already processed to prevent duplicate processing
    if (teamData?.paymentStatus === 'paid' && teamData?.paymentId === razorpay_payment_id) {
      return NextResponse.json({
        success: true,
        message: 'Payment already processed',
        alreadyProcessed: true,
      });
    }

    // Update team document
    await updateDocument('teams', teamId, {
      paymentStatus: 'paid',
      registrationStatus: 'registered',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      paidAt: FieldValue.serverTimestamp(),
    });

    // Create payment record
    await addDocument('payments', {
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      teamId,
      leaderId: userId,
      amount: 199,
      currency: 'INR',
      status: 'paid',
      paymentMethod: 'razorpay',
      paidAt: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
    });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error?.message || 'Payment verification failed' 
      },
      { status: 500 }
    );
  }
}
