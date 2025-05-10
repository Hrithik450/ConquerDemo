import { ProductAttributesModel } from "./productAttributes.model";
import { productAttributeSchema } from "./productAttributes.types";
import type {
  ProductAttribute,
  ProductAttributeResponse,
  ProductAttributesResponse,
} from "./productAttributes.types";
import { v4 as uuidv4 } from "uuid";

export class ProductAttributesService {
  static async createProductAttribute(
    data: Partial<ProductAttribute>
  ): Promise<ProductAttributeResponse> {
    try {
      const validatedData = productAttributeSchema.parse({
        ...data,
        productAttributeId: data.productAttributeId || uuidv4(),
        createdAt: data.createdAt || new Date(),
        displayOrder: data.displayOrder ?? null,
      });
      const [productAttribute] =
        await ProductAttributesModel.createProductAttribute(validatedData);
      return {
        success: true,
        data: productAttribute,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create product attribute",
      };
    }
  }

  static async getProductAttributeById(
    id: string
  ): Promise<ProductAttributeResponse> {
    try {
      const productAttribute =
        await ProductAttributesModel.getProductAttributeById(id);
      if (!productAttribute) {
        return {
          success: false,
          error: "Product attribute not found",
        };
      }
      return {
        success: true,
        data: productAttribute,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get product attribute",
      };
    }
  }

  static async getProductAttributesByProduct(
    productId: string
  ): Promise<ProductAttributesResponse> {
    try {
      const productAttributes =
        await ProductAttributesModel.getProductAttributesByProduct(productId);
      return {
        success: true,
        data: productAttributes,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get product attributes",
      };
    }
  }

  static async getProductAttributesByAttribute(
    attributeId: string
  ): Promise<ProductAttributesResponse> {
    try {
      const productAttributes =
        await ProductAttributesModel.getProductAttributesByAttribute(
          attributeId
        );
      return {
        success: true,
        data: productAttributes,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get product attributes",
      };
    }
  }

  static async updateProductAttribute(
    id: string,
    data: Partial<ProductAttribute>
  ): Promise<ProductAttributeResponse> {
    try {
      const validatedData = productAttributeSchema.partial().parse(data);
      const [productAttribute] =
        await ProductAttributesModel.updateProductAttribute(id, validatedData);
      if (!productAttribute) {
        return {
          success: false,
          error: "Product attribute not found",
        };
      }
      return {
        success: true,
        data: productAttribute,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update product attribute",
      };
    }
  }

  static async deleteProductAttribute(
    id: string
  ): Promise<ProductAttributeResponse> {
    try {
      const [deleted] = await ProductAttributesModel.deleteProductAttribute(id);
      if (!deleted) {
        return {
          success: false,
          error: "Product attribute not found",
        };
      }
      return {
        success: true,
        data: deleted,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete product attribute",
      };
    }
  }

  static async listProductAttributes(): Promise<ProductAttributesResponse> {
    try {
      const productAttributes =
        await ProductAttributesModel.listProductAttributes();
      return {
        success: true,
        data: productAttributes,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to list product attributes",
      };
    }
  }
}
