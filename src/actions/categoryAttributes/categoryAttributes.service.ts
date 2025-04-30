import { CategoryAttributesModel } from "./categoryAttributes.model";
import { categoryAttributeSchema } from "./categoryAttributes.types";
import type { CategoryAttribute, CategoryAttributeResponse, CategoryAttributesResponse } from "./categoryAttributes.types";

export class CategoryAttributesService {
  static async createCategoryAttribute(data: Partial<CategoryAttribute>): Promise<CategoryAttributeResponse> {
    try {
      // Validate input data
      const validatedData = categoryAttributeSchema.parse(data);
      
      // Check if category attribute already exists
      const existingCategoryAttribute = await CategoryAttributesModel.getCategoryAttribute(
        validatedData.categoryId,
        validatedData.attributeId
      );
      if (existingCategoryAttribute) {
        return {
          success: false,
          error: "Category attribute already exists",
        };
      }

      // Create new category attribute
      const categoryAttribute = await CategoryAttributesModel.createCategoryAttribute(validatedData);
      return {
        success: true,
        data: categoryAttribute,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create category attribute",
      };
    }
  }

  static async getCategoryAttribute(categoryId: string, attributeId: string): Promise<CategoryAttributeResponse> {
    try {
      const categoryAttribute = await CategoryAttributesModel.getCategoryAttribute(categoryId, attributeId);
      if (!categoryAttribute) {
        return {
          success: false,
          error: "Category attribute not found",
        };
      }
      return {
        success: true,
        data: categoryAttribute,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get category attribute",
      };
    }
  }

  static async getAttributesByCategoryId(categoryId: string): Promise<CategoryAttributesResponse> {
    try {
      const categoryAttributes = await CategoryAttributesModel.getAttributesByCategoryId(categoryId);
      return {
        success: true,
        data: categoryAttributes,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get attributes for category",
      };
    }
  }

  static async getCategoriesByAttributeId(attributeId: string): Promise<CategoryAttributesResponse> {
    try {
      const categoryAttributes = await CategoryAttributesModel.getCategoriesByAttributeId(attributeId);
      return {
        success: true,
        data: categoryAttributes,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get categories for attribute",
      };
    }
  }

  static async deleteCategoryAttribute(categoryId: string, attributeId: string): Promise<CategoryAttributeResponse> {
    try {
      const success = await CategoryAttributesModel.deleteCategoryAttribute(categoryId, attributeId);
      if (!success) {
        return {
          success: false,
          error: "Category attribute not found",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete category attribute",
      };
    }
  }

  static async listCategoryAttributes(): Promise<CategoryAttributesResponse> {
    try {
      const categoryAttributes = await CategoryAttributesModel.listCategoryAttributes();
      return {
        success: true,
        data: categoryAttributes,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to list category attributes",
      };
    }
  }
}
