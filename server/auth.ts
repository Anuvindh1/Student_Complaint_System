import type { Request, Response, NextFunction } from "express";

// Extend Express Session type
declare module "express-session" {
  interface SessionData {
    isAdmin: boolean;
  }
}

// Simple admin authentication - password stored server-side only
// ADMIN_PASSWORD must be set via environment variable for security
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === "production" ? undefined : "admin123");

if (!ADMIN_PASSWORD) {
  console.error("FATAL: ADMIN_PASSWORD environment variable is not set!");
  console.error("Please set ADMIN_PASSWORD in your environment to enable admin access.");
  process.exit(1);
}

// Warn if using default password in development
if (ADMIN_PASSWORD === "admin123" && process.env.NODE_ENV !== "production") {
  console.warn("⚠️  WARNING: Using default admin password 'admin123' for development.");
  console.warn("⚠️  Set ADMIN_PASSWORD environment variable for production use.");
}

export function loginAdmin(req: Request, res: Response) {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password required" });
  }

  if (password === ADMIN_PASSWORD) {
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
