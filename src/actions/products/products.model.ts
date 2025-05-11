import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { eq, and, like } from "drizzle-orm";
import type { NewProduct, Product } from "./products.types";

export class ProductsModel {
  static async createProduct(data: NewProduct): Promise<Product> {
    const [product] = await db.insert(products).values(data).returning();
    return product;
  }

  static async getProductById(id: string): Promise<Product | null> {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.productId, id));
    return product || null;
  }

  static async getProductBySlug(slug: string): Promise<Product | null> {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug));
    return product || null;
  }

  static async getProductsByBrandId(brandId: string): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(eq(products.brandId, brandId));
  }

  static async getProductsByCategoryId(categoryId: string): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(eq(products.categoryId, categoryId));
  }

  static async updateProduct(
    id: string,
    data: Partial<NewProduct>
  ): Promise<Product | null> {
    const [product] = await db
      .update(products)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(products.productId, id))
      .returning();
    return product || null;
  }

  static async deleteProduct(id: string): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.productId, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  static async listProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  static async listActiveProducts(): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.isActive, true));
  }

  static async searchProducts(searchTerm: string): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(like(products.name, `%${searchTerm}%`));
  }

  static async searchActiveProducts(searchTerm: string): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(
        and(like(products.name, `%${searchTerm}%`), eq(products.isActive, true))
      );
  }

  static async getProductsByBrand(brandId: string): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(eq(products.brandId, brandId));
  }

  static async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(eq(products.categoryId, categoryId));
  }
}
