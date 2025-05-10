import { ProductVariantsModel } from "./productVariants.model";
import { productVariantSchema } from "./productVariants.types";
import type {
  ProductVariant,
  ProductVariantResponse,
  ProductVariantsResponse,
} from "./productVariants.types";

export class ProductVariantsService {
  static async createProductVariant(
    data: Partial<ProductVariant>
  ): Promise<ProductVariantResponse> {
    try {
      // Validate input data
      const validatedData = productVariantSchema.parse(data);

      // Create new product variant
      const productVariant = await ProductVariantsModel.createProductVariant(
        validatedData
      );
      return {
        success: true,
        data: productVariant,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create product variant",
      };
    }
  }

  static async getProductVariantById(
    id: string
  ): Promise<ProductVariantResponse> {
    try {
      const productVariant = await ProductVariantsModel.getProductVariantById(
        id
      );
      if (!productVariant) {
        return {
          success: false,
          error: "Product variant not found",
        };
      }
      return {
        success: true,
        data: productVariant,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get product variant",
      };
    }
  }

  static async getProductVariantsByProduct(
    productId: string
  ): Promise<ProductVariantsResponse> {
    try {
      const productVariants =
        await ProductVariantsModel.getProductVariantsByProduct(productId);
      return {
        success: true,
        data: productVariants,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get product variants",
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

      const productVariant = await ProductVariantsModel.updateProductVariant(
        id,
        validatedData
      );
      if (!productVariant) {
        return {
          success: false,
          error: "Product variant not found",
        };
      }
      return {
        success: true,
        data: productVariant,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update product variant",
      };
    }
  }

  static async deleteProductVariant(
    id: string
  ): Promise<ProductVariantResponse> {
    try {
      const productVariant = await ProductVariantsModel.deleteProductVariant(
        id
      );
      if (!productVariant) {
        return {
          success: false,
          error: "Product variant not found",
        };
      }
      return {
        success: true,
        data: productVariant,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete product variant",
      };
    }
  }

  static async listProductVariants(): Promise<ProductVariantsResponse> {
    try {
      const productVariants = await ProductVariantsModel.listProductVariants();
      return {
        success: true,
        data: productVariants,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to list product variants",
      };
    }
  }

  static async searchProductVariants(
    searchTerm: string
  ): Promise<ProductVariantsResponse> {
    try {
      const productVariants = await ProductVariantsModel.searchProductVariants(
        searchTerm
      );
      return {
        success: true,
        data: productVariants,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to search product variants",
      };
    }
  }

  static async updateStockQuantity(
    id: string,
    quantity: number
  ): Promise<ProductVariantResponse> {
    try {
      const productVariant = await ProductVariantsModel.updateStockQuantity(
        id,
        quantity
      );
      if (!productVariant) {
        return {
          success: false,
          error: "Product variant not found",
        };
      }
      return {
        success: true,
        data: productVariant,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update stock quantity",
      };
    }
  }
}
