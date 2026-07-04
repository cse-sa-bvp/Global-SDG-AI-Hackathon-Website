import admin from 'firebase-admin';

// Initialize Firebase Admin
let adminInitialized = false;

try {
  if (!admin.apps.length) {
    // Try to initialize with service account credentials
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      : process.env.FIREBASE_PRIVATE_KEY 
      ? {
          projectId: process.env.FIREBASE_PROJECT_ID || 'hackathon-website-9c32b',
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }
      : null;

    if (serviceAccount && serviceAccount.privateKey) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });
      adminInitialized = true;
      console.log('✓ Firebase Admin initialized successfully');
    } else {
      console.warn('⚠️ Firebase Admin credentials not found. Using Firestore client SDK instead.');
      console.warn('   For production, add FIREBASE_SERVICE_ACCOUNT to .env.local');
      console.warn('   See PAYMENT_SETUP.md for instructions.');
    }
  } else {
    adminInitialized = true;
  }
} catch (error) {
  console.error('Firebase admin initialization error:', error);
  adminInitialized = false;
}

// Export admin instances (will be null if not initialized)
export const adminDb = adminInitialized ? admin.firestore() : null;
export const FieldValue = adminInitialized ? admin.firestore.FieldValue : null;
export const isAdminInitialized = adminInitialized;
export default adminInitialized ? admin : null;
