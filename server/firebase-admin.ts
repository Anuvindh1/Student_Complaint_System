import { initializeApp, cert, getApps, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

let adminApp: App;
let db: Firestore;

// Initialize Firebase Admin SDK
// For development, we'll use the client SDK credentials
// In production, you'd use service account credentials
export function initializeFirebaseAdmin(): Firestore {
  if (getApps().length === 0) {
    // For this demo, we'll use Firestore via the client SDK on the server
    // In a production app, you'd use proper admin credentials
    adminApp = initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
    
    db = getFirestore(adminApp);
  } else {
    db = getFirestore();
  }

  return db;
}

export { db };
