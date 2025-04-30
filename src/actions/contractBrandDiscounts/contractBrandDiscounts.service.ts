import { ContractBrandDiscountsModel } from "./contractBrandDiscounts.model";
import { contractBrandDiscountSchema } from "./contractBrandDiscounts.types";
import type { ContractBrandDiscount, ContractBrandDiscountResponse, ContractBrandDiscountsResponse } from "./contractBrandDiscounts.types";

export class ContractBrandDiscountsService {
  static async createContractBrandDiscount(data: Partial<ContractBrandDiscount>): Promise<ContractBrandDiscountResponse> {
    try {
      // Convert discountValue to string if it's a number
      const processedData = {
        ...data,
        discountValue: data.discountValue?.toString(),
      };
      
      // Validate input data
      const validatedData = contractBrandDiscountSchema.parse(processedData);
      
      // Check if discount already exists
      const existingDiscount = await ContractBrandDiscountsModel.getContractBrandDiscount(
        validatedData.contractId,
        validatedData.brandId
      );
      if (existingDiscount) {
        return {
          success: false,
          error: "Contract brand discount already exists",
        };
      }

      // Create new discount
      const discount = await ContractBrandDiscountsModel.createContractBrandDiscount(validatedData);
      return {
        success: true,
        data: discount,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create contract brand discount",
      };
    }
  }

  static async getContractBrandDiscount(contractId: string, brandId: string): Promise<ContractBrandDiscountResponse> {
    try {
      const discount = await ContractBrandDiscountsModel.getContractBrandDiscount(contractId, brandId);
      if (!discount) {
        return {
          success: false,
          error: "Contract brand discount not found",
        };
      }
      return {
        success: true,
        data: discount,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get contract brand discount",
      };
    }
  }

  static async getDiscountsByContractId(contractId: string): Promise<ContractBrandDiscountsResponse> {
    try {
      const discounts = await ContractBrandDiscountsModel.getDiscountsByContractId(contractId);
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

  static async getDiscountsByBrandId(brandId: string): Promise<ContractBrandDiscountsResponse> {
    try {
      const discounts = await ContractBrandDiscountsModel.getDiscountsByBrandId(brandId);
      return {
        success: true,
        data: discounts,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get discounts for brand",
      };
    }
  }

  static async updateContractBrandDiscount(
    contractId: string,
    brandId: string,
    data: Partial<ContractBrandDiscount>
  ): Promise<ContractBrandDiscountResponse> {
    try {
      // Convert discountValue to string if it's a number
      const processedData = {
        ...data,
        discountValue: data.discountValue?.toString(),
      };
      
      // Validate input data
      const validatedData = contractBrandDiscountSchema.partial().parse(processedData);
      
      const discount = await ContractBrandDiscountsModel.updateContractBrandDiscount(
        contractId,
        brandId,
        validatedData
      );
      if (!discount) {
        return {
          success: false,
          error: "Contract brand discount not found",
        };
      }
      return {
        success: true,
        data: discount,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update contract brand discount",
      };
    }
  }

  static async deleteContractBrandDiscount(contractId: string, brandId: string): Promise<ContractBrandDiscountResponse> {
    try {
      const success = await ContractBrandDiscountsModel.deleteContractBrandDiscount(contractId, brandId);
      if (!success) {
        return {
          success: false,
          error: "Contract brand discount not found",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete contract brand discount",
      };
    }
  }

  static async listContractBrandDiscounts(): Promise<ContractBrandDiscountsResponse> {
    try {
      const discounts = await ContractBrandDiscountsModel.listContractBrandDiscounts();
      return {
        success: true,
        data: discounts,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to list contract brand discounts",
      };
    }
  }
}
