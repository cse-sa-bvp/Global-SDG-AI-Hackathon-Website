# 💳 Razorpay Payment Integration

Complete implementation of Razorpay payment flow for hackathon team registration.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Documentation](#documentation)
- [Testing](#testing)
- [Production Deployment](#production-deployment)

## 🎯 Overview

This implementation provides a complete, production-ready payment flow for hackathon registration using Razorpay. The registration fee is ₹199 per team, and only the team leader can initiate payment.

### Payment Flow
```
User Journey:
Landing Page → Sign Up → Create/Join Team → Register Team → Pay → Success

Technical Flow:
Frontend → Create Order API → Razorpay Checkout → Payment Success 
→ Verify API → Update Firestore → Show Success
```

## ✨ Features

### ✅ Complete Implementation
- **No placeholders** - All functionality is implemented
- **Production-ready** - Follows Razorpay best practices
- **Secure** - Server-side verification, signature validation
- **User-friendly** - Clear UI/UX with loading states and error handling

### 🔐 Security
- ✅ Payment signature verification (HMAC SHA256)
- ✅ Server-side order creation
- ✅ Leader-only payment access
- ✅ Duplicate payment prevention
- ✅ Secrets never exposed to client

### 💰 Payment Features
- ✅ Razorpay Checkout integration
- ✅ Multiple payment methods (Cards, UPI, Netbanking, Wallets)
- ✅ Test mode with test credentials
- ✅ Payment retry on failure
- ✅ Webhook support (optional)

### 📊 Admin Panel
- ✅ View all payments
- ✅ Filter by status (Paid/Pending/Failed)
- ✅ Search functionality
- ✅ Export to CSV
- ✅ Revenue statistics

## 🚀 Quick Start

### 1. Verify Installation
```bash
node scripts/verify-payment-setup.js
```

### 2. Setup Firebase Admin (Required)

Add to `.env.local`:
```env
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"hackathon-website-9c32b",...}
```

See [PAYMENT_SETUP.md](./PAYMENT_SETUP.md) for detailed instructions.

### 3. Start Development Server
```bash
npm run dev
```

### 4. Test Payment Flow

1. **Sign in** as a user
2. **Create a team** (you'll be the leader)
3. Navigate to **Dashboard → Team**
4. Click **"Register Team (₹199)"**
5. Accept terms and click **"Pay ₹199"**
6. Use test card: `4111 1111 1111 1111`
7. CVV: `123`, OTP: `123456`
8. Payment completes successfully! ✅

See [RAZORPAY_TEST_GUIDE.md](./RAZORPAY_TEST_GUIDE.md) for more test scenarios.

## 🏗️ Architecture

### Backend API Routes

#### 1. Create Order (`/api/payments/create-order`)
```typescript
POST /api/payments/create-order
Body: { teamId, userId }

Response: {
  success: true,
  orderId: "order_xxxxx",
  amount: 199,
  currency: "INR",
  key: "rzp_test_xxxxx"
}
```

**What it does:**
- Validates team leader access
- Creates Razorpay order
- Updates team status to "pending_payment"
- Returns order details for frontend

#### 2. Verify Payment (`/api/payments/verify`)
```typescript
POST /api/payments/verify
Body: {
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  teamId,
  userId
}

Response: {
  success: true,
  message: "Payment verified successfully"
}
```

**What it does:**
- Verifies payment signature (crypto)
- Validates permissions
- Updates team status to "registered"
- Creates payment record
- Prevents duplicate processing

#### 3. Webhook (`/api/payments/webhook`)
```typescript
POST /api/payments/webhook
Headers: { x-razorpay-signature }
Body: Razorpay webhook event

Response: { success: true, received: true }
```

**What it does:**
- Receives payment events from Razorpay
- Verifies webhook signature
- Updates payment status asynchronously
- Handles payment.captured, payment.failed

### Frontend Components

#### 1. Registration Dialog
**File:** `components/payment/RegistrationDialog.tsx`

Features:
- Shows team details and members
- Displays payment amount
- Terms & conditions checkbox
- Razorpay script loader
- Payment success animation

#### 2. Team Dashboard
**File:** `app/dashboard/team/page.tsx`

Features:
- "Register Team" button (leader only)
- Payment status display
- Registration completion UI
- Retry payment option

#### 3. Admin Payments
**File:** `app/admin/payments/page.tsx`

Features:
- Payments list with filters
- Search functionality
- Export to CSV
- Statistics dashboard

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [PAYMENT_SETUP.md](./PAYMENT_SETUP.md) | Complete setup guide with Firebase Admin instructions |
| [RAZORPAY_TEST_GUIDE.md](./RAZORPAY_TEST_GUIDE.md) | Test credentials and scenarios |
| [PAYMENT_IMPLEMENTATION_SUMMARY.md](./PAYMENT_IMPLEMENTATION_SUMMARY.md) | Technical implementation details |

## 🧪 Testing

### Test Cards
```
Success: 4111 1111 1111 1111
Failure: 4000 0000 0000 0002
CVV:     Any 3 digits
Expiry:  Any future date
OTP:     123456
```

### Test UPI
```
Success: success@razorpay
Failure: failure@razorpay
```

### Test Scenarios

Run through these scenarios:

1. ✅ **Successful Payment**
   - Complete payment with test card
   - Verify team status updates
   - Check admin panel

2. ✅ **Payment Cancellation**
   - Close Razorpay modal
   - Verify status unchanged
   - Retry payment works

3. ✅ **Payment Failure**
   - Use failure test card
   - Verify error handling
   - Retry payment available

4. ✅ **Duplicate Prevention**
   - Try paying twice
   - System prevents duplicate

5. ✅ **Non-Leader Access**
   - Login as team member
   - Cannot initiate payment
   - Can view status

See [RAZORPAY_TEST_GUIDE.md](./RAZORPAY_TEST_GUIDE.md) for detailed test procedures.

## 🚢 Production Deployment

### 1. Get Live Razorpay Keys

1. Complete KYC on Razorpay Dashboard
2. Activate live mode
3. Get live API keys
4. Update `.env.local`:
   ```env
   RAZORPAY_API_KEY=rzp_live_XXXXXXXXXX
   RAZORPAY_SECRET=XXXXXXXXXXXXXXXXXX
   ```

### 2. Setup Webhook (Optional but Recommended)

1. Go to Razorpay Dashboard → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/payments/webhook`
3. Select events: `payment.captured`, `payment.failed`
4. Copy webhook secret
5. Add to `.env.local`:
   ```env
   RAZORPAY_WEBHOOK_SECRET=whsec_XXXXXXXXXX
   ```

### 3. Production Checklist

- [ ] Live Razorpay keys configured
- [ ] Firebase Admin credentials added
- [ ] HTTPS enabled
- [ ] Error monitoring setup
- [ ] Webhook configured (optional)
- [ ] Test live payment flow
- [ ] Monitor first transactions

### 4. Go Live

```bash
npm run build
npm run start
```

Or deploy to Vercel:
```bash
vercel --prod
```

## 📊 Data Structure

### Firestore Collections

#### `teams` Collection
```javascript
{
  teamId: string,
  teamName: string,
  teamCode: string,
  leaderId: string,
  members: string[],
  paymentStatus: "pending" | "paid" | "failed",
  registrationStatus: "incomplete" | "pending_payment" | "registered",
  paymentId?: string,
  orderId?: string,
  paidAt?: Timestamp,
  createdAt: Timestamp
}
```

#### `payments` Collection
```javascript
{
  id: string,
  paymentId: string,
  orderId: string,
  teamId: string,
  leaderId: string,
  amount: 199,
  currency: "INR",
  status: "paid" | "pending" | "failed",
  paymentMethod: string,
  paidAt: Timestamp,
  createdAt: Timestamp
}
```

## 🔧 Troubleshooting

### Common Issues

**"Failed to create payment order"**
- Check Firebase Admin credentials in `.env.local`
- Verify Razorpay API keys are correct
- Check server logs for detailed error

**"Payment verification failed"**
- Ensure `RAZORPAY_SECRET` is correct
- Check signature calculation
- Verify teamId and userId are valid

**Razorpay script not loading**
- Check internet connection
- Disable ad blockers
- Check browser console

**Payment stuck in "Pending"**
- Check if verification API was called
- Verify Firestore write permissions
- Check server logs for errors

### Debug Mode

Enable detailed logs:
```javascript
// In browser console
localStorage.setItem('debug', 'razorpay:*');
```

## 📞 Support

### Razorpay
- [Documentation](https://razorpay.com/docs/)
- [Test Mode Guide](https://razorpay.com/docs/payments/payments/test-card-details/)
- [Support](https://razorpay.com/support/)

### Firebase
- [Admin SDK Setup](https://firebase.google.com/docs/admin/setup)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)

## 📈 Monitoring

### Key Metrics to Track

1. **Payment Success Rate**
   - Total payments / Successful payments

2. **Average Payment Time**
   - Time from order creation to verification

3. **Failure Reasons**
   - Card declined, User cancelled, etc.

4. **Revenue**
   - Total amount collected

View these in Admin Panel at `/admin/payments`

## 🎯 Future Enhancements

Possible improvements:

- [ ] Email notifications on payment success
- [ ] SMS confirmations
- [ ] Payment receipts (PDF generation)
- [ ] Discount codes/coupons
- [ ] Group registration pricing
- [ ] Refund handling
- [ ] Payment analytics dashboard
- [ ] Automated reminders

## 📝 Files Overview

### Created Files
```
app/
  api/
    payments/
      create-order/route.ts    # Order creation API
      verify/route.ts          # Payment verification API
      webhook/route.ts         # Webhook handler
  admin/
    payments/page.tsx          # Admin payments dashboard
  dashboard/
    team/page.tsx              # Updated with payment UI
    
components/
  payment/
    RegistrationDialog.tsx     # Payment dialog component
  ui/
    checkbox.tsx               # UI component
    separator.tsx              # UI component
    tabs.tsx                   # UI component
    table.tsx                  # UI component
    
lib/
  razorpay.ts                  # Razorpay utilities
  firebase/admin.ts            # Firebase Admin SDK
  
types/index.ts                 # Updated types
scripts/verify-payment-setup.js # Verification script
```

### Documentation Files
```
PAYMENT_SETUP.md                      # Setup guide
PAYMENT_IMPLEMENTATION_SUMMARY.md     # Implementation details
RAZORPAY_TEST_GUIDE.md               # Testing guide
PAYMENT_README.md                    # This file
```

## ✅ Status

**Implementation:** ✅ Complete  
**Test Mode:** ✅ Ready  
**Production:** ⚠️ Requires Firebase Admin credentials  

---

**Ready to test?** Run `npm run dev` and navigate to `/dashboard/team` after creating a team!

For detailed setup instructions, see [PAYMENT_SETUP.md](./PAYMENT_SETUP.md)
