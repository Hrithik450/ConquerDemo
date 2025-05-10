import { db } from "@/lib/db";
import { productAttributes } from "@/lib/db/schema";
import type { ProductAttribute } from "./productAttributes.types";
import { eq } from "drizzle-orm";

export class ProductAttributesModel {
  static async createProductAttribute(data: ProductAttribute) {
    return await db.insert(productAttributes).values(data).returning();
  }

  static async getProductAttributeById(id: string) {
    return await db
      .select()
      .from(productAttributes)
      .where(eq(productAttributes.productAttributeId, id))
      .then((rows) => rows[0]);
  }

  static async getProductAttributesByProduct(productId: string) {
    return await db
      .select()
      .from(productAttributes)
      .where(eq(productAttributes.productId, productId));
  }

  static async getProductAttributesByAttribute(attributeId: string) {
    return await db
      .select()
      .from(productAttributes)
      .where(eq(productAttributes.attributeId, attributeId));
  }

  static async updateProductAttribute(
    id: string,
    data: Partial<ProductAttribute>
  ) {
    return await db
      .update(productAttributes)
      .set(data)
      .where(eq(productAttributes.productAttributeId, id))
      .returning();
  }

  static async deleteProductAttribute(id: string) {
    return await db
      .delete(productAttributes)
      .where(eq(productAttributes.productAttributeId, id))
      .returning();
  }

  static async listProductAttributes() {
    return await db.select().from(productAttributes);
  }
}
