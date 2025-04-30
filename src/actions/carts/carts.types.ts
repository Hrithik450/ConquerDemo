import { z } from "zod";
import { carts } from "@/lib/db/schema";

// Type for the carts table
export type Cart = typeof carts.$inferSelect;
export type NewCart = typeof carts.$inferInsert;

// Zod schema for validation
export const cartSchema = z.object({
  userId: z.string().uuid(),
  organizationId: z.string().uuid(),
});

// Response types for API
export type CartResponse = {
  success: boolean;
  data?: Cart;
  error?: string;
};

export type CartsResponse = {
  success: boolean;
  data?: Cart[];
  error?: string;
};
