import { z } from "zod";
import { orders } from "@/lib/db/schema";

// Type for the orders table
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

// Zod schema for validation
export const orderSchema = z.object({
  userId: z.string().uuid(),
  status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
  totalAmount: z.number().positive(),
  shippingAddress: z.string(),
  billingAddress: z.string(),
  paymentMethod: z.string(),
  paymentStatus: z.enum(["pending", "paid", "failed", "refunded"]),
  trackingNumber: z.string().optional(),
  notes: z.string().optional(),
});

// Response types for API
export type OrderResponse = {
  success: boolean;
  data?: Order;
  error?: string;
  message?: string;
};

export type OrdersResponse = {
  success: boolean;
  data?: Order[];
  error?: string;
};
