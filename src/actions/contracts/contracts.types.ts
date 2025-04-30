import { z } from "zod";
import { contracts } from "@/lib/db/schema";

// Type for the contracts table
export type Contract = typeof contracts.$inferSelect;
export type NewContract = typeof contracts.$inferInsert;

// Zod schema for validation
export const contractSchema = z.object({
  organizationId: z.string().uuid(),
  contractNumber: z.string().max(50).optional(),
  startDate: z.date(),
  endDate: z.date(),
  isActive: z.boolean().default(true),
  terms: z.string().optional(),
  notes: z.string().optional(),
});

// Response types for API
export type ContractResponse = {
  success: boolean;
  data?: Contract;
  error?: string;
};

export type ContractsResponse = {
  success: boolean;
  data?: Contract[];
  error?: string;
};
