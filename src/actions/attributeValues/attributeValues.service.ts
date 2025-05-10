import { AttributeValuesModel } from "./attributeValues.model";
import { attributeValueSchema } from "./attributeValues.types";
import type {
  AttributeValue,
  AttributeValueResponse,
  AttributeValuesResponse,
} from "./attributeValues.types";

export class AttributeValuesService {
  static async createAttributeValue(
    data: Partial<AttributeValue>
  ): Promise<AttributeValueResponse> {
    try {
      // Validate input data
      const validatedData = attributeValueSchema.parse(data);

      // Create new attribute value
      const attributeValue = await AttributeValuesModel.createAttributeValue(
        validatedData
      );
      return {
        success: true,
        data: attributeValue,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create attribute value",
      };
    }
  }

  static async getAttributeValueById(
    id: string
  ): Promise<AttributeValueResponse> {
    try {
      const attributeValue = await AttributeValuesModel.getAttributeValueById(
        id
      );
      if (!attributeValue) {
        return {
          success: false,
          error: "Attribute value not found",
        };
      }
      return {
        success: true,
        data: attributeValue,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get attribute value",
      };
    }
  }

  static async getAttributeValuesByAttributeId(
    attributeId: string
  ): Promise<AttributeValuesResponse> {
    try {
      const attributeValues =
        await AttributeValuesModel.getAttributeValuesByAttributeId(attributeId);
      return {
        success: true,
        data: attributeValues,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get attribute values",
      };
    }
  }

  static async updateAttributeValue(
    id: string,
    data: Partial<AttributeValue>
  ): Promise<AttributeValueResponse> {
    try {
      // Validate input data
      const validatedData = attributeValueSchema.partial().parse(data);

      const attributeValue = await AttributeValuesModel.updateAttributeValue(
        id,
        validatedData
      );
      if (!attributeValue) {
        return {
          success: false,
          error: "Attribute value not found",
        };
      }
      return {
        success: true,
        data: attributeValue,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update attribute value",
      };
    }
  }

  static async deleteAttributeValue(
    id: string
  ): Promise<AttributeValueResponse> {
    try {
      const success = await AttributeValuesModel.deleteAttributeValue(id);
      if (!success) {
        return {
          success: false,
          error: "Attribute value not found",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete attribute value",
      };
    }
  }

  static async listAttributeValues(): Promise<AttributeValuesResponse> {
    try {
      const attributeValues = await AttributeValuesModel.listAttributeValues();
      return {
        success: true,
        data: attributeValues,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to list attribute values",
      };
    }
  }
}
