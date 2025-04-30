import { BrandCategoriesModel } from "./brand-categories.model";
import type { NewBrandCategory, BrandCategory } from "./brand-categories.types";

export class BrandCategoriesService {
  static async createBrandCategory(data: NewBrandCategory): Promise<BrandCategory> {
    return await BrandCategoriesModel.createBrandCategory(data);
  }

  static async getBrandCategoryByBrandAndCategory(
    brandId: string,
    categoryId: string
  ): Promise<BrandCategory | null> {
    return await BrandCategoriesModel.getBrandCategoryByBrandAndCategory(
      brandId,
      categoryId
    );
  }

  static async updateBrandCategory(
    brandId: string,
    categoryId: string,
    data: Partial<NewBrandCategory>
  ): Promise<BrandCategory | null> {
    return await BrandCategoriesModel.updateBrandCategory(brandId, categoryId, data);
  }

  static async deleteBrandCategory(brandId: string, categoryId: string): Promise<boolean> {
    return await BrandCategoriesModel.deleteBrandCategory(brandId, categoryId);
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