# Admin Setup Guide

## Creating Your First Admin User

Since the admin panel requires an admin role, you need to create the first admin user manually.

### Step 1: Create a Regular Account
1. Visit your site (http://localhost:3000)
2. Click "Sign Up"
3. Create an account with email/password
4. Complete the profile form

### Step 2: Make Yourself Admin
1. Go to Firebase Console (https://console.firebase.google.com/)
2. Select your project
3. Go to **Firestore Database**
4. Find the `users` collection
5. Locate your user document (by email)
6. Click on your user document
7. Find the `role` field
8. Change the value from `participant` to `admin`
9. Save the changes

### Step 3: Access Admin Panel
1. Go to http://localhost:3000/admin/login
2. Sign in with your admin credentials
3. You should now see the admin dashboard

## Admin Panel Features

Once you're logged in as admin, you'll have access to:

- **Dashboard**: Overview statistics
- **Participants**: View and manage all registered users
- **Teams**: Monitor team formations and statuses
- **Join Requests**: Track team join request activity
- **Announcements**: Create and publish announcements
- **Submissions**: Review project submissions
- **Payments**: Monitor payment status

## Troubleshooting

### "Loading..." stuck on admin login
- Check that you've properly set the user role to 'admin'
- Ensure Firebase connection is working
- Check browser console for errors

### "Access denied" message
- Verify the user role is exactly 'admin' (case-sensitive)
- Make sure you're signed in with the correct account

### Can't see admin pages
- Admin role verification happens server-side
- Clear browser cache if needed
- Check that Firestore rules allow admin access

## Creating Additional Admins

To create more admin users:
1. They sign up normally
2. Go to Firestore → users collection
3. Change their role from 'participant' to 'admin'
4. They can now access /admin/login

## Security Notes

- Admin role is verified server-side in Firestore
- Client-side role checks are for UX only
- Firestore security rules enforce admin permissions
- Never rely on client-side admin checks for sensitive operations