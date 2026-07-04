# Firebase Initialization Guide

## 1. Enable Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `hackathon-website-9c32b`
3. Go to **Authentication** → **Get Started**
4. Go to **Sign-in method** tab
5. Enable **Email/Password**
6. Enable **Google** (add your domain)

## 2. Create Firestore Database

1. Go to **Firestore Database** → **Create database**
2. Choose **Start in production mode**
3. Select location (us-central1 recommended)

## 3. Set Firestore Security Rules

Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && request.auth.uid == userId;
      allow update: if isAuthenticated() && request.auth.uid == userId;
      allow delete: if isAdmin();
    }
    
    match /teams/{teamId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && 
                       (request.auth.uid in resource.data.members || 
                        request.auth.uid == resource.data.leaderId);
      allow delete: if isAdmin();
    }
    
    match /announcements/{announcementId} {
      allow read: if isAuthenticated();
      allow create, update, delete: if isAdmin();
    }
    
    match /submissions/{submissionId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isAuthenticated();
      allow delete: if isAdmin();
    }
    
    match /joinRequests/{requestId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() &&
                       (resource.data.userId == request.auth.uid ||
                        isTeamLeader(resource.data.teamId));
      allow delete: if isAdmin();
    }
    
    function isTeamLeader(teamId) {
      return get(/databases/$(database)/documents/teams/$(teamId)).data.leaderId == request.auth.uid;
    }
    
    match /settings/{document=**} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }
  }
}
```

## 4. Enable Storage

1. Go to **Storage** → **Get started**
2. Use default security rules (we'll update later)

## 5. Set Storage Security Rules

Replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /submissions/{teamId}/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
      allow delete: if request.auth != null;
    }
  }
}
```

## 6. Create Initial Settings Document

1. Go to **Firestore Database**
2. Start collection: `settings`
3. Document ID: `submissions`
4. Add field:
   - Field: `enabled`
   - Type: `boolean`
   - Value: `false`

## 7. Create Sample Announcement (Optional)

1. Start collection: `announcements`
2. Auto-generate document ID
3. Add fields:
   - `title` (string): "Welcome to the Hackathon!"
   - `description` (string): "Registration is now open. Join a team and start building!"
   - `visible` (boolean): `true`
   - `createdAt` (timestamp): Use current time

The `joinRequests` collection will be created automatically when users send join requests.

## 8. Test Authentication

1. Run `npm run dev`
2. Visit `http://localhost:3000`
3. Click "Sign Up"
4. Create an account
5. Complete your profile
6. Check Firestore for the user document

## 9. Create Admin User

1. Sign up with your admin email
2. Go to Firestore → `users` collection
3. Find your user document
4. Edit the `role` field from `participant` to `admin`
5. Now you can access `/admin/login`

## 10. Verify Everything Works

- [ ] Sign up/Sign in works
- [ ] Profile completion works
- [ ] Dashboard loads
- [ ] Team creation/joining works
- [ ] Admin panel accessible
- [ ] Announcements display
- [ ] Settings can be toggled

## Troubleshooting

### "Permission denied" errors
- Check security rules are published
- Verify user is authenticated
- Check user role for admin functions

### Authentication issues
- Check Email/Password is enabled
- Verify authorized domains include localhost:3000
- Check Firebase project is active

### "Firebase not initialized"
- Verify firebaseConfig.ts has correct values
- Check console for initialization errors