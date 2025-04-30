import { db } from "@/lib/db";
import { productVariants, products } from "@/lib/db/schema";
import { eq, and, like } from "drizzle-orm";
import type { ProductVariant } from "./productVariants.types";

export class ProductVariantsModel {
  static async createProductVariant(data: Omit<ProductVariant, "id" | "createdAt" | "updatedAt">) {
    const [variant] = await db
      .insert(productVariants)
      .values({
        productId: data.productId,
        sku: data.sku,
        stockQuantity: data.stock,
        price: data.price,
        isDefault: false,
        isActive: data.isActive,
        productMedia: null,
        otherData: null,
      })
      .returning();
    return this.mapToProductVariant(variant);
  }

  static async getProductVariantById(id: string) {
    const [variant] = await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.productVariantId, id));
    return variant ? this.mapToProductVariant(variant) : null;
  }

  static async getProductVariantBySku(sku: string): Promise<ProductVariant | null> {
    const [variant] = await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.sku, sku));
    return variant ? this.mapToProductVariant(variant) : null;
  }

  static async getProductVariantsByProduct(productId: string) {
    const variants = await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.productId, productId));
    return Promise.all(variants.map(v => this.mapToProductVariant(v)));
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
    return variant ? this.mapToProductVariant(variant) : null;
  }

  static async updateProductVariant(id: string, data: Partial<ProductVariant>) {
    const [variant] = await db
      .update(productVariants)
      .set({
        sku: data.sku,
        stockQuantity: data.stock,
        price: data.price,
        isActive: data.isActive,
        updatedAt: new Date(),
      })
      .where(eq(productVariants.productVariantId, id))
      .returning();
    return variant ? this.mapToProductVariant(variant) : null;
  }

  static async deleteProductVariant(id: string) {
    const [variant] = await db
      .delete(productVariants)
      .where(eq(productVariants.productVariantId, id))
      .returning();
    return variant ? this.mapToProductVariant(variant) : null;
  }

  static async listProductVariants() {
    const variants = await db
      .select()
      .from(productVariants);
    return Promise.all(variants.map(v => this.mapToProductVariant(v)));
  }

  static async searchProductVariants(searchTerm: string): Promise<ProductVariant[]> {
    const variants = await db
      .select()
      .from(productVariants)
      .where(like(productVariants.sku, `%${searchTerm}%`));
    return Promise.all(variants.map(v => this.mapToProductVariant(v)));
  }

  static async updateStockQuantity(
    id: string,
    quantity: number
  ): Promise<ProductVariant | null> {
    const [variant] = await db
      .update(productVariants)
      .set({ 
        stockQuantity: quantity, 
        updatedAt: new Date() 
      })
      .where(eq(productVariants.productVariantId, id))
      .returning();
    return variant ? this.mapToProductVariant(variant) : null;
  }

  private static async mapToProductVariant(dbVariant: typeof productVariants.$inferSelect): Promise<ProductVariant> {
    // Get the product name
    const [product] = await db
      .select({ name: products.name })
      .from(products)
      .where(eq(products.productId, dbVariant.productId));

    return {
      id: dbVariant.productVariantId,
      productId: dbVariant.productId,
      sku: dbVariant.sku || "",
      name: product?.name || "",
      price: Number(dbVariant.price),
      stock: dbVariant.stockQuantity,
      isActive: dbVariant.isActive,
      createdAt: dbVariant.createdAt,
      updatedAt: dbVariant.updatedAt,
    };
  }
}
