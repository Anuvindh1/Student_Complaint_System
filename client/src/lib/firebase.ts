import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

// Initialize Firebase only if all required environment variables are present
export function initializeFirebase(): { app: FirebaseApp | null; db: Firestore | null } {
  // Check if Firebase credentials are available
  const hasFirebaseConfig = 
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID &&
    import.meta.env.VITE_FIREBASE_APP_ID;

  if (!hasFirebaseConfig) {
    console.warn('Firebase configuration not found. Running in local-only mode.');
    return { app: null, db: null };
  }

  if (!app) {
    try {
      const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
      };

      app = initializeApp(firebaseConfig);
      db = getFirestore(app);
    } catch (error) {
      console.error('Failed to initialize Firebase:', error);
      return { app: null, db: null };
    }
  }

  return { app, db };
}

// Initialize on module load (but gracefully handle failures)
const firebase = initializeFirebase();
export { firebase };
