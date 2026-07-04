import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { adminDb, FieldValue } from '@/lib/firebase/admin';

/**
 * Razorpay Webhook Handler
 * 
 * This endpoint receives webhook events from Razorpay for payment status updates.
 * Webhooks provide a reliable way to track payments even if users close the browser.
 * 
 * Setup in Razorpay Dashboard:
 * 1. Go to Settings → Webhooks
 * 2. Add webhook URL: https://yourdomain.com/api/payments/webhook
 * 3. Select events: payment.captured, payment.failed, payment.authorized
 * 4. Copy the webhook secret and add to .env.local as RAZORPAY_WEBHOOK_SECRET
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json(
        { success: false, error: 'Missing signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    if (webhookSecret) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex');

      if (signature !== expectedSignature) {
        console.error('Invalid webhook signature');
        return NextResponse.json(
          { success: false, error: 'Invalid signature' },
          { status: 400 }
        );
      }
    }

    const event = JSON.parse(body);
    const { entity: payment, event: eventType } = event;

    console.log(`Webhook received: ${eventType}`, payment);

    // Handle different webhook events
    switch (eventType) {
      case 'payment.captured':
        await handlePaymentCaptured(payment);
        break;

      case 'payment.failed':
        await handlePaymentFailed(payment);
        break;

      case 'payment.authorized':
        // Payment is authorized but not captured yet
        console.log('Payment authorized:', payment.id);
        break;

      default:
        console.log('Unhandled webhook event:', eventType);
    }

    return NextResponse.json({ success: true, received: true });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handlePaymentCaptured(payment: any) {
  try {
    const orderId = payment.order_id;
    const paymentId = payment.id;

    // Find team by orderId
    const teamsSnapshot = await adminDb
      .collection('teams')
      .where('orderId', '==', orderId)
      .limit(1)
      .get();

    if (teamsSnapshot.empty) {
      console.error('Team not found for order:', orderId);
      return;
    }

    const teamDoc = teamsSnapshot.docs[0];
    const teamData = teamDoc.data();
    const teamId = teamDoc.id;

    // Check if already processed
    if (teamData.paymentStatus === 'paid' && teamData.paymentId === paymentId) {
      console.log('Payment already processed:', paymentId);
      return;
    }

    // Update team status
    await teamDoc.ref.update({
      paymentStatus: 'paid',
      registrationStatus: 'registered',
      paymentId: paymentId,
      paidAt: FieldValue.serverTimestamp(),
    });

    // Create payment record if it doesn't exist
    const paymentsSnapshot = await adminDb
      .collection('payments')
      .where('paymentId', '==', paymentId)
      .limit(1)
      .get();

    if (paymentsSnapshot.empty) {
      await adminDb.collection('payments').add({
        paymentId: paymentId,
        orderId: orderId,
        teamId: teamId,
        leaderId: teamData.leaderId,
        amount: payment.amount / 100, // Convert from paise to rupees
        currency: payment.currency,
        status: 'paid',
        paymentMethod: payment.method,
        paidAt: FieldValue.serverTimestamp(),
        createdAt: FieldValue.serverTimestamp(),
      });
    }

    console.log('Payment captured and processed:', paymentId);
  } catch (error) {
    console.error('Error handling payment.captured:', error);
    throw error;
  }
}

async function handlePaymentFailed(payment: any) {
  try {
    const orderId = payment.order_id;
    const paymentId = payment.id;

    // Find team by orderId
    const teamsSnapshot = await adminDb
      .collection('teams')
      .where('orderId', '==', orderId)
      .limit(1)
      .get();

    if (teamsSnapshot.empty) {
      console.error('Team not found for order:', orderId);
      return;
    }

    const teamDoc = teamsSnapshot.docs[0];

    // Update team status to failed (they can retry)
    await teamDoc.ref.update({
      paymentStatus: 'failed',
      registrationStatus: 'incomplete',
    });

    console.log('Payment failed:', paymentId);
  } catch (error) {
    console.error('Error handling payment.failed:', error);
    throw error;
  }
}

// Disable body parsing to get raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};
