import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { updateDocument, getDocument, FieldValue } from '@/lib/firebase/server';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

const REGISTRATION_FEE = 199; // in INR

export async function POST(request: NextRequest) {
  try {
    const { teamId, userId } = await request.json();

    if (!teamId || !userId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
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
        { success: false, error: 'Only team leader can initiate payment' },
        { status: 403 }
      );
    }

    if (teamData?.paymentStatus === 'paid') {
      return NextResponse.json(
        { success: false, error: 'Team has already paid' },
        { status: 400 }
      );
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: REGISTRATION_FEE * 100, // Convert to paise
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`, // Shortened receipt (max 40 chars)
      notes: {
        teamId,
        leaderId: userId,
        teamName: teamData?.teamName || '',
      },
    });

    // Update team status to pending_payment
    await updateDocument('teams', teamId, {
      registrationStatus: 'pending_payment',
      orderId: order.id,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: REGISTRATION_FEE,
      currency: 'INR',
      key: process.env.RAZORPAY_API_KEY,
    });
  } catch (error: any) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error?.message || 'Failed to create payment order' 
      },
      { status: 500 }
    );
  }
}
