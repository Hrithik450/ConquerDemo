import { ProductVariantAttributeValuesModel } from "./productVariantAttributeValues.model";
import { productVariantAttributeValueSchema } from "./productVariantAttributeValues.types";
import type {
  ProductVariantAttributeValue,
  ProductVariantAttributeValueResponse,
  ProductVariantAttributeValuesResponse,
} from "./productVariantAttributeValues.types";

export class ProductVariantAttributeValuesService {
  static async createProductVariantAttributeValue(
    data: Partial<ProductVariantAttributeValue>
  ): Promise<ProductVariantAttributeValueResponse> {
    try {
      // Validate input data
      const validatedData = productVariantAttributeValueSchema.parse(data);
      
      // Check if the relationship already exists
      const existingValue = await ProductVariantAttributeValuesModel.getProductVariantAttributeValue(
        validatedData.productVariantId,
        validatedData.productAttributeValueId
      );
      if (existingValue) {
        return {
          success: false,
          error: "This attribute value is already assigned to this product variant",
        };
      }

      // Create new relationship
      const value = await ProductVariantAttributeValuesModel.createProductVariantAttributeValue(validatedData);
      return {
        success: true,
        data: value,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create product variant attribute value",
      };
    }
  }

  static async getProductVariantAttributeValue(
    productVariantId: string,
    productAttributeValueId: string
  ): Promise<ProductVariantAttributeValueResponse> {
    try {
      const value = await ProductVariantAttributeValuesModel.getProductVariantAttributeValue(
        productVariantId,
        productAttributeValueId
      );
      if (!value) {
        return {
          success: false,
          error: "Product variant attribute value not found",
        };
      }
      return {
        success: true,
        data: value,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get product variant attribute value",
      };
    }
  }

  static async getProductVariantAttributeValuesByVariantId(
    productVariantId: string
  ): Promise<ProductVariantAttributeValuesResponse> {
    try {
      const values = await ProductVariantAttributeValuesModel.getProductVariantAttributeValuesByVariantId(
        productVariantId
      );
      return {
        success: true,
        data: values,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get product variant attribute values",
      };
    }
  }

  static async getProductVariantAttributeValuesByAttributeValueId(
    productAttributeValueId: string
  ): Promise<ProductVariantAttributeValuesResponse> {
    try {
      const values = await ProductVariantAttributeValuesModel.getProductVariantAttributeValuesByAttributeValueId(
        productAttributeValueId
      );
      return {
        success: true,
        data: values,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get product variant attribute values",
      };
    }
  }

  static async deleteProductVariantAttributeValue(
    productVariantId: string,
    productAttributeValueId: string
  ): Promise<ProductVariantAttributeValueResponse> {
    try {
      const success = await ProductVariantAttributeValuesModel.deleteProductVariantAttributeValue(
        productVariantId,
        productAttributeValueId
      );
      if (!success) {
        return {
          success: false,
          error: "Product variant attribute value not found",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete product variant attribute value",
      };
    }
  }

  static async deleteAllProductVariantAttributeValues(
    productVariantId: string
  ): Promise<ProductVariantAttributeValueResponse> {
    try {
      const success = await ProductVariantAttributeValuesModel.deleteAllProductVariantAttributeValues(
        productVariantId
      );
      if (!success) {
        return {
          success: false,
          error: "No product variant attribute values found to delete",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete product variant attribute values",
      };
    }
  }
}
