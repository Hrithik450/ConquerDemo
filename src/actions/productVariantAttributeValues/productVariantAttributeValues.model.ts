import { db } from "@/lib/db";
import { productVariantAttributeValues } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import type {
  NewProductVariantAttributeValue,
  ProductVariantAttributeValue,
} from "./productVariantAttributeValues.types";

export class ProductVariantAttributeValuesModel {
  static async createProductVariantAttributeValue(
    data: NewProductVariantAttributeValue
  ): Promise<ProductVariantAttributeValue> {
    const [value] = await db
      .insert(productVariantAttributeValues)
      .values(data)
      .returning();
    return value;
  }

  static async getProductVariantAttributeValue(
    productVariantId: string,
    productAttributeValueId: string
  ): Promise<ProductVariantAttributeValue | null> {
    const [value] = await db
      .select()
      .from(productVariantAttributeValues)
      .where(
        and(
          eq(productVariantAttributeValues.productVariantId, productVariantId),
          eq(
            productVariantAttributeValues.productAttributeValueId,
            productAttributeValueId
          )
        )
      );
    return value || null;
  }

  static async getProductVariantAttributeValuesByVariantId(
    productVariantId: string
  ): Promise<ProductVariantAttributeValue[]> {
    return await db
      .select()
      .from(productVariantAttributeValues)
      .where(
        eq(productVariantAttributeValues.productVariantId, productVariantId)
      );
  }

  static async getProductVariantAttributeValuesByAttributeValueId(
    productAttributeValueId: string
  ): Promise<ProductVariantAttributeValue[]> {
    return await db
      .select()
      .from(productVariantAttributeValues)
      .where(
        eq(
          productVariantAttributeValues.productAttributeValueId,
          productAttributeValueId
        )
      );
  }

  static async deleteProductVariantAttributeValue(
    productVariantId: string,
    productAttributeValueId: string
  ): Promise<boolean> {
    const result = await db
      .delete(productVariantAttributeValues)
      .where(
        and(
          eq(productVariantAttributeValues.productVariantId, productVariantId),
          eq(
            productVariantAttributeValues.productAttributeValueId,
            productAttributeValueId
          )
        )
      );
    return result.rowCount !== null && result.rowCount > 0;
  }

  static async deleteAllProductVariantAttributeValues(
    productVariantId: string
  ): Promise<boolean> {
    const result = await db
      .delete(productVariantAttributeValues)
      .where(
        eq(productVariantAttributeValues.productVariantId, productVariantId)
      );
    return result.rowCount !== null && result.rowCount > 0;
  }
}
