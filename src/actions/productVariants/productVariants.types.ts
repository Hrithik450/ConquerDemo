import { z } from "zod";

export const productVariantSchema = z.object({
  id: z.string().optional(),
  productId: z.string(),
  sku: z.string(),
  stock: z.number().default(0),
  price: z.number(),
  isDefault: z.boolean().default(false),
  isActive: z.boolean().default(true),
  productMedia: z.record(z.any()).optional(),
  name: z.string().optional(),
  description: z.string().optional(),
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
