import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  orderBy,
  limit,
  Timestamp,
  arrayUnion,
  onSnapshot
} from 'firebase/firestore';
import { app } from '@/firebase/firebaseConfig';

const db = getFirestore(app);

export { 
  db, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  serverTimestamp, 
  orderBy, 
  limit,
  Timestamp,
  arrayUnion,
  onSnapshot
};
