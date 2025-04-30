import { z } from "zod";
import { contractBrandDiscounts } from "@/lib/db/schema";

// Type for the contractBrandDiscounts table
export type ContractBrandDiscount = typeof contractBrandDiscounts.$inferSelect;
export type NewContractBrandDiscount = typeof contractBrandDiscounts.$inferInsert;

// Zod schema for validation
export const contractBrandDiscountSchema = z.object({
  contractId: z.string().uuid(),
  brandId: z.string().uuid(),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z.string().min(0),
});

// Response types for API
export type ContractBrandDiscountResponse = {
  success: boolean;
  data?: ContractBrandDiscount;
  error?: string;
};

export type ContractBrandDiscountsResponse = {
  success: boolean;
  data?: ContractBrandDiscount[];
  error?: string;
};
