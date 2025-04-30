import { z } from "zod";
import { brandCategories } from "@/lib/db/schema";

// Type for the brandCategories table
export type BrandCategory = typeof brandCategories.$inferSelect;
export type NewBrandCategory = typeof brandCategories.$inferInsert;

// Zod schema for validation
export const brandCategorySchema = z.object({
  brandId: z.string().uuid(),
  categoryId: z.string().uuid(),
  brandCategoryName: z.string().optional(),
});

// Response types for API
export type BrandCategoryResponse = {
  success: boolean;
  data?: BrandCategory;
  error?: string;
};

export type BrandCategoriesResponse = {
  success: boolean;
  data?: BrandCategory[];
  error?: string;
};
