# Hackathon Platform Implementation Guide

## Overview
Complete authentication and registration system for the Global SDG-AI Hackathon platform built with Next.js 15, Firebase, TypeScript, and Tailwind CSS with **approval-based team registration workflow**.

## Features Implemented

### 1. Authentication System
- Email/Password signup and signin
- Google OAuth integration
- Protected routes with proper role checking
- Session persistence
- Profile completion flow

### 2. User Dashboard
- Registration status tracking (Incomplete → Pending Payment → Registered)
- Payment status monitoring
- Team management with approval system
- Recent announcements feed
- Profile management

### 3. **Approval-Based Team Management**
- Create team with unique code (BVHACK-XXXXX)
- **Join Request System**: Users send join requests instead of directly joining
- Team leader receives join requests with user details
- Leader can Accept/Reject requests with full control
- Maximum 4 members per team with proper validation
- Real-time status updates (Pending → Accepted/Rejected)

### 4. **Smart Register Now Button**
- Redirects to signup if not logged in
- Redirects to team page if user has no team
- Shows registration dialog for team leaders
- Initiates registration flow (Incomplete → Pending Payment)
- Proper validation and user flow management

### 5. Announcements
- Real-time announcement feed
- Visibility controls
- Chronological ordering
- Admin-controlled publishing

### 6. Submissions
- Project submission form
- GitHub repository linking
- PPT file upload to Firebase Storage
- Admin enable/disable toggle
- Team-based submissions

### 7. **Enhanced Admin Panel**
- Dashboard with comprehensive statistics
- Participant management with search and CSV export
- Team management with new registration statuses
- **Join Requests monitoring page**
- Announcement creation and publishing
- Submission review and download
- Payment status tracking
- Proper role-based access control

## Project Structure

```
app/
├── (landing)/           # Landing page group
│   ├── page.tsx
│   └── layout.tsx
├── auth/               # Authentication pages
│   ├── signin/
│   ├── signup/
│   ├── complete-profile/
│   └── layout.tsx
├── dashboard/          # Participant dashboard
│   ├── page.tsx
│   ├── team/           # Enhanced with approval system
│   ├── announcements/
│   ├── submission/
│   ├── profile/
│   └── layout.tsx
├── admin/             # Admin panel
│   ├── page.tsx
│   ├── participants/
│   ├── teams/
│   ├── join-requests/  # NEW: Monitor join requests
│   ├── announcements/
│   ├── submissions/
│   ├── payments/
│   └── layout.tsx
├── api/               # API routes (payment ready)
└── layout.tsx

components/
├── ui/                # shadcn components
├── dashboard/         # Dashboard-specific components
├── header.tsx         # Smart Register Now button
└── ...

lib/
├── firebase/          # Firebase services
│   ├── auth.ts
│   ├── firestore.ts   # Enhanced with arrayUnion
│   └── storage.ts
└── utils/
    └── team.ts

hooks/
└── useAuth.ts         # Simplified auth hook

types/
└── index.ts           # Updated with JoinRequest interface
```

## Firebase Collections

### users
```typescript
{
  uid: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  gender?: string;
  role: 'participant' | 'admin';
  teamId?: string;
  createdAt: Timestamp;
}
```

### teams
```typescript
{
  teamId: string;
  teamName: string;
  teamCode: string;  // Format: BVHACK-XXXXX
  leaderId: string;
  members: string[];
  paymentStatus: 'pending' | 'completed';
  registrationStatus: 'incomplete' | 'pending_payment' | 'registered'; // UPDATED
  createdAt: Timestamp;
}
```

### **joinRequests (NEW)**
```typescript
{
  id: string;
  teamId: string;
  teamCode: string;
  userId: string;
  userName: string;
  email: string;
  college: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Timestamp;
  respondedAt?: Timestamp;
}
```

### announcements
```typescript
{
  id: string;
  title: string;
  description: string;
  createdAt: Timestamp;
  visible: boolean;
}
```

### submissions
```typescript
{
  id: string;
  teamId: string;
  projectName: string;
  description: string;
  github: string;
  pptUrl: string;
  submittedAt: Timestamp;
}
```

### settings
```typescript
// Document ID: submissions
{
  enabled: boolean;
}
```

## **New User Flows**

### **Team Join Flow (Approval-Based)**
1. User enters team code
2. System validates:
   - Team exists and not full
   - User not already in team
   - No duplicate requests
3. Join request created with status 'pending'
4. Team leader sees request with user details
5. Leader accepts/rejects → User gets team membership
6. Request history maintained (not deleted)

### **Registration Flow**
1. User clicks "Register Now"
2. System checks user status:
   - Not logged in → /auth/signup
   - No team → /dashboard/team
   - Has team but not leader → /dashboard
   - Is leader → Show registration dialog
3. Leader confirms registration
4. Team status → 'pending_payment'
5. Future: Razorpay integration → 'registered'

### **Admin Access Flow**
1. User tries to access /admin/*
2. System verifies:
   - User authenticated
   - User role = 'admin' (from Firestore)
3. If not admin → Redirect to /dashboard
4. Admin can monitor all activities

## **Validation Rules**

### Team Management
- ✅ Maximum 4 members per team
- ✅ No duplicate join requests
- ✅ No joining multiple teams
- ✅ Team leaders cannot join other teams
- ✅ Users cannot join their own team

### Registration
- ✅ Only team leaders can initiate registration
- ✅ Teams must have at least 1 member
- ✅ Proper status progression

### Admin Access
- ✅ Server-side role verification
- ✅ Firestore security rules enforcement
- ✅ Proper error handling and redirects

## Security Features

- **Enhanced Firestore Security Rules** with joinRequests support
- **Server-side admin verification** (not just client-side)
- **Role-based access control** with proper middleware
- **Input validation** with Zod schemas
- **XSS protection** and secure data handling

## Testing Checklist

### **Team Join Flow**
- [ ] Send join request to valid team
- [ ] Cannot send duplicate requests
- [ ] Cannot join when team is full
- [ ] Leader sees pending requests
- [ ] Accept/reject functionality works
- [ ] Status updates correctly
- [ ] User joins team after acceptance

### **Registration Flow**
- [ ] Register Now works for different user states
- [ ] Registration dialog appears for leaders
- [ ] Status updates to pending_payment
- [ ] Non-leaders cannot register

### **Admin Panel**
- [ ] Admin login works with role verification
- [ ] Participants redirected from admin routes
- [ ] Join requests page shows all activity
- [ ] Statistics include new metrics
- [ ] All CRUD operations work

### **General**
- [ ] Authentication flows work
- [ ] Profile completion works
- [ ] Dashboard shows correct statuses
- [ ] Responsive design works
- [ ] Error handling works properly

## **Key Improvements Made**

1. **Proper Team Join Approval System**
   - No instant joining
   - Leader approval required
   - Request tracking and history
   - User status feedback

2. **Smart Registration Button**
   - Context-aware behavior
   - Proper user flow guidance
   - Status-based actions

3. **Enhanced Admin Panel**
   - Join requests monitoring
   - Better statistics
   - Proper role verification
   - Server-side security

4. **Improved Data Model**
   - New joinRequests collection
   - Enhanced team statuses
   - Better type safety
   - Comprehensive validation

This implementation now follows professional hackathon platform standards similar to Devfolio, Unstop, and other established platforms with proper approval workflows and administrative oversight.
