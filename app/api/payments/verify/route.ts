import { NextRequest, NextResponse } from 'next/server';
// import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, teamId } =
      await request.json();

    // TODO: Verify signature
    // const sign = razorpay_order_id + '|' + razorpay_payment_id;
    // const expectedSign = crypto
    //   .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    //   .update(sign.toString())
    //   .digest('hex');

    // if (razorpay_signature === expectedSign) {
    //   // Update payment status in Firestore
    //   // Update team payment status to 'completed'
    //   return NextResponse.json({ success: true, message: 'Payment verified' });
    // }

    return NextResponse.json({
      success: true,
      message: 'Payment verification API not implemented yet',
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}
