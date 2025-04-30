import { z } from "zod";
import { categoryAttributes } from "@/lib/db/schema";

// Type for the categoryAttributes table
export type CategoryAttribute = typeof categoryAttributes.$inferSelect;
export type NewCategoryAttribute = typeof categoryAttributes.$inferInsert;

// Zod schema for validation
export const categoryAttributeSchema = z.object({
  categoryId: z.string().uuid(),
  attributeId: z.string().uuid(),
});

// Response types for API
export type CategoryAttributeResponse = {
  success: boolean;
  data?: CategoryAttribute;
  error?: string;
};

export type CategoryAttributesResponse = {
  success: boolean;
  data?: CategoryAttribute[];
  error?: string;
};
