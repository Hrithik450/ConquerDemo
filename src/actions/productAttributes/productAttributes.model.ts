import { db } from "@/lib/db";
import type { ProductAttribute } from "./productAttributes.types";

export class ProductAttributesModel {
  static async createProductAttribute(data: ProductAttribute) {
    return await db.productAttribute.create({
      data,
    });
  }

  static async getProductAttributeById(id: string) {
    return await db.productAttribute.findUnique({
      where: { id },
    });
  }

  static async getProductAttributesByProduct(productId: string) {
    return await db.productAttribute.findMany({
      where: { productId },
    });
  }

  static async getProductAttributesByAttribute(attributeId: string) {
    return await db.productAttribute.findMany({
      where: { attributeId },
    });
  }

  static async updateProductAttribute(id: string, data: Partial<ProductAttribute>) {
    return await db.productAttribute.update({
      where: { id },
      data,
    });
  }

  static async deleteProductAttribute(id: string) {
    return await db.productAttribute.delete({
      where: { id },
    });
  }

  static async listProductAttributes() {
    return await db.productAttribute.findMany();
  }
}
