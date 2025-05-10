import { db } from "@/lib/db";
import { productAttributeValues } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import type {
  NewProductAttributeValue,
  ProductAttributeValue,
} from "./productAttributeValues.types";

export class ProductAttributeValuesModel {
  static async createProductAttributeValue(
    data: NewProductAttributeValue
  ): Promise<ProductAttributeValue> {
    const [value] = await db
      .insert(productAttributeValues)
      .values(data)
      .returning();
    return value;
  }

  static async getProductAttributeValueById(
    id: string
  ): Promise<ProductAttributeValue | null> {
    const [value] = await db
      .select()
      .from(productAttributeValues)
      .where(eq(productAttributeValues.productAttributeValueId, id));
    return value || null;
  }

  static async getProductAttributeValue(
    productAttributeId: string,
    attributeValueId: string
  ): Promise<ProductAttributeValue | null> {
    const [value] = await db
      .select()
      .from(productAttributeValues)
      .where(
        and(
          eq(productAttributeValues.productAttributeId, productAttributeId),
          eq(productAttributeValues.attributeValueId, attributeValueId)
        )
      );
    return value || null;
  }

  static async getProductAttributeValuesByProductAttributeId(
    productAttributeId: string
  ): Promise<ProductAttributeValue[]> {
    return await db
      .select()
      .from(productAttributeValues)
      .where(eq(productAttributeValues.productAttributeId, productAttributeId));
  }

  static async getProductAttributeValuesByAttributeValueId(
    attributeValueId: string
  ): Promise<ProductAttributeValue[]> {
    return await db
      .select()
      .from(productAttributeValues)
      .where(eq(productAttributeValues.attributeValueId, attributeValueId));
  }

  static async deleteProductAttributeValue(id: string): Promise<boolean> {
    const result = await db
      .delete(productAttributeValues)
      .where(eq(productAttributeValues.productAttributeValueId, id));
    return result.count > 0;
  }

  static async deleteProductAttributeValueByAttribute(
    productAttributeId: string,
    attributeValueId: string
  ): Promise<boolean> {
    const result = await db
      .delete(productAttributeValues)
      .where(
        and(
          eq(productAttributeValues.productAttributeId, productAttributeId),
          eq(productAttributeValues.attributeValueId, attributeValueId)
        )
      );
    return result.count > 0;
  }

  static async deleteAllProductAttributeValues(
    productAttributeId: string
  ): Promise<boolean> {
    const result = await db
      .delete(productAttributeValues)
      .where(eq(productAttributeValues.productAttributeId, productAttributeId));
    return result.count > 0;
  }
}
