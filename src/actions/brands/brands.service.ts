import { BrandsModel } from "./brands.model";
import type { NewBrand, Brand, BrandResponse, BrandsResponse } from "./brands.types";
import { slugify } from "@/lib/utils";

export class BrandsService {
  static async createBrand(data: NewBrand): Promise<BrandResponse> {
    // Generate slug from name if not provided
    if (!data.slug) {
      data.slug = slugify(data.name);
    }

    // Check if slug already exists
    const existingBrand = await BrandsModel.getBrandBySlug(data.slug);
    if (existingBrand) {
      return { success: false, error: "A brand with this slug already exists" };
    }

    const brand = await BrandsModel.createBrand(data);
    return { success: true, data: brand };
  }

  static async getBrandById(brandId: string): Promise<BrandResponse> {
    try {
      const brand = await BrandsModel.getBrandById(brandId);

      if (!brand) {
        return { success: false, error: "Brand not found" };
      }

      return { success: true, data: brand };
    } catch (error) {
      console.error("Error fetching brand:", error);
      return { success: false, error: "Failed to fetch brand" };
    }
  }

  static async getBrandBySlug(slug: string): Promise<BrandResponse> {
    try {
      const brand = await BrandsModel.getBrandBySlug(slug);

      if (!brand) {
        return { success: false, error: "Brand not found" };
      }

      return { success: true, data: brand };
    } catch (error) {
      console.error("Error fetching brand:", error);
      return { success: false, error: "Failed to fetch brand" };
    }
  }

  static async updateBrand(
    brandId: string,
    data: Partial<NewBrand>
  ): Promise<BrandResponse> {
    // If name is being updated, update slug as well
    if (data.name && !data.slug) {
      data.slug = slugify(data.name);
    }

    // Check if new slug already exists
    if (data.slug) {
      const existingBrand = await BrandsModel.getBrandBySlug(data.slug);
      if (existingBrand && existingBrand.brandId !== brandId) {
        return { success: false, error: "A brand with this slug already exists" };
      }
    }

    const brand = await BrandsModel.updateBrand(brandId, data);

    if (!brand) {
      return { success: false, error: "Brand not found" };
    }

    return { success: true, data: brand };
  }

  static async deleteBrand(brandId: string): Promise<BrandResponse> {
    try {
      const success = await BrandsModel.deleteBrand(brandId);

      if (!success) {
        return { success: false, error: "Brand not found" };
      }

      return { success: true, message: "Brand deleted successfully" };
    } catch (error) {
      console.error("Error deleting brand:", error);
      return { success: false, error: "Failed to delete brand" };
    }
  }

  static async listBrands(): Promise<BrandsResponse> {
    try {
      const brands = await BrandsModel.listBrands();
      return { success: true, data: brands };
    } catch (error) {
      console.error("Error listing brands:", error);
      return { success: false, error: "Failed to list brands" };
    }
  }

  static async searchBrands(searchTerm: string): Promise<BrandsResponse> {
    try {
      const brands = await BrandsModel.searchBrands(searchTerm);
      return { success: true, data: brands };
    } catch (error) {
      console.error("Error searching brands:", error);
      return { success: false, error: "Failed to search brands" };
    }
  }
}
