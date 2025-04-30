import { z } from "zod";
import { contractProductDiscounts } from "@/lib/db/schema";

// Type for the contractProductDiscounts table
export type ContractProductDiscount = typeof contractProductDiscounts.$inferSelect;
export type NewContractProductDiscount = typeof contractProductDiscounts.$inferInsert;

// Zod schema for validation
export const contractProductDiscountSchema = z.object({
  contractId: z.string().uuid(),
  productId: z.string().uuid(),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z.string().min(0),
});

// Response types for API
export type ContractProductDiscountResponse = {
  success: boolean;
  data?: ContractProductDiscount;
  error?: string;
};

export type ContractProductDiscountsResponse = {
  success: boolean;
  data?: ContractProductDiscount[];
  error?: string;
};
