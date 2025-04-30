import { z } from "zod";
import { products } from "@/lib/db/schema";

// Type for the products table
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

// Zod schema for validation
export const productSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  brandId: z.string().uuid(),
  categoryId: z.string().uuid(),
  isActive: z.boolean().default(true),
  otherData: z.record(z.unknown()).optional(),
});

// Response types for API
export type ProductResponse = {
  success: boolean;
  data?: Product;
  error?: string;
  message?: string;
};

export type ProductsResponse = {
  success: boolean;
  data?: Product[];
  error?: string;
};
