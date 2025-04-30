import { BrandCategoriesModel } from "./brand-categories.model";
import type { BrandCategory, NewBrandCategory } from "./brand-categories.types";

export class BrandCategoriesService {
  static async createBrandCategory(data: NewBrandCategory): Promise<BrandCategory> {
    // Check if brand category already exists for this brand and category
    const existing = await BrandCategoriesModel.getBrandCategoryByBrandAndCategory(
      data.brandId,
      data.categoryId
    );
    if (existing) {
      throw new Error("Brand category already exists for this brand and category");
    }

    return await BrandCategoriesModel.createBrandCategory(data);
  }

  static async getBrandCategoryByBrandAndCategory(
    brandId: string,
    categoryId: string
  ): Promise<BrandCategory> {
    const brandCategory = await BrandCategoriesModel.getBrandCategoryByBrandAndCategory(
      brandId,
      categoryId
    );
    if (!brandCategory) {
      throw new Error("Brand category not found");
    }
    return brandCategory;
  }

  static async updateBrandCategory(
    brandId: string,
    categoryId: string,
    data: Partial<NewBrandCategory>
  ): Promise<BrandCategory> {
    // Check if brand category already exists for this brand and category
    if (data.brandId && data.categoryId) {
      const existing = await BrandCategoriesModel.getBrandCategoryByBrandAndCategory(
        data.brandId,
        data.categoryId
      );
      if (existing && (existing.brandId !== brandId || existing.categoryId !== categoryId)) {
        throw new Error("Brand category already exists for this brand and category");
      }
    }

    const brandCategory = await BrandCategoriesModel.updateBrandCategory(brandId, categoryId, data);
    if (!brandCategory) {
      throw new Error("Brand category not found");
    }
    return brandCategory;
  }

  static async deleteBrandCategory(brandId: string, categoryId: string): Promise<void> {
    const success = await BrandCategoriesModel.deleteBrandCategory(brandId, categoryId);
    if (!success) {
      throw new Error("Brand category not found");
    }
  }

  static async listBrandCategories(): Promise<BrandCategory[]> {
    return await BrandCategoriesModel.listBrandCategories();
  }

  static async getBrandCategoriesByBrand(brandId: string): Promise<BrandCategory[]> {
    return await BrandCategoriesModel.getBrandCategoriesByBrand(brandId);
  }

  static async getBrandCategoriesByCategory(categoryId: string): Promise<BrandCategory[]> {
    return await BrandCategoriesModel.getBrandCategoriesByCategory(categoryId);
  }
} 