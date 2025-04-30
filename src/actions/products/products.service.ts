import { ProductsModel } from "./products.model";
import { productSchema } from "./products.types";
import type { Product, ProductResponse, ProductsResponse } from "./products.types";

export class ProductsService {
  static async createProduct(data: Partial<Product>): Promise<ProductResponse> {
    try {
      // Validate input data
      const validatedData = productSchema.parse(data);
      
      // Check if product already exists
      const existingProduct = await ProductsModel.getProductBySlug(validatedData.slug);
      if (existingProduct) {
        return {
          success: false,
          error: "Product with this slug already exists",
        };
      }

      // Create new product
      const product = await ProductsModel.createProduct(validatedData);
      return {
        success: true,
        data: product,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create product",
      };
    }
  }

  static async getProductById(id: string): Promise<ProductResponse> {
    try {
      const product = await ProductsModel.getProductById(id);
      if (!product) {
        return {
          success: false,
          error: "Product not found",
        };
      }
      return {
        success: true,
        data: product,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get product",
      };
    }
  }

  static async getProductsByBrandId(brandId: string): Promise<ProductsResponse> {
    try {
      const products = await ProductsModel.getProductsByBrandId(brandId);
      return {
        success: true,
        data: products,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get products for brand",
      };
    }
  }

  static async getProductsByCategoryId(categoryId: string): Promise<ProductsResponse> {
    try {
      const products = await ProductsModel.getProductsByCategoryId(categoryId);
      return {
        success: true,
        data: products,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get products for category",
      };
    }
  }

  static async updateProduct(id: string, data: Partial<Product>): Promise<ProductResponse> {
    try {
      // Validate input data
      const validatedData = productSchema.partial().parse(data);
      
      const product = await ProductsModel.updateProduct(id, validatedData);
      if (!product) {
        return {
          success: false,
          error: "Product not found",
        };
      }
      return {
        success: true,
        data: product,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update product",
      };
    }
  }

  static async deleteProduct(id: string): Promise<ProductResponse> {
    try {
      const success = await ProductsModel.deleteProduct(id);
      if (!success) {
        return {
          success: false,
          error: "Product not found",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete product",
      };
    }
  }

  static async listProducts(): Promise<ProductsResponse> {
    try {
      const products = await ProductsModel.listProducts();
      return {
        success: true,
        data: products,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to list products",
      };
    }
  }

  static async getProductBySlug(slug: string): Promise<Product> {
    const product = await ProductsModel.getProductBySlug(slug);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  static async searchProducts(
    searchTerm: string,
    activeOnly: boolean = false
  ): Promise<Product[]> {
    return activeOnly
      ? await ProductsModel.searchActiveProducts(searchTerm)
      : await ProductsModel.searchProducts(searchTerm);
  }

  static async getProductsByBrand(
    brandId: string,
    activeOnly: boolean = false
  ): Promise<Product[]> {
    const products = await ProductsModel.getProductsByBrand(brandId);
    return activeOnly
      ? products.filter((product) => product.isActive)
      : products;
  }

  static async getProductsByCategory(
    categoryId: string,
    activeOnly: boolean = false
  ): Promise<Product[]> {
    const products = await ProductsModel.getProductsByCategory(categoryId);
    return activeOnly
      ? products.filter((product) => product.isActive)
      : products;
  }
}
