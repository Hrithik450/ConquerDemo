import { db } from "@/lib/db";
import { productVariants } from "@/lib/db/schema";
import { eq, and, like } from "drizzle-orm";
import type { NewProductVariant, ProductVariant } from "./productVariants.types";

export class ProductVariantsModel {
  static async createProductVariant(data: NewProductVariant): Promise<ProductVariant> {
    const [variant] = await db.insert(productVariants).values(data).returning();
    return variant;
  }

  static async getProductVariantById(id: string): Promise<ProductVariant | null> {
    const [variant] = await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.productVariantId, id));
    return variant || null;
  }

  static async getProductVariantBySku(sku: string): Promise<ProductVariant | null> {
    const [variant] = await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.sku, sku));
    return variant || null;
  }

  static async getProductVariantsByProductId(productId: string): Promise<ProductVariant[]> {
    return await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.productId, productId));
  }

  static async getDefaultVariantByProductId(productId: string): Promise<ProductVariant | null> {
    const [variant] = await db
      .select()
      .from(productVariants)
      .where(
        and(
          eq(productVariants.productId, productId),
          eq(productVariants.isDefault, true)
        )
      );
    return variant || null;
  }

  static async updateProductVariant(
    id: string,
    data: Partial<NewProductVariant>
  ): Promise<ProductVariant | null> {
    const [variant] = await db
      .update(productVariants)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(productVariants.productVariantId, id))
      .returning();
    return variant || null;
  }

  static async deleteProductVariant(id: string): Promise<boolean> {
    const result = await db
      .delete(productVariants)
      .where(eq(productVariants.productVariantId, id));
    return result.count > 0;
  }

  static async searchProductVariants(searchTerm: string): Promise<ProductVariant[]> {
    return await db
      .select()
      .from(productVariants)
      .where(like(productVariants.sku, `%${searchTerm}%`));
  }

  static async updateStockQuantity(
    id: string,
    quantity: number
  ): Promise<ProductVariant | null> {
    const [variant] = await db
      .update(productVariants)
      .set({ stockQuantity: quantity, updatedAt: new Date() })
      .where(eq(productVariants.productVariantId, id))
      .returning();
    return variant || null;
  }
}
