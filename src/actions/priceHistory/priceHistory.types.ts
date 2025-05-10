import { z } from "zod";
import { priceHistory } from "@/lib/db/schema";

// Type for the price history table
export type PriceHistory = typeof priceHistory.$inferSelect;
export type NewPriceHistory = typeof priceHistory.$inferInsert;

// Zod schema for validation
export const priceHistorySchema = z.object({
  variantId: z.string().uuid(),
  price: z.number().transform((val) => val.toString()),
  salePrice: z.number().transform((val) => val.toString()),
  effectiveFrom: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  effectiveTo: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  history: z.record(z.any()).optional(),
  updatedBy: z.string().uuid().optional(),
});

// Response types for API
export type PriceHistoryResponse = {
  success: boolean;
  data?: PriceHistory;
  error?: string;
};

export type PriceHistoriesResponse = {
  success: boolean;
  data?: PriceHistory[];
  error?: string;
};
