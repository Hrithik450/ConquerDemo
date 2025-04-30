import { z } from "zod";
import { productAttributeValues } from "@/lib/db/schema";

// Type for the product attribute values table
export type ProductAttributeValue = typeof productAttributeValues.$inferSelect;
export type NewProductAttributeValue = typeof productAttributeValues.$inferInsert;

// Zod schema for validation
export const productAttributeValueSchema = z.object({
  productAttributeId: z.string().uuid(),
  attributeValueId: z.string().uuid(),
});

// Response types for API
export type ProductAttributeValueResponse = {
  success: boolean;
  data?: ProductAttributeValue;
  error?: string;
};

export type ProductAttributeValuesResponse = {
  success: boolean;
  data?: ProductAttributeValue[];
  error?: string;
};
