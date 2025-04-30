import { z } from "zod";
import { carts } from "@/lib/db/schema";

// Type for the cart table
export type Cart = typeof carts.$inferSelect;
export type NewCart = typeof carts.$inferInsert;

// Zod schema for validation
export const cartSchema = z.object({
  productVariantId: z.string(),
  quantity: z.number().min(1),
  price: z.number().min(0),
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