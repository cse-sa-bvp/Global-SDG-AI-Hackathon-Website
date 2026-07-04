#!/usr/bin/env node

const { spawn } = require('child_process');

console.log('🚀 Starting Hackathon Platform Development Server...\n');

// Check if Firebase config exists
const fs = require('fs');
if (!fs.existsSync('firebase/firebaseConfig.ts')) {
  console.error('❌ Firebase configuration not found!');
  console.log('Please check firebase/firebaseConfig.ts file exists and has proper configuration.');
  process.exit(1);
}

// Start Next.js dev server
console.log('📦 Starting Next.js development server...');
const nextDev = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

nextDev.on('error', (error) => {
  console.error('❌ Failed to start development server:', error);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down development server...');
  nextDev.kill('SIGINT');
  process.exit(0);
});

// Show helpful information after a delay
setTimeout(() => {
  console.log('\n' + '='.repeat(60));
  console.log('🎉 Hackathon Platform is running!');
  console.log('');
  console.log('📖 Available URLs:');
  console.log('   Landing Page:  http://localhost:3000');
  console.log('   Sign In:       http://localhost:3000/auth/signin');
  console.log('   Sign Up:       http://localhost:3000/auth/signup');
  console.log('   Dashboard:     http://localhost:3000/dashboard');
  console.log('   Admin Panel:   http://localhost:3000/admin/login');
  console.log('');
  console.log('📋 Next Steps:');
  console.log('   1. Complete Firebase setup (see scripts/init-firebase.md)');
  console.log('   2. Sign up and create your first account');
  console.log('   3. Make yourself admin in Firestore');
  console.log('   4. Test the complete flow');
  console.log('');
  console.log('🔧 Documentation:');
  console.log('   Setup Guide:   SETUP_GUIDE.md');
  console.log('   Implementation: IMPLEMENTATION.md');
  console.log('   Firebase Init: scripts/init-firebase.md');
  console.log('='.repeat(60));
}, 3000);