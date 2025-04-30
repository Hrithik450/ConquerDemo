import { z } from "zod";

export const productVariantSchema = z.object({
  id: z.string().optional(),
  productId: z.string(),
  sku: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  stock: z.number().default(0),
  isActive: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type ProductVariant = z.infer<typeof productVariantSchema>;

export interface ProductVariantResponse {
  success: boolean;
  data?: ProductVariant;
  error?: string;
}

export interface ProductVariantsResponse {
  success: boolean;
  data?: ProductVariant[];
  error?: string;
}
