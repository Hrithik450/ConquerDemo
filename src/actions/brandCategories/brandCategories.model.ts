import { db } from "@/lib/db";
import { brandCategories } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import type { NewBrandCategory, BrandCategory } from "./brandCategories.types";

export class BrandCategoriesModel {
  static async createBrandCategory(
    data: NewBrandCategory
  ): Promise<BrandCategory> {
    const [brandCategory] = await db
      .insert(brandCategories)
      .values(data)
      .returning();
    return brandCategory;
  }

  static async getBrandCategory(
    brandId: string,
    categoryId: string
  ): Promise<BrandCategory | null> {
    const [brandCategory] = await db
      .select()
      .from(brandCategories)
      .where(
        and(
          eq(brandCategories.brandId, brandId),
          eq(brandCategories.categoryId, categoryId)
        )
      );
    return brandCategory || null;
  }

  static async getCategoriesByBrandId(
    brandId: string
  ): Promise<BrandCategory[]> {
    return await db
      .select()
      .from(brandCategories)
      .where(eq(brandCategories.brandId, brandId));
  }

  static async getBrandsByCategoryId(
    categoryId: string
  ): Promise<BrandCategory[]> {
    return await db
      .select()
      .from(brandCategories)
      .where(eq(brandCategories.categoryId, categoryId));
  }

  static async updateBrandCategory(
    brandId: string,
    categoryId: string,
    data: Partial<NewBrandCategory>
  ): Promise<BrandCategory | null> {
    const [brandCategory] = await db
      .update(brandCategories)
      .set(data)
      .where(
        and(
          eq(brandCategories.brandId, brandId),
          eq(brandCategories.categoryId, categoryId)
        )
      )
      .returning();
    return brandCategory || null;
  }

  static async deleteBrandCategory(
    brandId: string,
    categoryId: string
  ): Promise<boolean> {
    const result = await db
      .delete(brandCategories)
      .where(
        and(
          eq(brandCategories.brandId, brandId),
          eq(brandCategories.categoryId, categoryId)
        )
      );
    return result.rowCount !== null && result.rowCount > 0;
  }

  static async listBrandCategories(): Promise<BrandCategory[]> {
    return await db.select().from(brandCategories);
  }
}
