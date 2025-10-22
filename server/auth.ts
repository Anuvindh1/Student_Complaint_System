import type { Request, Response, NextFunction } from "express";
import { storage } from "./storage";

// Extend Express Session type
declare module "express-session" {
  interface SessionData {
    isAdmin: boolean;
  }
}

// Initialize default admin password if not set in database
export async function initializeAdminPassword() {
  const existingPassword = await storage.getAdminPassword();
  
  if (!existingPassword) {
    const defaultPassword = process.env.ADMIN_PASSWORD || "admin123";
    await storage.setAdminPassword(defaultPassword);
    console.log("✓ Admin password initialized in database");
    
    if (defaultPassword === "admin123") {
      console.warn("⚠️  WARNING: Using default admin password 'admin123'.");
      console.warn("⚠️  You can change it in Firebase Console: settings/admin document.");
    }
  }
}

export async function loginAdmin(req: Request, res: Response) {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password required" });
  }

  const adminPassword = await storage.getAdminPassword();
  
  if (!adminPassword) {
    return res.status(500).json({ error: "Admin password not configured" });
  }

  if (password === adminPassword) {
    req.session.isAdmin = true;
    return res.json({ success: true, message: "Authenticated successfully" });
  }

  return res.status(401).json({ error: "Invalid password" });
}

export function logoutAdmin(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.json({ success: true, message: "Logged out successfully" });
  });
}

export function checkAdminAuth(req: Request, res: Response) {
  res.json({ isAuthenticated: req.session.isAdmin === true });
}

// Middleware to protect admin routes
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session.isAdmin === true) {
    return next();
  }

  return res.status(403).json({ error: "Unauthorized - Admin access required" });
}
