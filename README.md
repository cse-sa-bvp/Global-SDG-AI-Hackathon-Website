# Global SDG-AI Hackathon Platform

A complete hackathon management platform built with Next.js 15, Firebase, TypeScript, and Tailwind CSS.

## 🚀 Features

### For Participants
- **Authentication**: Email/Password and Google Sign-In
- **Profile Management**: Complete profile with college, department, year details
- **Approval-Based Team Formation**: Send join requests to teams (max 4 members)
- **Team Management**: Leaders approve/reject join requests
- **Smart Registration**: Context-aware registration flow
- **Announcements**: Real-time updates from organizers
- **Project Submission**: Submit projects with GitHub links and presentation files
- **Dashboard**: Track registration, payment, and submission status

### For Admins
- **Admin Panel**: Comprehensive management dashboard with role verification
- **User Management**: View, search, and export participant data
- **Team Monitoring**: Track team formations and registration statuses
- **Join Request Monitoring**: View all team join request activity
- **Announcements**: Create and publish announcements
- **Submission Review**: View and download project submissions
- **Payment Tracking**: Monitor payment status (Razorpay integration ready)

## 📋 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Backend**: Firebase
  - Authentication
  - Cloud Firestore
  - Storage
- **Forms**: React Hook Form + Zod validation
- **Notifications**: Sonner (toast notifications)

## 🛠️ Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Setup (Already Configured)

The Firebase configuration is already set up in `firebase/firebaseConfig.ts`. 

**Required Firebase Services:**
1. Enable Authentication (Email/Password + Google)
2. Create Firestore Database
3. Enable Firebase Storage
4. Set up Security Rules (see SETUP_GUIDE.md)

### 3. Create First Admin

```bash
# Start development server
npm run dev

# Visit http://localhost:3000
# Sign up with an account
# Go to Firebase Console → Firestore → users collection
# Find your user and change role from "participant" to "admin"
```

### 4. Initialize Settings

In Firebase Console → Firestore, create:
- Collection: `settings`
- Document ID: `submissions`
- Field: `enabled` (boolean) = `false`

### 5. Run the Application

```bash
npm run dev
```

Visit:
- Landing Page: `http://localhost:3000`
- Sign In: `http://localhost:3000/auth/signin`
- Dashboard: `http://localhost:3000/dashboard`
- Admin Panel: `http://localhost:3000/admin/login`

## 📁 Project Structure

```
app/
├── (landing)/              # Landing page route group
│   └── page.tsx
├── auth/                   # Authentication pages
│   ├── signin/
│   ├── signup/
│   └── complete-profile/
├── dashboard/              # Participant dashboard
│   ├── page.tsx
│   ├── team/
│   ├── announcements/
│   ├── submission/
│   └── profile/
├── admin/                  # Admin panel
│   ├── page.tsx
│   ├── participants/
│   ├── teams/
│   ├── announcements/
│   ├── submissions/
│   └── payments/
└── api/                    # API routes (payment ready)

components/
├── ui/                     # shadcn components
├── dashboard/              # Dashboard-specific components
├── header.tsx              # Main navigation
└── ...

lib/
├── firebase/               # Firebase services
│   ├── auth.ts
│   ├── firestore.ts
│   └── storage.ts
└── utils/

hooks/
└── useAuth.ts              # Authentication hook

types/
└── index.ts                # TypeScript definitions
```

## 🎯 User Flows

### Participant Journey
1. Visit landing page → Click "Register Now" (smart routing based on user state)
2. Sign up with email or Google
3. Complete profile with personal details
4. Create a team OR send join request to existing team
5. Wait for team leader approval (if joining)
6. Team leader initiates registration (Incomplete → Pending Payment)
7. View announcements from organizers
8. Submit project when submissions open
9. Track status on dashboard

### Admin Journey
1. Login at `/admin/login` (with proper role verification)
2. View enhanced dashboard statistics
3. Monitor join request activity
4. Manage participants and teams
5. Create and publish announcements
6. Enable/disable submissions
7. Review submitted projects
8. Monitor payment status

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Responsive sidebar navigation
- ✅ Touch-friendly interfaces
- ✅ Optimized for all screen sizes

## 🔒 Security Features

- Protected routes with authentication
- Role-based access control (participant/admin)
- Firestore security rules
- Storage security rules
- Form validation with Zod
- XSS protection

## 📚 Documentation

- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Detailed setup instructions
- [IMPLEMENTATION.md](./IMPLEMENTATION.md) - Technical implementation details

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🧪 Testing Checklist

- [ ] Sign up with email
- [ ] Sign up with Google
- [ ] Complete profile
- [ ] Create team
- [ ] Join team with code
- [ ] View announcements
- [ ] Submit project
- [ ] Admin: Create announcement
- [ ] Admin: Enable submissions
- [ ] Admin: Export participant CSV

---

Built with ❤️ for Global SDG-AI Hackathon Pune 2026