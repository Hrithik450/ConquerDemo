import { ContractProductDiscountsModel } from "./contractProductDiscounts.model";
import { contractProductDiscountSchema } from "./contractProductDiscounts.types";
import type { ContractProductDiscount, ContractProductDiscountResponse, ContractProductDiscountsResponse } from "./contractProductDiscounts.types";

export class ContractProductDiscountsService {
  static async createContractProductDiscount(data: Partial<ContractProductDiscount>): Promise<ContractProductDiscountResponse> {
    try {
      // Convert discountValue to string if it's a number
      const processedData = {
        ...data,
        discountValue: data.discountValue?.toString(),
      };
      
      // Validate input data
      const validatedData = contractProductDiscountSchema.parse(processedData);
      
      // Check if discount already exists
      const existingDiscount = await ContractProductDiscountsModel.getContractProductDiscount(
        validatedData.contractId,
        validatedData.productId
      );
      if (existingDiscount) {
        return {
          success: false,
          error: "Contract product discount already exists",
        };
      }

      // Create new discount
      const discount = await ContractProductDiscountsModel.createContractProductDiscount(validatedData);
      return {
        success: true,
        data: discount,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create contract product discount",
      };
    }
  }

  static async getContractProductDiscount(contractId: string, productId: string): Promise<ContractProductDiscountResponse> {
    try {
      const discount = await ContractProductDiscountsModel.getContractProductDiscount(contractId, productId);
      if (!discount) {
        return {
          success: false,
          error: "Contract product discount not found",
        };
      }
      return {
        success: true,
        data: discount,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get contract product discount",
      };
    }
  }

  static async getDiscountsByContractId(contractId: string): Promise<ContractProductDiscountsResponse> {
    try {
      const discounts = await ContractProductDiscountsModel.getDiscountsByContractId(contractId);
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

  static async getDiscountsByProductId(productId: string): Promise<ContractProductDiscountsResponse> {
    try {
      const discounts = await ContractProductDiscountsModel.getDiscountsByProductId(productId);
      return {
        success: true,
        data: discounts,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get discounts for product",
      };
    }
  }

  static async updateContractProductDiscount(
    contractId: string,
    productId: string,
    data: Partial<ContractProductDiscount>
  ): Promise<ContractProductDiscountResponse> {
    try {
      // Convert discountValue to string if it's a number
      const processedData = {
        ...data,
        discountValue: data.discountValue?.toString(),
      };
      
      // Validate input data
      const validatedData = contractProductDiscountSchema.partial().parse(processedData);
      
      const discount = await ContractProductDiscountsModel.updateContractProductDiscount(
        contractId,
        productId,
        validatedData
      );
      if (!discount) {
        return {
          success: false,
          error: "Contract product discount not found",
        };
      }
      return {
        success: true,
        data: discount,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update contract product discount",
      };
    }
  }

  static async deleteContractProductDiscount(contractId: string, productId: string): Promise<ContractProductDiscountResponse> {
    try {
      const success = await ContractProductDiscountsModel.deleteContractProductDiscount(contractId, productId);
      if (!success) {
        return {
          success: false,
          error: "Contract product discount not found",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete contract product discount",
      };
    }
  }

  static async listContractProductDiscounts(): Promise<ContractProductDiscountsResponse> {
    try {
      const discounts = await ContractProductDiscountsModel.listContractProductDiscounts();
      return {
        success: true,
        data: discounts,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to list contract product discounts",
      };
    }
  }
}
