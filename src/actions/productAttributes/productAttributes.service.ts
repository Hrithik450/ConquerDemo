import { ProductAttributesModel } from "./productAttributes.model";
import { productAttributeSchema } from "./productAttributes.types";
import type {
  ProductAttribute,
  ProductAttributeResponse,
  ProductAttributesResponse,
} from "./productAttributes.types";

export class ProductAttributesService {
  static async createProductAttribute(
    data: Partial<ProductAttribute>
  ): Promise<ProductAttributeResponse> {
    try {
      const validatedData = productAttributeSchema.parse(data);
      const productAttribute = await ProductAttributesModel.createProductAttribute(validatedData);
      return { success: true, data: productAttribute };
    } catch (error) {
      return { success: false, error: "Failed to create product attribute" };
    }
  }

  static async getProductAttribute(
    productId: string,
    attributeId: string
  ): Promise<ProductAttributeResponse> {
    try {
      const productAttribute = await ProductAttributesModel.getProductAttribute(
        productId,
        attributeId
      );
      if (!productAttribute) {
        return { success: false, error: "Product attribute not found" };
      }
      return { success: true, data: productAttribute };
    } catch (error) {
      return { success: false, error: "Failed to get product attribute" };
    }
  }

  static async getAttributesByProductId(productId: string): Promise<ProductAttributesResponse> {
    try {
      const attributes = await ProductAttributesModel.getAttributesByProductId(productId);
      return { success: true, data: attributes };
    } catch (error) {
      return { success: false, error: "Failed to get product attributes" };
    }
  }

  static async getProductsByAttributeId(attributeId: string): Promise<ProductAttributesResponse> {
    try {
      const products = await ProductAttributesModel.getProductsByAttributeId(attributeId);
      return { success: true, data: products };
    } catch (error) {
      return { success: false, error: "Failed to get products by attribute" };
    }
  }

  static async updateProductAttribute(
    productId: string,
    attributeId: string,
    data: Partial<ProductAttribute>
  ): Promise<ProductAttributeResponse> {
    try {
      const validatedData = productAttributeSchema.partial().parse(data);
      const productAttribute = await ProductAttributesModel.updateProductAttribute(
        productId,
        attributeId,
        validatedData
      );
      if (!productAttribute) {
        return { success: false, error: "Product attribute not found" };
      }
      return { success: true, data: productAttribute };
    } catch (error) {
      return { success: false, error: "Failed to update product attribute" };
    }
  }

  static async deleteProductAttribute(
    productId: string,
    attributeId: string
  ): Promise<ProductAttributeResponse> {
    try {
      const success = await ProductAttributesModel.deleteProductAttribute(productId, attributeId);
      if (!success) {
        return { success: false, error: "Product attribute not found" };
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to delete product attribute" };
    }
  }

  static async listProductAttributes(): Promise<ProductAttributesResponse> {
    try {
      const attributes = await ProductAttributesModel.listProductAttributes();
      return { success: true, data: attributes };
    } catch (error) {
      return { success: false, error: "Failed to list product attributes" };
    }
  }
}
