# Payment Integration Setup Guide

This guide will help you complete the Razorpay payment integration setup.

## Prerequisites

- Razorpay Test Account (already configured)
- Firebase Project with Firestore enabled

## 1. Firebase Admin SDK Setup

The payment API routes use Firebase Admin SDK for secure server-side operations. You need to add Firebase service account credentials.

### Option 1: Using Service Account JSON (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `hackathon-website-9c32b`
3. Click on **Project Settings** (gear icon)
4. Navigate to **Service Accounts** tab
5. Click **Generate New Private Key**
6. Save the downloaded JSON file securely
7. Add to `.env.local`:

```env
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"hackathon-website-9c32b",...}
```

OR as separate variables:

```env
FIREBASE_CLIENT_EMAIL=your-service-account@hackathon-website-9c32b.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Option 2: Application Default Credentials (Development Only)

For local development, you can use:
```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"
```

## 2. Environment Variables

Your `.env.local` should contain:

```env
# Razorpay (Already configured)
RAZORPAY_API_KEY=rzp_test_T9KoPsrfZfRYBi
RAZORPAY_SECRET=BBTsz5Nid3Cpw257KsJCQHMb

# Firebase Admin (Add these)
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
# OR
FIREBASE_CLIENT_EMAIL=your-service-account@...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## 3. Test the Payment Flow

### As Team Leader:

1. **Sign in** to your account
2. **Create a team** or ensure you're the team leader
3. Navigate to **Dashboard → Team**
4. Click **"Register Team (₹199)"**
5. Review the registration summary
6. Accept terms and conditions
7. Click **"Pay ₹199"**

### Razorpay Checkout Opens:

Use these test credentials:

**Test Cards:**
- Success: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date
- OTP: `123456`

**Test UPI:**
- success@razorpay
- failure@razorpay

### Expected Flow:

1. ✅ Razorpay checkout modal opens
2. ✅ Complete test payment
3. ✅ Payment verified on backend
4. ✅ Team status updated to "Registered"
5. ✅ Payment record created in Firestore
6. ✅ Success message shown
7. ✅ Dashboard shows "Registration Completed"

## 4. Verify in Admin Panel

1. Login as admin
2. Navigate to **Admin → Payments**
3. You should see:
   - Total payments count
   - Payment status (Paid/Pending/Failed)
   - Team details
   - Payment IDs
   - Export to CSV option

## 5. Firestore Collections Structure

### `teams` Collection:
```javascript
{
  teamId: "auto-generated",
  teamName: "Team Name",
  teamCode: "BVHACK-XXXXX",
  leaderId: "userId",
  members: ["userId1", "userId2"],
  paymentStatus: "paid", // "pending" | "paid" | "failed"
  registrationStatus: "registered", // "incomplete" | "pending_payment" | "registered"
  paymentId: "pay_xxxxxxxxxxxx",
  orderId: "order_xxxxxxxxxxxx",
  paidAt: Timestamp,
  createdAt: Timestamp
}
```

### `payments` Collection:
```javascript
{
  paymentId: "pay_xxxxxxxxxxxx",
  orderId: "order_xxxxxxxxxxxx",
  teamId: "teamId",
  leaderId: "userId",
  amount: 199,
  currency: "INR",
  status: "paid", // "pending" | "paid" | "failed"
  paymentMethod: "razorpay",
  paidAt: Timestamp,
  createdAt: Timestamp
}
```

## 6. Testing Scenarios

### ✅ Test Cases:

1. **Successful Payment**
   - Use test card: 4111 1111 1111 1111
   - Verify team status changes to "registered"
   - Check payment record in admin panel

2. **Failed Payment**
   - Close Razorpay modal without paying
   - Verify team status remains "incomplete"
   - Leader can retry payment

3. **Duplicate Payment Prevention**
   - Try to pay again after successful payment
   - System should prevent duplicate registration

4. **Payment Signature Verification**
   - Payment verification happens server-side
   - Invalid signatures are rejected

5. **Leader-Only Access**
   - Only team leader can initiate payment
   - Other members see registration status only

## 7. Production Deployment

### Before Going Live:

1. **Update Razorpay Keys:**
   ```env
   RAZORPAY_API_KEY=rzp_live_XXXXXXXXXX
   RAZORPAY_SECRET=XXXXXXXXXXXXXXXXXX
   ```

2. **Enable Razorpay Webhook** (Optional but recommended):
   - Go to Razorpay Dashboard → Webhooks
   - Add webhook URL: `https://yourdomain.com/api/payments/webhook`
   - Select events: `payment.captured`, `payment.failed`
   - Save the webhook secret

3. **Test in Live Mode:**
   - Use real payment methods
   - Verify end-to-end flow
   - Check Razorpay dashboard for transactions

4. **Security Checklist:**
   - ✅ Never expose `RAZORPAY_SECRET` to client
   - ✅ Always verify payment signature on server
   - ✅ Use HTTPS in production
   - ✅ Implement rate limiting on payment APIs
   - ✅ Add request validation and error handling
   - ✅ Monitor failed payments and retry logic

## 8. Troubleshooting

### Error: "Failed to create payment order"
- Check Firebase Admin credentials
- Verify Razorpay API keys
- Check server logs for detailed error

### Error: "Payment verification failed"
- Ensure `RAZORPAY_SECRET` is correct
- Check if signature is being calculated correctly
- Verify teamId and userId are valid

### Razorpay Script Not Loading
- Check internet connection
- Verify no ad blockers are interfering
- Check browser console for errors

### Payment Stuck in "Pending"
- Check if verification API was called
- Verify Firestore write permissions
- Check server logs

## 9. Support

For Razorpay integration issues:
- [Razorpay Docs](https://razorpay.com/docs/)
- [Razorpay Test Mode](https://razorpay.com/docs/payments/payments/test-card-details/)

For Firebase Admin SDK:
- [Firebase Admin Setup](https://firebase.google.com/docs/admin/setup)

## 10. Feature Enhancements (Future)

- [ ] Email notifications on payment success
- [ ] SMS notifications
- [ ] Payment receipts (PDF generation)
- [ ] Refund handling (if needed)
- [ ] Discount codes/coupons
- [ ] Group registration pricing
- [ ] Payment reminder emails
