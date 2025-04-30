import { z } from "zod";
import { contractCategoryDiscounts } from "@/lib/db/schema";

// Type for the contractCategoryDiscounts table
export type ContractCategoryDiscount = typeof contractCategoryDiscounts.$inferSelect;
export type NewContractCategoryDiscount = typeof contractCategoryDiscounts.$inferInsert;

// Zod schema for validation
export const contractCategoryDiscountSchema = z.object({
  contractId: z.string().uuid(),
  categoryId: z.string().uuid(),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z.string().min(0),
});

// Response types for API
export type ContractCategoryDiscountResponse = {
  success: boolean;
  data?: ContractCategoryDiscount;
  error?: string;
};

export type ContractCategoryDiscountsResponse = {
  success: boolean;
  data?: ContractCategoryDiscount[];
  error?: string;
};
