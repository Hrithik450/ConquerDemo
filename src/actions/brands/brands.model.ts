import { db } from "@/lib/db";
import { brands } from "@/lib/db/schema";
import { eq, like } from "drizzle-orm";
import type { NewBrand, Brand } from "./brands.types";

export class BrandsModel {
  static async createBrand(data: NewBrand): Promise<Brand> {
    const [brand] = await db.insert(brands).values(data).returning();
    return brand;
  }

  static async getBrandById(id: string): Promise<Brand | null> {
    const [brand] = await db
      .select()
      .from(brands)
      .where(eq(brands.brandId, id));
    return brand || null;
  }

  static async getBrandBySlug(slug: string): Promise<Brand | null> {
    const [brand] = await db.select().from(brands).where(eq(brands.slug, slug));
    return brand || null;
  }

  static async updateBrand(
    id: string,
    data: Partial<NewBrand>
  ): Promise<Brand | null> {
    const [brand] = await db
      .update(brands)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(brands.brandId, id))
      .returning();
    return brand || null;
  }

  static async deleteBrand(id: string): Promise<boolean> {
    const result = await db.delete(brands).where(eq(brands.brandId, id));
    return result.rowCount !== null && result.rowCount > 0;
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
