import { z } from "zod";
import { orderItems } from "@/lib/db/schema";

// Type for the order items table
export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;

// Input type for service layer
export type OrderItemInput = {
  orderId?: string;
  productVariantId?: string;
  quantity?: number;
  price?: number;
  discount?: number;
  totalPrice?: number;
};

// Base schema without transformations
const baseOrderItemSchema = z.object({
  orderId: z.string().uuid(),
  productVariantId: z.string().uuid(),
  quantity: z.number().int().min(1),
  price: z.number().min(0),
  discount: z.number().min(0).default(0),
  totalPrice: z.number().min(0),
});

// Schema for database storage (with proper type conversions)
export const orderItemSchema = baseOrderItemSchema.transform(data => ({
  ...data,
  price: data.price.toFixed(2), // Convert to string for database
  discount: Number(data.discount.toFixed(2)), // Keep as number for database
  totalPrice: data.totalPrice.toFixed(2), // Convert to string for database
}));

// Partial schema for updates (with proper type conversions)
export const partialOrderItemSchema = z.object({
  orderId: z.string().uuid().optional(),
  productVariantId: z.string().uuid().optional(),
  quantity: z.number().int().min(1).optional(),
  price: z.number().min(0).optional(),
  discount: z.number().min(0).default(0).optional(),
  totalPrice: z.number().min(0).optional(),
}).transform(data => {
  if (!data) return data;
  return {
    ...data,
    ...(data.price !== undefined && { price: data.price.toFixed(2) }), // Convert to string for database
    ...(data.discount !== undefined && { discount: Number(data.discount.toFixed(2)) }), // Keep as number for database
    ...(data.totalPrice !== undefined && { totalPrice: data.totalPrice.toFixed(2) }), // Convert to string for database
  };
});

// Response types for API
export type OrderItemResponse = {
  success: boolean;
  data?: OrderItem;
  error?: string;
};

export type OrderItemsResponse = {
  success: boolean;
  data?: OrderItem[];
  error?: string;
};
