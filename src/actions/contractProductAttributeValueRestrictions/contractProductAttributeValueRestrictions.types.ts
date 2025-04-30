import { z } from "zod";
import { contractProductAttributeValueRestrictions } from "@/lib/db/schema";

// Type for the contractProductAttributeValueRestrictions table
export type ContractProductAttributeValueRestriction = typeof contractProductAttributeValueRestrictions.$inferSelect;
export type NewContractProductAttributeValueRestriction = typeof contractProductAttributeValueRestrictions.$inferInsert;

// Zod schema for validation
export const contractProductAttributeValueRestrictionSchema = z.object({
  contractId: z.string().uuid(),
  productId: z.string().uuid(),
  attributeId: z.string().uuid(),
  attributeValueId: z.string().uuid(),
  isAllowed: z.boolean().default(true),
});

// Response types for API
export type ContractProductAttributeValueRestrictionResponse = {
  success: boolean;
  data?: ContractProductAttributeValueRestriction;
  error?: string;
};

export type ContractProductAttributeValueRestrictionsResponse = {
  success: boolean;
  data?: ContractProductAttributeValueRestriction[];
  error?: string;
};
