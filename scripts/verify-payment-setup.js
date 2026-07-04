#!/usr/bin/env node

/**
 * Payment Setup Verification Script
 * 
 * This script verifies that all necessary files and configurations
 * are in place for the Razorpay payment integration.
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  const fullPath = path.join(__dirname, '..', filePath);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    log(`✓ ${description}`, colors.green);
    return true;
  } else {
    log(`✗ ${description}`, colors.red);
    log(`  Missing: ${filePath}`, colors.yellow);
    return false;
  }
}

function checkEnvVariable(varName) {
  const envPath = path.join(__dirname, '..', '.env.local');
  
  if (!fs.existsSync(envPath)) {
    return false;
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  return envContent.includes(varName);
}

function main() {
  log('\n=== Payment Integration Verification ===\n', colors.cyan);
  
  let allChecks = true;
  
  // Check backend API routes
  log('Backend API Routes:', colors.blue);
  allChecks &= checkFile('app/api/payments/create-order/route.ts', 'Create Order API');
  allChecks &= checkFile('app/api/payments/verify/route.ts', 'Verify Payment API');
  allChecks &= checkFile('app/api/payments/webhook/route.ts', 'Webhook Handler API');
  
  // Check frontend components
  log('\nFrontend Components:', colors.blue);
  allChecks &= checkFile('components/payment/RegistrationDialog.tsx', 'Registration Dialog');
  allChecks &= checkFile('app/dashboard/team/page.tsx', 'Team Dashboard Page');
  
  // Check admin pages
  log('\nAdmin Panel:', colors.blue);
  allChecks &= checkFile('app/admin/payments/page.tsx', 'Admin Payments Page');
  
  // Check utilities
  log('\nUtilities:', colors.blue);
  allChecks &= checkFile('lib/razorpay.ts', 'Razorpay Utilities');
  allChecks &= checkFile('lib/firebase/admin.ts', 'Firebase Admin Setup');
  
  // Check UI components
  log('\nUI Components:', colors.blue);
  allChecks &= checkFile('components/ui/checkbox.tsx', 'Checkbox Component');
  allChecks &= checkFile('components/ui/separator.tsx', 'Separator Component');
  allChecks &= checkFile('components/ui/tabs.tsx', 'Tabs Component');
  allChecks &= checkFile('components/ui/table.tsx', 'Table Component');
  
  // Check types
  log('\nType Definitions:', colors.blue);
  allChecks &= checkFile('types/index.ts', 'TypeScript Types');
  
  // Check environment variables
  log('\nEnvironment Variables:', colors.blue);
  const hasRazorpayKey = checkEnvVariable('RAZORPAY_API_KEY');
  const hasRazorpaySecret = checkEnvVariable('RAZORPAY_SECRET');
  
  if (hasRazorpayKey) {
    log('✓ RAZORPAY_API_KEY configured', colors.green);
  } else {
    log('✗ RAZORPAY_API_KEY not found in .env.local', colors.red);
    allChecks = false;
  }
  
  if (hasRazorpaySecret) {
    log('✓ RAZORPAY_SECRET configured', colors.green);
  } else {
    log('✗ RAZORPAY_SECRET not found in .env.local', colors.red);
    allChecks = false;
  }
  
  // Check Firebase Admin credentials
  const hasFirebaseServiceAccount = checkEnvVariable('FIREBASE_SERVICE_ACCOUNT');
  const hasFirebaseClientEmail = checkEnvVariable('FIREBASE_CLIENT_EMAIL');
  
  if (hasFirebaseServiceAccount || hasFirebaseClientEmail) {
    log('✓ Firebase Admin credentials configured', colors.green);
  } else {
    log('⚠ Firebase Admin credentials not found', colors.yellow);
    log('  Required for payment API routes to work', colors.yellow);
    log('  See PAYMENT_SETUP.md for instructions', colors.yellow);
  }
  
  // Check dependencies
  log('\nDependencies:', colors.blue);
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const hasRazorpay = packageJson.dependencies && packageJson.dependencies.razorpay;
    const hasFirebaseAdmin = packageJson.dependencies && packageJson.dependencies['firebase-admin'];
    
    if (hasRazorpay) {
      log('✓ razorpay package installed', colors.green);
    } else {
      log('✗ razorpay package not installed', colors.red);
      log('  Run: npm install razorpay', colors.yellow);
      allChecks = false;
    }
    
    if (hasFirebaseAdmin) {
      log('✓ firebase-admin package installed', colors.green);
    } else {
      log('✗ firebase-admin package not installed', colors.red);
      allChecks = false;
    }
  }
  
  // Summary
  log('\n=== Summary ===\n', colors.cyan);
  
  if (allChecks) {
    log('✓ All payment integration files are in place!', colors.green);
    log('\nNext steps:', colors.blue);
    log('1. Add Firebase Admin credentials to .env.local', colors.reset);
    log('2. Start development server: npm run dev', colors.reset);
    log('3. Test payment flow with test cards', colors.reset);
    log('4. See RAZORPAY_TEST_GUIDE.md for test credentials', colors.reset);
  } else {
    log('✗ Some files or configurations are missing', colors.red);
    log('\nPlease check the errors above and fix them.', colors.yellow);
    log('See PAYMENT_SETUP.md for detailed setup instructions.', colors.yellow);
  }
  
  log('\n');
}

main();
