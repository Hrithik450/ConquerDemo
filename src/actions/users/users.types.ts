import { z } from "zod";
import { users } from "@/lib/db/schema";

// Type for the users table
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// Zod schema for validation
export const userSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  role: z.enum(["admin", "employee", "customer"]).default("employee"),
});

// Response types for API
export type UserResponse = {
  success: boolean;
  data?: User;
  error?: string;
};

export type UsersResponse = {
  success: boolean;
  data?: User[];
  error?: string;
};
