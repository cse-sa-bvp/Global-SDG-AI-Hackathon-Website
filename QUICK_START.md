# 🚀 Quick Start Guide

## Get Running in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Verify Setup
```bash
npm run verify
```

### 3. Start Development Server
```bash
npm run dev
# or for guided start with helpful info:
npm run dev:help
```

### 4. Complete Firebase Setup

Follow the steps in `scripts/init-firebase.md`:

1. **Enable Authentication**
   - Email/Password ✅
   - Google Sign-In ✅

2. **Create Firestore Database** with security rules

3. **Enable Storage** with security rules

4. **Create settings document**:
   - Collection: `settings`
   - Document: `submissions`
   - Field: `enabled` = `false`

### 5. Create Admin User

1. Visit `http://localhost:3000`
2. Sign up with your email
3. Complete profile
4. Go to Firebase Console → Firestore → `users`
5. Change your `role` from `participant` to `admin`

### 6. Test Everything

**Participant Flow:**
- ✅ Sign up/Sign in
- ✅ Complete profile  
- ✅ Create/Join team
- ✅ View announcements
- ✅ Submit project (when enabled)

**Admin Flow:**
- ✅ Admin login (`/admin/login`)
- ✅ View dashboard stats
- ✅ Manage participants
- ✅ Create announcements
- ✅ Enable submissions
- ✅ Review projects

## 🔗 Key URLs

| Page | URL | Description |
|------|-----|-------------|
| Landing | `http://localhost:3000` | Main landing page |
| Sign Up | `/auth/signup` | User registration |
| Sign In | `/auth/signin` | User login |
| Dashboard | `/dashboard` | Participant dashboard |
| Admin | `/admin/login` | Admin panel |

## 🛠️ Available Commands

```bash
npm run dev        # Start development server
npm run dev:help   # Start with helpful guidance
npm run build      # Build for production
npm run start      # Start production server
npm run verify     # Verify setup completion
npm run setup      # Install & verify in one command
```

## ❓ Need Help?

1. **Setup Issues**: Check `SETUP_GUIDE.md`
2. **Firebase Issues**: Check `scripts/init-firebase.md`  
3. **Implementation Details**: Check `IMPLEMENTATION.md`
4. **Verification**: Run `npm run verify`

## 🎯 Success Checklist

- [ ] Dependencies installed
- [ ] Firebase services enabled
- [ ] Security rules deployed
- [ ] Settings document created
- [ ] Admin user created
- [ ] All features tested
- [ ] Ready for participants!

---

**Need more detailed instructions?** See `SETUP_GUIDE.md` for comprehensive setup documentation.