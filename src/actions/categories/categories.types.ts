import { z } from "zod";
import { categories } from "@/lib/db/schema";

// Type for the categories table
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

// Zod schema for validation
export const categorySchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  isActive: z.boolean().default(true),
  otherData: z.record(z.unknown()).optional(),
});

// Response types for API
export type CategoryResponse = {
  success: boolean;
  data?: Category;
  error?: string;
  message?: string;
};

export type CategoriesResponse = {
  success: boolean;
  data?: Category[];
  error?: string;
};
