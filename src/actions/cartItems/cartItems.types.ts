import { z } from "zod";
import { cartItems } from "@/lib/db/schema";

// Type for the cartItems table
export type CartItem = typeof cartItems.$inferSelect;
export type NewCartItem = typeof cartItems.$inferInsert;

// Zod schema for validation
export const cartItemSchema = z.object({
  cartId: z.string().uuid(),
  productVariantId: z.string().uuid(),
  quantity: z.number().min(1),
  priceAtAddition: z.string().regex(/^\d+\.\d{2}$/, "Price must be a decimal with 2 decimal places"),
  appliedDiscount: z.number().min(0).optional(),
});

// Response types for API
export type CartItemResponse = {
  success: boolean;
  data?: CartItem;
  error?: string;
};

export type CartItemsResponse = {
  success: boolean;
  data?: CartItem[];
  error?: string;
};
