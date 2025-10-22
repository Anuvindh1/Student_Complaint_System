import { type Complaint, type InsertComplaint, type UpdateComplaintStatus } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Complaint operations
  getAllComplaints(): Promise<Complaint[]>;
  getComplaintById(id: string): Promise<Complaint | undefined>;
  createComplaint(complaint: InsertComplaint): Promise<Complaint>;
  updateComplaintStatus(id: string, status: UpdateComplaintStatus): Promise<Complaint | undefined>;
  deleteComplaint(id: string): Promise<boolean>;
  cleanupOldResolvedComplaints(daysOld: number): Promise<number>;
}

export class MemStorage implements IStorage {
  private complaints: Map<string, Complaint>;

  constructor() {
    this.complaints = new Map();
  }

  async getAllComplaints(): Promise<Complaint[]> {
    return Array.from(this.complaints.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getComplaintById(id: string): Promise<Complaint | undefined> {
    return this.complaints.get(id);
  }

  async createComplaint(insertComplaint: InsertComplaint): Promise<Complaint> {
    const id = randomUUID();
    const now = new Date();
    const complaint: Complaint = {
      ...insertComplaint,
      id,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    };
    this.complaints.set(id, complaint);
    return complaint;
  }

  async updateComplaintStatus(
    id: string,
    statusUpdate: UpdateComplaintStatus
  ): Promise<Complaint | undefined> {
    const complaint = this.complaints.get(id);
    if (!complaint) {
      return undefined;
    }

    const updatedComplaint: Complaint = {
      ...complaint,
      status: statusUpdate.status,
      updatedAt: new Date(),
    };

    this.complaints.set(id, updatedComplaint);
    return updatedComplaint;
  }

  async deleteComplaint(id: string): Promise<boolean> {
    return this.complaints.delete(id);
  }

  async cleanupOldResolvedComplaints(daysOld: number): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    
    let deletedCount = 0;
    const entriesToDelete: string[] = [];
    
    this.complaints.forEach((complaint, id) => {
      if (complaint.status === "resolved" && new Date(complaint.updatedAt) < cutoffDate) {
        entriesToDelete.push(id);
      }
    });
    
    entriesToDelete.forEach(id => {
      this.complaints.delete(id);
      deletedCount++;
    });
    
    return deletedCount;
  }
}

// Import Firebase storage implementation
import { FirebaseStorage } from "./firebase-storage";

// Use Firebase storage in production, MemStorage for testing
export const storage = process.env.FIREBASE_PROJECT_ID 
  ? new FirebaseStorage() 
  : new MemStorage();
