import { z } from "zod";
import { brands } from "@/lib/db/schema";

// Type for the brands table
export type Brand = typeof brands.$inferSelect;
export type NewBrand = typeof brands.$inferInsert;

// Zod schema for validation
export const brandSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  logoUrl: z.string().url().optional(),
  websiteUrl: z.string().url().optional(),
});

// Response types for API
export type BrandResponse = {
  success: boolean;
  data?: Brand;
  error?: string;
};

export type BrandsResponse = {
  success: boolean;
  data?: Brand[];
  error?: string;
};
