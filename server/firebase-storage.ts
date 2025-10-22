import { type Complaint, type InsertComplaint, type UpdateComplaintStatus } from "@shared/schema";
import type { IStorage } from "./storage";

// Firebase Web SDK (client SDK) for server-side use
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  type Firestore,
  type Timestamp,
} from 'firebase/firestore';

let app: FirebaseApp;
let db: Firestore;

function initializeFirebase(): Firestore {
  // Check if required Firebase env vars are present
  const hasFirebaseConfig = 
    process.env.FIREBASE_API_KEY &&
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_APP_ID;

  if (!hasFirebaseConfig) {
    throw new Error('Firebase configuration missing. Please set FIREBASE_* environment variables.');
  }

  if (getApps().length === 0) {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY!,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
      projectId: process.env.FIREBASE_PROJECT_ID!,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
      appId: process.env.FIREBASE_APP_ID!,
    };

    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } else {
    db = getFirestore();
  }

  return db;
}

export class FirebaseStorage implements IStorage {
  private db: Firestore;
  private complaintsCollection = "complaints";

  constructor() {
    this.db = initializeFirebase();
  }

  private timestampToDate(timestamp: any): Date {
    if (!timestamp) return new Date();
    if (timestamp.toDate) return timestamp.toDate();
    if (timestamp.seconds) return new Date(timestamp.seconds * 1000);
    return new Date(timestamp);
  }

  async getAllComplaints(): Promise<Complaint[]> {
    try {
      const complaintsRef = collection(this.db, this.complaintsCollection);
      const q = query(complaintsRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          studentName: data.studentName,
          department: data.department,
          issueTitle: data.issueTitle,
          description: data.description,
          status: data.status,
          createdAt: this.timestampToDate(data.createdAt),
          updatedAt: this.timestampToDate(data.updatedAt),
        } as Complaint;
      });
    } catch (error) {
      console.error("Error getting complaints:", error);
      throw new Error("Failed to fetch complaints from database");
    }
  }

  async getComplaintById(id: string): Promise<Complaint | undefined> {
    try {
      const docRef = doc(this.db, this.complaintsCollection, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return undefined;
      }

      const data = docSnap.data();
      return {
        id: docSnap.id,
        studentName: data.studentName,
        department: data.department,
        issueTitle: data.issueTitle,
        description: data.description,
        status: data.status,
        createdAt: this.timestampToDate(data.createdAt),
        updatedAt: this.timestampToDate(data.updatedAt),
      } as Complaint;
    } catch (error) {
      console.error("Error getting complaint:", error);
      throw new Error("Failed to fetch complaint from database");
    }
  }

  async createComplaint(insertComplaint: InsertComplaint): Promise<Complaint> {
    try {
      const complaintsRef = collection(this.db, this.complaintsCollection);
      const now = new Date();

      const complaintData = {
        ...insertComplaint,
        status: "pending",
        createdAt: now,
        updatedAt: now,
      };

      const docRef = await addDoc(complaintsRef, complaintData);

      return {
        id: docRef.id,
        ...complaintData,
      } as Complaint;
    } catch (error) {
      console.error("Error creating complaint:", error);
      throw new Error("Failed to create complaint in database");
    }
  }

  async updateComplaintStatus(
    id: string,
    statusUpdate: UpdateComplaintStatus
  ): Promise<Complaint | undefined> {
    try {
      const docRef = doc(this.db, this.complaintsCollection, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return undefined;
      }

      const updateData = {
        status: statusUpdate.status,
        updatedAt: new Date(),
      };

      await updateDoc(docRef, updateData);

      const data = docSnap.data();
      return {
        id: docSnap.id,
        studentName: data.studentName,
        department: data.department,
        issueTitle: data.issueTitle,
        description: data.description,
        status: statusUpdate.status,
        createdAt: this.timestampToDate(data.createdAt),
        updatedAt: new Date(),
      } as Complaint;
    } catch (error) {
      console.error("Error updating complaint:", error);
      throw new Error("Failed to update complaint in database");
    }
  }

  async deleteComplaint(id: string): Promise<boolean> {
    try {
      const docRef = doc(this.db, this.complaintsCollection, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return false;
      }

      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error("Error deleting complaint:", error);
      throw new Error("Failed to delete complaint from database");
    }
  }

  async cleanupOldResolvedComplaints(daysOld: number): Promise<number> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);
      
      const complaintsRef = collection(this.db, this.complaintsCollection);
      const snapshot = await getDocs(complaintsRef);
      
      let deletedCount = 0;
      const deletePromises: Promise<void>[] = [];
      
      snapshot.docs.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.status === "resolved") {
          const updatedAt = this.timestampToDate(data.updatedAt);
          if (updatedAt < cutoffDate) {
            deletePromises.push(deleteDoc(doc(this.db, this.complaintsCollection, docSnap.id)));
            deletedCount++;
          }
        }
      });
      
      await Promise.all(deletePromises);
      return deletedCount;
    } catch (error) {
      console.error("Error cleaning up old complaints:", error);
      throw new Error("Failed to cleanup old complaints from database");
    }
  }
}
