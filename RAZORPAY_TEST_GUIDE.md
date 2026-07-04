# Razorpay Test Mode - Quick Reference

## 🎯 Test Credentials

### Test Credit/Debit Cards

#### ✅ Successful Payments
```
Card Number:  4111 1111 1111 1111
CVV:          Any 3 digits (e.g., 123)
Expiry:       Any future date (e.g., 12/25)
Name:         Any name
OTP:          123456
```

#### ❌ Failed Payments
```
Card Number:  4000 0000 0000 0002
CVV:          Any 3 digits
Expiry:       Any future date
```

### Test UPI IDs
```
Success:  success@razorpay
Failure:  failure@razorpay
```

### Test Netbanking
```
Bank:     Any test bank
Status:   Will prompt to select success/failure
```

### Test Wallets
All test wallets will show success/failure options during testing.

## 🧪 Test Scenarios

### 1. Successful Payment Flow
```bash
1. Login as team leader
2. Navigate to Dashboard → Team
3. Click "Register Team (₹199)"
4. Review registration summary
5. Check terms & conditions
6. Click "Pay ₹199"
7. Use card: 4111 1111 1111 1111
8. Enter CVV: 123
9. Enter OTP: 123456
10. Payment succeeds
11. Dashboard shows "Registration Completed"
```

**Expected Result:**
- ✅ Payment verified
- ✅ Team status: "registered"
- ✅ Payment status: "paid"
- ✅ Payment record in admin panel

### 2. Payment Cancellation
```bash
1-6. Same as above
7. Close Razorpay modal (X button)
```

**Expected Result:**
- ✅ Payment cancelled
- ✅ Team status unchanged
- ✅ Can retry payment
- ✅ No payment record created

### 3. Payment Failure
```bash
1-6. Same as above
7. Use card: 4000 0000 0000 0002
8. Payment fails
```

**Expected Result:**
- ✅ Error message shown
- ✅ Team status: "failed"
- ✅ Can retry payment

### 4. Duplicate Payment Prevention
```bash
1. Complete successful payment (Scenario 1)
2. Try to click "Register Team" again
```

**Expected Result:**
- ✅ Button disabled or shows "Already Registered"
- ✅ Cannot create duplicate order

### 5. Non-Leader Access
```bash
1. Login as team member (not leader)
2. Navigate to Dashboard → Team
```

**Expected Result:**
- ✅ No "Register Team" button visible
- ✅ Shows registration status only

## 🔍 Verification Checklist

After each test payment, verify:

### In Application:
- [ ] Dashboard shows correct registration status
- [ ] Team page shows payment details
- [ ] Payment ID displayed correctly
- [ ] Payment date recorded

### In Admin Panel (`/admin/payments`):
- [ ] Payment appears in list
- [ ] Correct team name
- [ ] Correct leader information
- [ ] Amount shows ₹199
- [ ] Status is "Paid"
- [ ] Payment ID matches
- [ ] Timestamp is accurate

### In Firestore:
- [ ] Team document updated:
  - paymentStatus: "paid"
  - registrationStatus: "registered"
  - paymentId: "pay_xxxxx"
  - orderId: "order_xxxxx"
  - paidAt: [Timestamp]

- [ ] Payment document created:
  - All fields populated
  - Status: "paid"
  - Amount: 199
  - Currency: "INR"

### In Razorpay Dashboard:
1. Go to https://dashboard.razorpay.com/
2. Navigate to Transactions → Payments
3. Verify test payment appears
4. Check payment status and amount

## 🎨 Test Different Payment Methods

### Cards
- ✅ Credit card
- ✅ Debit card
- ✅ International cards

### UPI
- ✅ Enter: success@razorpay
- ✅ Click Pay

### Netbanking
- ✅ Select test bank
- ✅ Choose success option

### Wallets
- ✅ Select wallet
- ✅ Authenticate

## 🚨 Common Issues & Solutions

### Issue: Razorpay script not loading
**Solution:**
- Check internet connection
- Disable ad blockers
- Check browser console for errors

### Issue: "Failed to create order"
**Solution:**
- Verify Firebase Admin credentials
- Check Razorpay API keys in .env.local
- Check server logs

### Issue: Payment succeeds but not verified
**Solution:**
- Check RAZORPAY_SECRET is correct
- Verify signature calculation
- Check Firestore permissions

### Issue: "Only team leader can initiate payment"
**Solution:**
- Ensure logged-in user is the team leader
- Check team data in Firestore

## 📊 Test Data Overview

| Test Type | Card Number | Expected Result |
|-----------|-------------|-----------------|
| Success | 4111 1111 1111 1111 | Payment succeeds |
| Failure | 4000 0000 0000 0002 | Payment fails |
| UPI Success | success@razorpay | Payment succeeds |
| UPI Failure | failure@razorpay | Payment fails |

## 🔐 Security Tests

### 1. Signature Verification
Try to call `/api/payments/verify` with invalid signature:
```javascript
// Should be rejected
{
  razorpay_signature: "invalid_signature",
  razorpay_payment_id: "pay_xxxxx",
  razorpay_order_id: "order_xxxxx"
}
```

**Expected:** ❌ 400 Bad Request - "Invalid payment signature"

### 2. Non-Leader Verification
Try to verify payment as non-leader:

**Expected:** ❌ 403 Forbidden - "Only team leader can verify payment"

### 3. Duplicate Processing
Call verify API twice with same payment:

**Expected:** ✅ Second call returns "already processed"

## 📈 Performance Testing

### Load Test Scenario
1. Create 10 teams
2. Initiate payment for all simultaneously
3. Complete all payments
4. Verify all processed correctly

**Expected:**
- All payments processed
- No duplicate entries
- Correct Firestore updates
- Admin panel shows all payments

## 🎯 User Acceptance Testing

### Team Leader Journey
1. ✅ Can see "Register Team" button
2. ✅ Registration summary is clear
3. ✅ Payment amount is visible
4. ✅ Terms must be accepted
5. ✅ Razorpay opens smoothly
6. ✅ Success message is clear
7. ✅ Dashboard updates immediately

### Team Member Journey
1. ✅ Cannot initiate payment
2. ✅ Can view registration status
3. ✅ See when leader completes payment
4. ✅ Dashboard shows registered status

### Admin Journey
1. ✅ View all payments
2. ✅ Filter by status works
3. ✅ Search is functional
4. ✅ Export CSV works
5. ✅ Stats are accurate

## 📝 Test Report Template

After testing, document results:

```markdown
## Test Report - [Date]

### Environment
- Mode: Test
- Razorpay Key: rzp_test_xxxxx
- Firebase Project: hackathon-website-9c32b

### Test Results
- [ ] Successful payment
- [ ] Failed payment
- [ ] Payment cancellation
- [ ] Duplicate prevention
- [ ] Non-leader access
- [ ] Admin panel display
- [ ] Firestore updates
- [ ] Email notifications (if enabled)

### Issues Found
1. [Issue description]
   - Severity: High/Medium/Low
   - Status: Open/Fixed

### Recommendations
- [Any improvements or fixes needed]

### Sign-off
Tested by: [Name]
Date: [Date]
Status: Ready for Production / Needs Fixes
```

## 🚀 Ready for Production?

Before switching to Live mode:
- [ ] All test scenarios pass
- [ ] Security tests pass
- [ ] Performance is acceptable
- [ ] Admin panel working
- [ ] No console errors
- [ ] Firestore permissions correct
- [ ] Error handling works
- [ ] User experience is smooth

## 📞 Support

**Razorpay Test Mode Docs:**
https://razorpay.com/docs/payments/payments/test-card-details/

**Integration Support:**
https://razorpay.com/docs/api/

**Issues:**
Check server logs and browser console for detailed errors.
