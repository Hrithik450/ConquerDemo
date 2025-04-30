import { BrandCategoriesModel } from "./brandCategories.model";
import { brandCategorySchema } from "./brandCategories.types";
import type { BrandCategory, BrandCategoryResponse, BrandCategoriesResponse } from "./brandCategories.types";

export class BrandCategoriesService {
  static async createBrandCategory(data: Partial<BrandCategory>): Promise<BrandCategoryResponse> {
    try {
      // Validate input data
      const validatedData = brandCategorySchema.parse(data);
      
      // Check if brand category already exists
      const existingBrandCategory = await BrandCategoriesModel.getBrandCategory(
        validatedData.brandId,
        validatedData.categoryId
      );
      if (existingBrandCategory) {
        return {
          success: false,
          error: "Brand category already exists",
        };
      }

      // Create new brand category
      const brandCategory = await BrandCategoriesModel.createBrandCategory(validatedData);
      return {
        success: true,
        data: brandCategory,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create brand category",
      };
    }
  }

  static async getBrandCategory(brandId: string, categoryId: string): Promise<BrandCategoryResponse> {
    try {
      const brandCategory = await BrandCategoriesModel.getBrandCategory(brandId, categoryId);
      if (!brandCategory) {
        return {
          success: false,
          error: "Brand category not found",
        };
      }
      return {
        success: true,
        data: brandCategory,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get brand category",
      };
    }
  }

  static async getCategoriesByBrandId(brandId: string): Promise<BrandCategoriesResponse> {
    try {
      const brandCategories = await BrandCategoriesModel.getCategoriesByBrandId(brandId);
      return {
        success: true,
        data: brandCategories,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get categories for brand",
      };
    }
  }

  static async getBrandsByCategoryId(categoryId: string): Promise<BrandCategoriesResponse> {
    try {
      const brandCategories = await BrandCategoriesModel.getBrandsByCategoryId(categoryId);
      return {
        success: true,
        data: brandCategories,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get brands for category",
      };
    }
  }

  static async updateBrandCategory(
    brandId: string,
    categoryId: string,
    data: Partial<BrandCategory>
  ): Promise<BrandCategoryResponse> {
    try {
      // Validate input data
      const validatedData = brandCategorySchema.partial().parse(data);
      
      const brandCategory = await BrandCategoriesModel.updateBrandCategory(
        brandId,
        categoryId,
        validatedData
      );
      if (!brandCategory) {
        return {
          success: false,
          error: "Brand category not found",
        };
      }
      return {
        success: true,
        data: brandCategory,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update brand category",
      };
    }
  }

  static async deleteBrandCategory(brandId: string, categoryId: string): Promise<BrandCategoryResponse> {
    try {
      const success = await BrandCategoriesModel.deleteBrandCategory(brandId, categoryId);
      if (!success) {
        return {
          success: false,
          error: "Brand category not found",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete brand category",
      };
    }
  }

  static async listBrandCategories(): Promise<BrandCategoriesResponse> {
    try {
      const brandCategories = await BrandCategoriesModel.listBrandCategories();
      return {
        success: true,
        data: brandCategories,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to list brand categories",
      };
    }
  }
}
