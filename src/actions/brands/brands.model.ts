import { db } from "@/lib/db";
import { brands } from "@/lib/db/schema";
import { eq, like } from "drizzle-orm";
import type { NewBrand, Brand } from "./brands.types";

export class BrandsModel {
  static async createBrand(data: NewBrand): Promise<Brand> {
    const [brand] = await db.insert(brands).values(data).returning();
    return brand;
  }

  static async getBrandById(brandId: string): Promise<Brand | null> {
    const [brand] = await db
      .select()
      .from(brands)
      .where(eq(brands.brandId, brandId));
    return brand || null;
  }

  static async getBrandBySlug(slug: string): Promise<Brand | null> {
    const [brand] = await db
      .select()
      .from(brands)
      .where(eq(brands.slug, slug));
    return brand || null;
  }

  static async updateBrand(brandId: string, data: Partial<NewBrand>): Promise<Brand | null> {
    const [brand] = await db
      .update(brands)
      .set(data)
      .where(eq(brands.brandId, brandId))
      .returning();
    return brand || null;
  }

  static async deleteBrand(brandId: string): Promise<boolean> {
    const result = await db
      .delete(brands)
      .where(eq(brands.brandId, brandId))
      .returning();
    return result.length > 0;
  }

  static async listBrands(): Promise<Brand[]> {
    return await db.select().from(brands);
  }

  static async searchBrands(searchTerm: string): Promise<Brand[]> {
    return await db
      .select()
      .from(brands)
      .where(like(brands.name, `%${searchTerm}%`));
  }
}
