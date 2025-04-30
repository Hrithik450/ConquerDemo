import { z } from "zod";
import { attributeValues } from "@/lib/db/schema";

// Type for the attributeValues table
export type AttributeValue = typeof attributeValues.$inferSelect;
export type NewAttributeValue = typeof attributeValues.$inferInsert;

// Zod schema for validation
export const attributeValueSchema = z.object({
  attributeId: z.string().uuid(),
  value: z.string().min(1),
  slug: z.string().min(1).optional(),
  otherData: z.record(z.any()).optional(),
});

// Response types for API
export type AttributeValueResponse = {
  success: boolean;
  data?: AttributeValue;
  error?: string;
};

export type AttributeValuesResponse = {
  success: boolean;
  data?: AttributeValue[];
  error?: string;
};
