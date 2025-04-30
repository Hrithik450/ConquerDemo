import { ProductVariantsModel } from "./productVariants.model";
import { productVariantSchema } from "./productVariants.types";
import type { ProductVariant, ProductVariantResponse, ProductVariantsResponse } from "./productVariants.types";

export class ProductVariantsService {
  static async createProductVariant(data: Partial<ProductVariant>): Promise<ProductVariantResponse> {
    try {
      // Validate input data
      const validatedData = productVariantSchema.parse(data);
      
      // Check if SKU already exists
      if (validatedData.sku) {
        const existingVariant = await ProductVariantsModel.getProductVariantBySku(validatedData.sku);
        if (existingVariant) {
          return {
            success: false,
            error: "Product variant with this SKU already exists",
          };
        }
      }

      // If this is set as default, unset any other default variant for this product
      if (validatedData.isDefault) {
        const defaultVariant = await ProductVariantsModel.getDefaultVariantByProductId(validatedData.productId);
        if (defaultVariant) {
          await ProductVariantsModel.updateProductVariant(defaultVariant.productVariantId, { isDefault: false });
        }
      }

      // Create new variant
      const variant = await ProductVariantsModel.createProductVariant(validatedData);
      return {
        success: true,
        data: variant,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create product variant",
      };
    }
  }

  static async getProductVariantById(id: string): Promise<ProductVariantResponse> {
    try {
      const variant = await ProductVariantsModel.getProductVariantById(id);
      if (!variant) {
        return {
          success: false,
          error: "Product variant not found",
        };
      }
      return {
        success: true,
        data: variant,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get product variant",
      };
    }
  }

  static async getProductVariantBySku(sku: string): Promise<ProductVariantResponse> {
    try {
      const variant = await ProductVariantsModel.getProductVariantBySku(sku);
      if (!variant) {
        return {
          success: false,
          error: "Product variant not found",
        };
      }
      return {
        success: true,
        data: variant,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get product variant",
      };
    }
  }

  static async getProductVariantsByProductId(productId: string): Promise<ProductVariantsResponse> {
    try {
      const variants = await ProductVariantsModel.getProductVariantsByProductId(productId);
      return {
        success: true,
        data: variants,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get product variants",
      };
    }
  }

  static async updateProductVariant(
    id: string,
    data: Partial<ProductVariant>
  ): Promise<ProductVariantResponse> {
    try {
      // Validate input data
      const validatedData = productVariantSchema.partial().parse(data);
      
      // If updating SKU, check if it already exists
      if (validatedData.sku) {
        const existingVariant = await ProductVariantsModel.getProductVariantBySku(validatedData.sku);
        if (existingVariant && existingVariant.productVariantId !== id) {
          return {
            success: false,
            error: "Product variant with this SKU already exists",
          };
        }
      }

      // If setting as default, unset any other default variant for this product
      if (validatedData.isDefault) {
        const variant = await ProductVariantsModel.getProductVariantById(id);
        if (variant) {
          const defaultVariant = await ProductVariantsModel.getDefaultVariantByProductId(variant.productId);
          if (defaultVariant && defaultVariant.productVariantId !== id) {
            await ProductVariantsModel.updateProductVariant(defaultVariant.productVariantId, { isDefault: false });
          }
        }
      }

      const variant = await ProductVariantsModel.updateProductVariant(id, validatedData);
      if (!variant) {
        return {
          success: false,
          error: "Product variant not found",
        };
      }
      return {
        success: true,
        data: variant,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update product variant",
      };
    }
  }

  static async deleteProductVariant(id: string): Promise<ProductVariantResponse> {
    try {
      const success = await ProductVariantsModel.deleteProductVariant(id);
      if (!success) {
        return {
          success: false,
          error: "Product variant not found",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete product variant",
      };
    }
  }

  static async searchProductVariants(searchTerm: string): Promise<ProductVariantsResponse> {
    try {
      const variants = await ProductVariantsModel.searchProductVariants(searchTerm);
      return {
        success: true,
        data: variants,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to search product variants",
      };
    }
  }

  static async updateStockQuantity(
    id: string,
    quantity: number
  ): Promise<ProductVariantResponse> {
    try {
      if (quantity < 0) {
        return {
          success: false,
          error: "Stock quantity cannot be negative",
        };
      }

      const variant = await ProductVariantsModel.updateStockQuantity(id, quantity);
      if (!variant) {
        return {
          success: false,
          error: "Product variant not found",
        };
      }
      return {
        success: true,
        data: variant,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update stock quantity",
      };
    }
  }
}
