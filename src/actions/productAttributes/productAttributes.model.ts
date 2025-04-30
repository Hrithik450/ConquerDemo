import { db } from "@/lib/db";
import { productAttributes } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import type { NewProductAttribute, ProductAttribute } from "./productAttributes.types";

export class ProductAttributesModel {
  static async createProductAttribute(data: NewProductAttribute): Promise<ProductAttribute> {
    const [productAttribute] = await db.insert(productAttributes).values(data).returning();
    return productAttribute;
  }

  static async getProductAttribute(productId: string, attributeId: string): Promise<ProductAttribute | null> {
    const [productAttribute] = await db
      .select()
      .from(productAttributes)
      .where(
        and(
          eq(productAttributes.productId, productId),
          eq(productAttributes.attributeId, attributeId)
        )
      );
    return productAttribute || null;
  }

  static async getAttributesByProductId(productId: string): Promise<ProductAttribute[]> {
    return await db
      .select()
      .from(productAttributes)
      .where(eq(productAttributes.productId, productId));
  }

  static async getProductsByAttributeId(attributeId: string): Promise<ProductAttribute[]> {
    return await db
      .select()
      .from(productAttributes)
      .where(eq(productAttributes.attributeId, attributeId));
  }

  static async updateProductAttribute(
    productId: string,
    attributeId: string,
    data: Partial<NewProductAttribute>
  ): Promise<ProductAttribute | null> {
    const [productAttribute] = await db
      .update(productAttributes)
      .set(data)
      .where(
        and(
          eq(productAttributes.productId, productId),
          eq(productAttributes.attributeId, attributeId)
        )
      )
      .returning();
    return productAttribute || null;
  }

  static async deleteProductAttribute(productId: string, attributeId: string): Promise<boolean> {
    const result = await db
      .delete(productAttributes)
      .where(
        and(
          eq(productAttributes.productId, productId),
          eq(productAttributes.attributeId, attributeId)
        )
      );
    return result.count > 0;
  }

  static async listProductAttributes(): Promise<ProductAttribute[]> {
    return await db.select().from(productAttributes);
  }
}
