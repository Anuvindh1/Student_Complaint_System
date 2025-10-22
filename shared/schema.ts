import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const complaintStatuses = ["pending", "resolved"] as const;
export type ComplaintStatus = typeof complaintStatuses[number];

export const departments = [
  "Computer Science Engineering (CSE)",
  "Electronics & Communication Engineering (ECE)",
  "Electrical & Electronics Engineering (EEE)",
  "Mechanical Engineering",
  "Civil Engineering",
  "Information Technology (IT)",
  "Chemical Engineering",
  "Biotechnology",
  "Aerospace Engineering",
  "Automobile Engineering"
] as const;

export type Department = typeof departments[number];

export const complaints = pgTable("complaints", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentName: text("student_name").notNull(),
  department: text("department").notNull(),
  issueTitle: text("issue_title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertComplaintSchema = createInsertSchema(complaints, {
  studentName: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  department: z.enum(departments, { required_error: "Please select a department" }),
  issueTitle: z.string().min(5, "Issue title must be at least 5 characters").max(150, "Title is too long"),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description is too long"),
}).omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});

export const updateComplaintStatusSchema = z.object({
  status: z.enum(complaintStatuses),
});

export type InsertComplaint = z.infer<typeof insertComplaintSchema>;
export type Complaint = typeof complaints.$inferSelect;
export type UpdateComplaintStatus = z.infer<typeof updateComplaintStatusSchema>;

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
