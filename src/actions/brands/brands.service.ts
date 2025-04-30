import { BrandsModel } from "./brands.model";
import { brandSchema } from "./brands.types";
import type { Brand, BrandResponse, BrandsResponse } from "./brands.types";

export class BrandsService {
  static async createBrand(data: Partial<Brand>): Promise<BrandResponse> {
    try {
      // Validate input data
      const validatedData = brandSchema.parse(data);
      
      // Check if brand already exists
      const existingBrand = await BrandsModel.getBrandBySlug(validatedData.slug);
      if (existingBrand) {
        return {
          success: false,
          error: "Brand with this slug already exists",
        };
      }

      // Create new brand
      const brand = await BrandsModel.createBrand(validatedData);
      return {
        success: true,
        data: brand,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create brand",
      };
    }
  }

  static async getBrandById(id: string): Promise<BrandResponse> {
    try {
      const brand = await BrandsModel.getBrandById(id);
      if (!brand) {
        return {
          success: false,
          error: "Brand not found",
        };
      }
      return {
        success: true,
        data: brand,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get brand",
      };
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

  static async updateBrand(id: string, data: Partial<Brand>): Promise<BrandResponse> {
    try {
      // Validate input data
      const validatedData = brandSchema.partial().parse(data);
      
      const brand = await BrandsModel.updateBrand(id, validatedData);
      if (!brand) {
        return {
          success: false,
          error: "Brand not found",
        };
      }
      return {
        success: true,
        data: brand,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update brand",
      };
    }
  }

  static async deleteBrand(id: string): Promise<BrandResponse> {
    try {
      const success = await BrandsModel.deleteBrand(id);
      if (!success) {
        return {
          success: false,
          error: "Brand not found",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete brand",
      };
    }
  }

  static async listBrands(): Promise<BrandsResponse> {
    try {
      const brands = await BrandsModel.listBrands();
      return {
        success: true,
        data: brands,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to list brands",
      };
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
