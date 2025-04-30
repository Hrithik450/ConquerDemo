import { z } from "zod";
import { productAttributes } from "@/lib/db/schema";

// Type for the productAttributes table
export type ProductAttribute = typeof productAttributes.$inferSelect;
export type NewProductAttribute = typeof productAttributes.$inferInsert;

// Zod schema for validation
export const productAttributeSchema = z.object({
  productId: z.string().uuid(),
  attributeId: z.string().uuid(),
  isRequired: z.boolean().default(false),
  displayOrder: z.number().int().optional(),
});

// Response types for API
export type ProductAttributeResponse = {
  success: boolean;
  data?: ProductAttribute;
  error?: string;
};

export type ProductAttributesResponse = {
  success: boolean;
  data?: ProductAttribute[];
  error?: string;
};
