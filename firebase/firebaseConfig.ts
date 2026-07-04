import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDVu3nbRmNkLFuwR6E5NHRgHx1e_IL9oek",
  authDomain: "hackathon-website-9c32b.firebaseapp.com",
  projectId: "hackathon-website-9c32b",
  storageBucket: "hackathon-website-9c32b.firebasestorage.app",
  messagingSenderId: "192580016377",
  appId: "1:192580016377:web:35c21e5b3493b8a113aa28",
  measurementId: "G-K53CQN77Q0"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export { app };