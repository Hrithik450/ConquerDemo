import { AttributesModel } from "./attributes.model";
import { attributeSchema } from "./attributes.types";
import type { Attribute, AttributeResponse, AttributesResponse } from "./attributes.types";

export class AttributesService {
  static async createAttribute(data: Partial<Attribute>): Promise<AttributeResponse> {
    try {
      // Validate input data
      const validatedData = attributeSchema.parse(data);
      
      // Check if attribute already exists
      const existingAttribute = await AttributesModel.getAttributeBySlug(validatedData.slug);
      if (existingAttribute) {
        return {
          success: false,
          error: "Attribute with this slug already exists",
        };
      }

      // Create new attribute
      const attribute = await AttributesModel.createAttribute(validatedData);
      return {
        success: true,
        data: attribute,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create attribute",
      };
    }
  }

  static async getAttributeById(id: string): Promise<AttributeResponse> {
    try {
      const attribute = await AttributesModel.getAttributeById(id);
      if (!attribute) {
        return {
          success: false,
          error: "Attribute not found",
        };
      }
      return {
        success: true,
        data: attribute,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get attribute",
      };
    }
  }

  static async updateAttribute(id: string, data: Partial<Attribute>): Promise<AttributeResponse> {
    try {
      // Validate input data
      const validatedData = attributeSchema.partial().parse(data);
      
      const attribute = await AttributesModel.updateAttribute(id, validatedData);
      if (!attribute) {
        return {
          success: false,
          error: "Attribute not found",
        };
      }
      return {
        success: true,
        data: attribute,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update attribute",
      };
    }
  }

  static async deleteAttribute(id: string): Promise<AttributeResponse> {
    try {
      const success = await AttributesModel.deleteAttribute(id);
      if (!success) {
        return {
          success: false,
          error: "Attribute not found",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete attribute",
      };
    }
  }

  static async listAttributes(): Promise<AttributesResponse> {
    try {
      const attributes = await AttributesModel.listAttributes();
      return {
        success: true,
        data: attributes,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to list attributes",
      };
    }
  }
}
