import { z } from "zod";
import { productVariantAttributeValues } from "@/lib/db/schema";

// Type for the product variant attribute values table
export type ProductVariantAttributeValue = typeof productVariantAttributeValues.$inferSelect;
export type NewProductVariantAttributeValue = typeof productVariantAttributeValues.$inferInsert;

// Zod schema for validation
export const productVariantAttributeValueSchema = z.object({
  productVariantId: z.string().uuid(),
  productAttributeValueId: z.string().uuid(),
});

// Response types for API
export type ProductVariantAttributeValueResponse = {
  success: boolean;
  data?: ProductVariantAttributeValue;
  error?: string;
};

export type ProductVariantAttributeValuesResponse = {
  success: boolean;
  data?: ProductVariantAttributeValue[];
  error?: string;
};
