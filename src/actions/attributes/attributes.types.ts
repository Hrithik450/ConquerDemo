import { z } from "zod";
import { attributes } from "@/lib/db/schema";

// Type for the attributes table
export type Attribute = typeof attributes.$inferSelect;
export type NewAttribute = typeof attributes.$inferInsert;

// Zod schema for validation
export const attributeSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
});

// Response types for API
export type AttributeResponse = {
  success: boolean;
  data?: Attribute;
  error?: string;
};

export type AttributesResponse = {
  success: boolean;
  data?: Attribute[];
  error?: string;
};
