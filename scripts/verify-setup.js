#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Hackathon Platform Setup...\n');

const requiredFiles = [
  'firebase/firebaseConfig.ts',
  'lib/firebase/auth.ts',
  'lib/firebase/firestore.ts',
  'lib/firebase/storage.ts',
  'hooks/useAuth.ts',
  'types/index.ts',
  'app/auth/signin/page.tsx',
  'app/auth/signup/page.tsx',
  'app/auth/complete-profile/page.tsx',
  'app/dashboard/page.tsx',
  'app/dashboard/layout.tsx',
  'app/admin/page.tsx',
  'app/admin/layout.tsx',
  'components/header.tsx',
  'middleware.ts'
];

const requiredDirs = [
  'app/(landing)',
  'app/auth',
  'app/dashboard',
  'app/admin',
  'components/ui',
  'lib/firebase',
  'hooks',
  'types'
];

let allGood = true;

console.log('📁 Checking required directories...');
requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`✅ ${dir}`);
  } else {
    console.log(`❌ Missing: ${dir}`);
    allGood = false;
  }
});

console.log('\n📄 Checking required files...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ Missing: ${file}`);
    allGood = false;
  }
});

console.log('\n🔧 Checking Firebase configuration...');
if (fs.existsSync('firebase/firebaseConfig.ts')) {
  const config = fs.readFileSync('firebase/firebaseConfig.ts', 'utf8');
  if (config.includes('apiKey') && config.includes('authDomain') && config.includes('projectId')) {
    console.log('✅ Firebase config complete');
  } else {
    console.log('❌ Firebase config incomplete');
    allGood = false;
  }
}

console.log('\n📦 Checking package.json dependencies...');
if (fs.existsSync('package.json')) {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = [
    'firebase',
    'react-hook-form',
    '@hookform/resolvers',
    'zod',
    'sonner',
    'lucide-react',
    '@radix-ui/react-label'
  ];
  
  requiredDeps.forEach(dep => {
    if (pkg.dependencies[dep]) {
      console.log(`✅ ${dep}`);
    } else {
      console.log(`❌ Missing dependency: ${dep}`);
      allGood = false;
    }
  });
}

console.log('\n' + '='.repeat(50));
if (allGood) {
  console.log('🎉 Setup verification PASSED!');
  console.log('\nNext steps:');
  console.log('1. npm run dev');
  console.log('2. Visit http://localhost:3000');
  console.log('3. Sign up and create first admin user');
  console.log('4. Check Firebase Console for user data');
} else {
  console.log('❌ Setup verification FAILED!');
  console.log('\nSome files are missing. Please check the setup guide.');
}
console.log('='.repeat(50));