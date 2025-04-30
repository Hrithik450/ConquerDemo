import { z } from "zod";
import { brands } from "@/lib/db/schema";

// Type for the brands table
export type Brand = typeof brands.$inferSelect;
export type NewBrand = typeof brands.$inferInsert;

// Zod schema for validation
export const brandSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  organizationId: z.string().uuid(),
  isActive: z.boolean().default(true),
  otherData: z.record(z.unknown()).optional(),
});

// Response types for API
export type BrandResponse = {
  success: boolean;
  data?: Brand;
  error?: string;
  message?: string;
};

export type BrandsResponse = {
  success: boolean;
  data?: Brand[];
  error?: string;
};
