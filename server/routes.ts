import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertComplaintSchema, updateComplaintStatusSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { loginAdmin, logoutAdmin, checkAdminAuth, requireAdmin } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/admin/login", loginAdmin);
  app.post("/api/admin/logout", logoutAdmin);
  app.get("/api/admin/check", checkAdminAuth);
  
  app.get("/api/complaints", async (req, res) => {
    try {
      const complaints = await storage.getAllComplaints();
      res.json(complaints);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      res.status(500).json({ error: "Failed to fetch complaints" });
    }
  });

  app.get("/api/complaints/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const complaint = await storage.getComplaintById(id);
      
      if (!complaint) {
        return res.status(404).json({ error: "Complaint not found" });
      }
      
      res.json(complaint);
    } catch (error) {
      console.error("Error fetching complaint:", error);
      res.status(500).json({ error: "Failed to fetch complaint" });
    }
  });

  app.post("/api/complaints", async (req, res) => {
    try {
      const validationResult = insertComplaintSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const validationError = fromZodError(validationResult.error);
        return res.status(400).json({ 
          error: "Validation failed", 
          details: validationError.message 
        });
      }

      const complaint = await storage.createComplaint(validationResult.data);
      res.status(201).json(complaint);
    } catch (error) {
      console.error("Error creating complaint:", error);
      res.status(500).json({ error: "Failed to create complaint" });
    }
  });

  app.patch("/api/complaints/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      
      const validationResult = updateComplaintStatusSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const validationError = fromZodError(validationResult.error);
        return res.status(400).json({ 
          error: "Validation failed", 
          details: validationError.message 
        });
      }

      const updatedComplaint = await storage.updateComplaintStatus(
        id,
        validationResult.data
      );

      if (!updatedComplaint) {
        return res.status(404).json({ error: "Complaint not found" });
      }

      res.json(updatedComplaint);
    } catch (error) {
      console.error("Error updating complaint:", error);
      res.status(500).json({ error: "Failed to update complaint" });
    }
  });

  app.delete("/api/complaints/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteComplaint(id);

      if (!deleted) {
        return res.status(404).json({ error: "Complaint not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting complaint:", error);
      res.status(500).json({ error: "Failed to delete complaint" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
