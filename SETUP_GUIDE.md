# Setup Guide - Hackathon Platform

## Prerequisites
- Node.js 18+ installed
- Firebase project created
- Git installed

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Firebase Configuration

Your Firebase is already configured in `firebase/firebaseConfig.ts`. If you need to change it:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings → Your apps → Web app
4. Copy the configuration
5. Update `firebase/firebaseConfig.ts`

## Step 3: Enable Firebase Services

### Enable Authentication

1. Go to Firebase Console → Authentication
2. Click "Get Started"
3. Enable **Email/Password** sign-in method
4. Enable **Google** sign-in method
5. Add authorized domain (your deployment URL)

### Create Firestore Database

1. Go to Firebase Console → Firestore Database
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location close to your users

### Enable Firebase Storage

1. Go to Firebase Console → Storage
2. Click "Get started"
3. Use default security rules (we'll update them)

## Step 4: Set Up Firestore Security Rules

Go to Firestore → Rules and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function to check if user is admin
    function isAdmin() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && request.auth.uid == userId;
      allow update: if isAuthenticated() && request.auth.uid == userId;
      allow delete: if isAdmin();
    }
    
    // Teams collection
    match /teams/{teamId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && 
                       (request.auth.uid in resource.data.members || 
                        request.auth.uid == resource.data.leaderId);
      allow delete: if isAdmin();
    }
    
    // Announcements collection
    match /announcements/{announcementId} {
      allow read: if isAuthenticated();
      allow create, update, delete: if isAdmin();
    }
    
    // Submissions collection
    match /submissions/{submissionId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && 
                       request.auth.uid == resource.data.userId;
      allow delete: if isAdmin();
    }
    
    // Settings collection
    match /settings/{document=**} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }
  }
}
```

## Step 5: Set Up Storage Security Rules

Go to Storage → Rules and paste:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Submissions folder
    match /submissions/{teamId}/{fileName} {
      // Allow read if authenticated
      allow read: if request.auth != null;
      
      // Allow write if authenticated (users can upload)
      allow write: if request.auth != null;
      
      // Allow delete only for admins
      allow delete: if request.auth != null;
    }
  }
}
```

## Step 6: Create First Admin User

1. Start the development server:
```bash
npm run dev
```

2. Visit `http://localhost:3000`
3. Click "Sign Up" and create an account
4. Go to Firebase Console → Firestore
5. Find your user in the `users` collection
6. Edit the document and change `role` from `participant` to `admin`
7. Now you can access the admin panel at `/admin/login`

## Step 7: Initialize Settings

Create a document in Firestore:
- Collection: `settings`
- Document ID: `submissions`
- Fields:
  - `enabled` (boolean): `false`

This controls whether participants can submit projects.

## Step 8: Test the Application

### Test Participant Flow:
1. Sign up as a new user
2. Complete profile
3. Create or join a team
4. View announcements
5. Check submission status

### Test Admin Flow:
1. Login to `/admin/login` with admin account
2. Create an announcement
3. View participants and teams
4. Enable submissions
5. Review submitted projects

## Step 9: Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js
5. Click "Deploy"
6. Add your deployment URL to Firebase authorized domains

## Optional: Environment Variables on Vercel

If you move Firebase config to environment variables:

1. Go to Vercel → Your Project → Settings → Environment Variables
2. Add all variables from `.env.example`
3. Redeploy

## Troubleshooting

### "Permission Denied" Errors
- Check Firestore security rules are deployed
- Verify user is authenticated
- Check user role for admin actions

### "Firebase not initialized"
- Make sure Firebase config is correct
- Check console for initialization errors

### Authentication Not Working
- Verify Email/Password is enabled in Firebase Console
- Check authorized domains include your deployment URL
- Clear browser cache and cookies

### Submissions Not Appearing
- Check `settings/submissions` document exists
- Verify `enabled` field is `true`
- Check storage rules are deployed

## Features Ready to Implement

### Payment Integration (Razorpay)
1. Install Razorpay SDK: `npm install razorpay`
2. Add Razorpay keys to environment variables
3. Implement payment flow in `app/api/payments/`
4. Add payment button in dashboard
5. Update team payment status after verification

### Email Notifications
1. Set up Firebase Cloud Functions
2. Use Nodemailer or SendGrid
3. Send emails on:
   - Account creation
   - Team join/creation
   - Announcement published
   - Submission received

### Judge Panel
1. Create `app/judge/` directory
2. Add `role: 'judge'` to user types
3. Create evaluation interface
4. Link to submissions

## Support

For issues:
1. Check Firebase Console logs
2. Check browser console
3. Verify all setup steps completed
4. Check Firestore/Storage rules

## Next Steps

After basic setup:
1. Customize landing page content
2. Add event-specific information
3. Configure payment amounts
4. Set up email templates
5. Add custom branding
6. Test thoroughly before launch
