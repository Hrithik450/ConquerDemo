import { CategoriesModel } from "./categories.model";
import { categorySchema } from "./categories.types";
import type { Category, CategoryResponse, CategoriesResponse } from "./categories.types";

export class CategoriesService {
  static async createCategory(data: Partial<Category>): Promise<CategoryResponse> {
    try {
      // Validate input data
      const validatedData = categorySchema.parse(data);
      
      // Check if category already exists
      const existingCategory = await CategoriesModel.getCategoryBySlug(validatedData.slug);
      if (existingCategory) {
        return {
          success: false,
          error: "Category with this slug already exists",
        };
      }

      // Create new category
      const category = await CategoriesModel.createCategory(validatedData);
      return {
        success: true,
        data: category,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create category",
      };
    }
  }

  static async getCategoryById(id: string): Promise<CategoryResponse> {
    try {
      const category = await CategoriesModel.getCategoryById(id);
      if (!category) {
        return {
          success: false,
          error: "Category not found",
        };
      }
      return {
        success: true,
        data: category,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get category",
      };
    }
  }

  static async getCategoryBySlug(slug: string): Promise<CategoryResponse> {
    try {
      const category = await CategoriesModel.getCategoryBySlug(slug);

      if (!category) {
        return { success: false, error: "Category not found" };
      }

      return { success: true, data: category };
    } catch (error) {
      console.error("Error fetching category:", error);
      return { success: false, error: "Failed to fetch category" };
    }
  }

  static async updateCategory(id: string, data: Partial<Category>): Promise<CategoryResponse> {
    try {
      // Validate input data
      const validatedData = categorySchema.partial().parse(data);
      
      const category = await CategoriesModel.updateCategory(id, validatedData);
      if (!category) {
        return {
          success: false,
          error: "Category not found",
        };
      }
      return {
        success: true,
        data: category,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update category",
      };
    }
  }

  static async deleteCategory(id: string): Promise<CategoryResponse> {
    try {
      const success = await CategoriesModel.deleteCategory(id);
      if (!success) {
        return {
          success: false,
          error: "Category not found",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete category",
      };
    }
  }

  static async listCategories(): Promise<CategoriesResponse> {
    try {
      const categories = await CategoriesModel.listCategories();
      return {
        success: true,
        data: categories,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to list categories",
      };
    }
  }

  static async searchCategories(
    searchTerm: string,
    activeOnly: boolean = false
  ): Promise<CategoriesResponse> {
    try {
      const categories = activeOnly
        ? await CategoriesModel.searchActiveCategories(searchTerm)
        : await CategoriesModel.searchCategories(searchTerm);
      return { success: true, data: categories };
    } catch (error) {
      console.error("Error searching categories:", error);
      return { success: false, error: "Failed to search categories" };
    }
  }
}
