import { z } from "zod";
import { productVariants } from "@/lib/db/schema";

// Type for the product variants table
export type ProductVariant = typeof productVariants.$inferSelect;
export type NewProductVariant = typeof productVariants.$inferInsert;

// Zod schema for validation
export const productVariantSchema = z.object({
  productId: z.string().uuid(),
  sku: z.string().min(1).optional(),
  stockQuantity: z.number().int().min(0),
  price: z.number().min(0),
  isDefault: z.boolean().default(false),
  isActive: z.boolean().default(true),
  productMedia: z.record(z.any()).optional(),
  otherData: z.record(z.any()).optional(),
});

// Response types for API
export type ProductVariantResponse = {
  success: boolean;
  data?: ProductVariant;
  error?: string;
};

export type ProductVariantsResponse = {
  success: boolean;
  data?: ProductVariant[];
  error?: string;
};
