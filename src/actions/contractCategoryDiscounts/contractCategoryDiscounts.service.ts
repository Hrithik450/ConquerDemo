import { ContractCategoryDiscountsModel } from "./contractCategoryDiscounts.model";
import { contractCategoryDiscountSchema } from "./contractCategoryDiscounts.types";
import type { ContractCategoryDiscount, ContractCategoryDiscountResponse, ContractCategoryDiscountsResponse } from "./contractCategoryDiscounts.types";

export class ContractCategoryDiscountsService {
  static async createContractCategoryDiscount(data: Partial<ContractCategoryDiscount>): Promise<ContractCategoryDiscountResponse> {
    try {
      // Convert discountValue to string if it's a number
      const processedData = {
        ...data,
        discountValue: data.discountValue?.toString(),
      };
      
      // Validate input data
      const validatedData = contractCategoryDiscountSchema.parse(processedData);
      
      // Check if discount already exists
      const existingDiscount = await ContractCategoryDiscountsModel.getContractCategoryDiscount(
        validatedData.contractId,
        validatedData.categoryId
      );
      if (existingDiscount) {
        return {
          success: false,
          error: "Contract category discount already exists",
        };
      }

      // Create new discount
      const discount = await ContractCategoryDiscountsModel.createContractCategoryDiscount(validatedData);
      return {
        success: true,
        data: discount,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create contract category discount",
      };
    }
  }

  static async getContractCategoryDiscount(contractId: string, categoryId: string): Promise<ContractCategoryDiscountResponse> {
    try {
      const discount = await ContractCategoryDiscountsModel.getContractCategoryDiscount(contractId, categoryId);
      if (!discount) {
        return {
          success: false,
          error: "Contract category discount not found",
        };
      }
      return {
        success: true,
        data: discount,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get contract category discount",
      };
    }
  }

  static async getDiscountsByContractId(contractId: string): Promise<ContractCategoryDiscountsResponse> {
    try {
      const discounts = await ContractCategoryDiscountsModel.getDiscountsByContractId(contractId);
      return {
        success: true,
        data: discounts,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get discounts for contract",
      };
    }
  }

  static async getDiscountsByCategoryId(categoryId: string): Promise<ContractCategoryDiscountsResponse> {
    try {
      const discounts = await ContractCategoryDiscountsModel.getDiscountsByCategoryId(categoryId);
      return {
        success: true,
        data: discounts,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get discounts for category",
      };
    }
  }

  static async updateContractCategoryDiscount(
    contractId: string,
    categoryId: string,
    data: Partial<ContractCategoryDiscount>
  ): Promise<ContractCategoryDiscountResponse> {
    try {
      // Convert discountValue to string if it's a number
      const processedData = {
        ...data,
        discountValue: data.discountValue?.toString(),
      };
      
      // Validate input data
      const validatedData = contractCategoryDiscountSchema.partial().parse(processedData);
      
      const discount = await ContractCategoryDiscountsModel.updateContractCategoryDiscount(
        contractId,
        categoryId,
        validatedData
      );
      if (!discount) {
        return {
          success: false,
          error: "Contract category discount not found",
        };
      }
      return {
        success: true,
        data: discount,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update contract category discount",
      };
    }
  }

  static async deleteContractCategoryDiscount(contractId: string, categoryId: string): Promise<ContractCategoryDiscountResponse> {
    try {
      const success = await ContractCategoryDiscountsModel.deleteContractCategoryDiscount(contractId, categoryId);
      if (!success) {
        return {
          success: false,
          error: "Contract category discount not found",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete contract category discount",
      };
    }
  }

  static async listContractCategoryDiscounts(): Promise<ContractCategoryDiscountsResponse> {
    try {
      const discounts = await ContractCategoryDiscountsModel.listContractCategoryDiscounts();
      return {
        success: true,
        data: discounts,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to list contract category discounts",
      };
    }
  }
}
