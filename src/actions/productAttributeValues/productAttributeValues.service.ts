import { ProductAttributeValuesModel } from "./productAttributeValues.model";
import { productAttributeValueSchema } from "./productAttributeValues.types";
import type {
  ProductAttributeValue,
  ProductAttributeValueResponse,
  ProductAttributeValuesResponse,
} from "./productAttributeValues.types";

export class ProductAttributeValuesService {
  static async createProductAttributeValue(
    data: Partial<ProductAttributeValue>
  ): Promise<ProductAttributeValueResponse> {
    try {
      // Validate input data
      const validatedData = productAttributeValueSchema.parse(data);
      
      // Check if the relationship already exists
      const existingValue = await ProductAttributeValuesModel.getProductAttributeValue(
        validatedData.productAttributeId,
        validatedData.attributeValueId
      );
      if (existingValue) {
        return {
          success: false,
          error: "This attribute value is already assigned to this product attribute",
        };
      }

      // Create new relationship
      const value = await ProductAttributeValuesModel.createProductAttributeValue(validatedData);
      return {
        success: true,
        data: value,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create product attribute value",
      };
    }
  }

  static async getProductAttributeValueById(id: string): Promise<ProductAttributeValueResponse> {
    try {
      const value = await ProductAttributeValuesModel.getProductAttributeValueById(id);
      if (!value) {
        return {
          success: false,
          error: "Product attribute value not found",
        };
      }
      return {
        success: true,
        data: value,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get product attribute value",
      };
    }
  }

  static async getProductAttributeValue(
    productAttributeId: string,
    attributeValueId: string
  ): Promise<ProductAttributeValueResponse> {
    try {
      const value = await ProductAttributeValuesModel.getProductAttributeValue(
        productAttributeId,
        attributeValueId
      );
      if (!value) {
        return {
          success: false,
          error: "Product attribute value not found",
        };
      }
      return {
        success: true,
        data: value,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get product attribute value",
      };
    }
  }

  static async getProductAttributeValuesByProductAttributeId(
    productAttributeId: string
  ): Promise<ProductAttributeValuesResponse> {
    try {
      const values = await ProductAttributeValuesModel.getProductAttributeValuesByProductAttributeId(
        productAttributeId
      );
      return {
        success: true,
        data: values,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get product attribute values",
      };
    }
  }

  static async getProductAttributeValuesByAttributeValueId(
    attributeValueId: string
  ): Promise<ProductAttributeValuesResponse> {
    try {
      const values = await ProductAttributeValuesModel.getProductAttributeValuesByAttributeValueId(
        attributeValueId
      );
      return {
        success: true,
        data: values,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get product attribute values",
      };
    }
  }

  static async deleteProductAttributeValue(id: string): Promise<ProductAttributeValueResponse> {
    try {
      const success = await ProductAttributeValuesModel.deleteProductAttributeValue(id);
      if (!success) {
        return {
          success: false,
          error: "Product attribute value not found",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete product attribute value",
      };
    }
  }

  static async deleteProductAttributeValueByAttribute(
    productAttributeId: string,
    attributeValueId: string
  ): Promise<ProductAttributeValueResponse> {
    try {
      const success = await ProductAttributeValuesModel.deleteProductAttributeValueByAttribute(
        productAttributeId,
        attributeValueId
      );
      if (!success) {
        return {
          success: false,
          error: "Product attribute value not found",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete product attribute value",
      };
    }
  }

  static async deleteAllProductAttributeValues(
    productAttributeId: string
  ): Promise<ProductAttributeValueResponse> {
    try {
      const success = await ProductAttributeValuesModel.deleteAllProductAttributeValues(
        productAttributeId
      );
      if (!success) {
        return {
          success: false,
          error: "No product attribute values found to delete",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete product attribute values",
      };
    }
  }
}
