/**
 * Server-side Firebase utilities
 * 
 * This module provides server-side Firestore access with automatic fallback:
 * - Uses Firebase Admin SDK if credentials are available (recommended for production)
 * - Falls back to Firebase Client SDK for development without credentials
 */

import { adminDb, FieldValue as AdminFieldValue, isAdminInitialized } from './admin';
import { db as clientDb } from './firestore';
import { serverTimestamp, updateDoc as clientUpdateDoc, doc as clientDoc, getDoc as clientGetDoc, setDoc as clientSetDoc, addDoc as clientAddDoc, collection as clientCollection } from 'firebase/firestore';

// Determine which database to use
export const db = isAdminInitialized ? adminDb : clientDb;
export const isUsingAdmin = isAdminInitialized;

// Export FieldValue with fallback
export const FieldValue = {
  serverTimestamp: () => {
    if (isAdminInitialized && AdminFieldValue) {
      return AdminFieldValue.serverTimestamp();
    }
    return serverTimestamp();
  },
  arrayUnion: (...elements: any[]) => {
    if (isAdminInitialized && AdminFieldValue) {
      return AdminFieldValue.arrayUnion(...elements);
    }
    // For client SDK, we'll handle this in the API route
    return elements;
  },
};

// Helper functions that work with both Admin and Client SDK
export async function updateDocument(collectionName: string, docId: string, data: any) {
  if (isAdminInitialized && adminDb) {
    // Use Admin SDK
    await adminDb.collection(collectionName).doc(docId).update(data);
  } else {
    // Use Client SDK
    const docRef = clientDoc(clientDb, collectionName, docId);
    await clientUpdateDoc(docRef, data);
  }
}

export async function getDocument(collectionName: string, docId: string) {
  if (isAdminInitialized && adminDb) {
    // Use Admin SDK
    return await adminDb.collection(collectionName).doc(docId).get();
  } else {
    // Use Client SDK
    const docRef = clientDoc(clientDb, collectionName, docId);
    return await clientGetDoc(docRef);
  }
}

export async function setDocument(collectionName: string, docId: string, data: any) {
  if (isAdminInitialized && adminDb) {
    // Use Admin SDK
    await adminDb.collection(collectionName).doc(docId).set(data);
  } else {
    // Use Client SDK
    const docRef = clientDoc(clientDb, collectionName, docId);
    await clientSetDoc(docRef, data);
  }
}

export async function addDocument(collectionName: string, data: any) {
  if (isAdminInitialized && adminDb) {
    // Use Admin SDK
    return await adminDb.collection(collectionName).add(data);
  } else {
    // Use Client SDK
    const collectionRef = clientCollection(clientDb, collectionName);
    return await clientAddDoc(collectionRef, data);
  }
}

// Log which SDK is being used
if (!isAdminInitialized) {
  console.log('ℹ️  Using Firebase Client SDK for server operations');
  console.log('   Add Firebase Admin credentials for production use');
}
