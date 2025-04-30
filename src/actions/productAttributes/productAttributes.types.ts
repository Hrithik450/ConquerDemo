import { z } from "zod";
import { productAttributes } from "@/lib/db/schema";

// Type for the productAttributes table
export type ProductAttribute = typeof productAttributes.$inferSelect;
export type NewProductAttribute = typeof productAttributes.$inferInsert;

// Zod schema for validation
export const productAttributeSchema = z.object({
  productAttributeId: z.string(),
  productId: z.string(),
  attributeId: z.string(),
  isRequired: z.boolean().default(false),
  displayOrder: z.number().nullable(),
  createdAt: z.date(),
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
