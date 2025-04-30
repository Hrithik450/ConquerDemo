import { z } from "zod";
import { orderStatusHistory } from "@/lib/db/schema";

// Type for the orderStatusHistory table
export type OrderStatusHistory = typeof orderStatusHistory.$inferSelect;
export type NewOrderStatusHistory = typeof orderStatusHistory.$inferInsert;

// Zod schema for validation
export const orderStatusHistorySchema = z.object({
  orderId: z.string().uuid(),
  status: z.string().min(1),
  changedBy: z.string().uuid().optional(),
  notes: z.string().optional(),
});

// Response types for API
export type OrderStatusHistoryResponse = {
  success: boolean;
  data?: OrderStatusHistory;
  error?: string;
};

export type OrderStatusHistoriesResponse = {
  success: boolean;
  data?: OrderStatusHistory[];
  error?: string;
};
