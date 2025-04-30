import { CategoriesModel } from "./categories.model";
import type { NewCategory, Category, CategoryResponse, CategoriesResponse } from "./categories.types";
import { slugify } from "@/lib/utils";

export class CategoriesService {
  static async createCategory(data: NewCategory): Promise<CategoryResponse> {
    // Generate slug from name if not provided
    if (!data.slug) {
      data.slug = slugify(data.name);
    }

    // Check if slug already exists
    const existingCategory = await CategoriesModel.getCategoryBySlug(data.slug);
    if (existingCategory) {
      return { success: false, error: "A category with this slug already exists" };
    }

    const category = await CategoriesModel.createCategory(data);
    return { success: true, data: category };
  }

  static async getCategoryById(categoryId: string): Promise<CategoryResponse> {
    try {
      const category = await CategoriesModel.getCategoryById(categoryId);

      if (!category) {
        return { success: false, error: "Category not found" };
      }

      return { success: true, data: category };
    } catch (error) {
      console.error("Error fetching category:", error);
      return { success: false, error: "Failed to fetch category" };
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

  static async updateCategory(
    categoryId: string,
    data: Partial<NewCategory>
  ): Promise<CategoryResponse> {
    // If name is being updated, update slug as well
    if (data.name && !data.slug) {
      data.slug = slugify(data.name);
    }

    // Check if new slug already exists
    if (data.slug) {
      const existingCategory = await CategoriesModel.getCategoryBySlug(data.slug);
      if (existingCategory && existingCategory.categoryId !== categoryId) {
        return { success: false, error: "A category with this slug already exists" };
      }
    }

    const category = await CategoriesModel.updateCategory(categoryId, data);

    if (!category) {
      return { success: false, error: "Category not found" };
    }

    return { success: true, data: category };
  }

  static async deleteCategory(categoryId: string): Promise<CategoryResponse> {
    try {
      const success = await CategoriesModel.deleteCategory(categoryId);

      if (!success) {
        return { success: false, error: "Category not found" };
      }

      return { success: true, message: "Category deleted successfully" };
    } catch (error) {
      console.error("Error deleting category:", error);
      return { success: false, error: "Failed to delete category" };
    }
  }

  static async listCategories(activeOnly: boolean = false): Promise<CategoriesResponse> {
    try {
      const categories = activeOnly
        ? await CategoriesModel.listActiveCategories()
        : await CategoriesModel.listCategories();
      return { success: true, data: categories };
    } catch (error) {
      console.error("Error listing categories:", error);
      return { success: false, error: "Failed to list categories" };
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
