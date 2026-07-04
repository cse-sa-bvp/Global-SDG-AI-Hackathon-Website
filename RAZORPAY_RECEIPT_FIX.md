# Razorpay Receipt Length Fix

## Error
```
Payment creation error: {
  statusCode: 400,
  error: {
    code: 'BAD_REQUEST_ERROR',
    description: 'receipt: the length must be no more than 40.',
    reason: 'input_validation_failed'
  }
}
```

## Root Cause
Razorpay has a **maximum limit of 40 characters** for the receipt ID.

Our receipt format was too long:
```javascript
`receipt_${teamId}_${Date.now()}`
// Example: receipt_abc123def456_1720084800000 (36+ chars)
// With longer teamId could exceed 40 chars
```

## Fix Applied

**File:** `app/api/payments/create-order/route.ts`

**Before:**
```javascript
receipt: `receipt_${teamId}_${Date.now()}`
```

**After:**
```javascript
receipt: `rcpt_${Date.now()}`
// Example: rcpt_1720084800000 (18 chars) ✓
```

## Why This Works

1. **Shorter prefix:** `rcpt_` instead of `receipt_`
2. **Single identifier:** Just timestamp, not teamId + timestamp
3. **Team info preserved:** teamId is still in the `notes` field
4. **Length:** ~18 characters (well under 40 limit) ✓

## Receipt ID Explanation

The receipt ID is just an internal reference for your records. The important data (teamId, leaderId, teamName) is stored in the `notes` field, which has no length limit.

```javascript
{
  receipt: `rcpt_${Date.now()}`,  // Short reference
  notes: {
    teamId: 'team123',            // Full team data preserved
    leaderId: 'user456',
    teamName: 'Amazing Coders'
  }
}
```

## Testing

Clear cache and restart:
```bash
# Cache already cleared
npm run dev
```

Then test payment:
1. Go to `/dashboard/team?action=register`
2. Click "Pay ₹199"
3. Complete test payment
4. Should work now! ✅

## Status

✅ **Fixed** - Receipt ID now under 40 characters
✅ **Team data** - Still preserved in notes field
✅ **Ready to test** - Restart dev server and try again
