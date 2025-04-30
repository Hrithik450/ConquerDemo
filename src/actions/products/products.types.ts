import { z } from "zod";
import { products } from "@/lib/db/schema";

// Type for the products table
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

// Zod schema for validation
export const productSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  basePrice: z.string().optional(),
  brandId: z.string().uuid(),
  categoryId: z.string().uuid(),
  isActive: z.boolean().default(true),
  primaryImageUrl: z.string().url().optional(),
  otherData: z.record(z.unknown()).optional(),
});

// Response types for API
export type ProductResponse = {
  success: boolean;
  data?: Product;
  error?: string;
};

export type ProductsResponse = {
  success: boolean;
  data?: Product[];
  error?: string;
};
