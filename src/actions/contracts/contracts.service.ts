import { ContractsModel } from "./contracts.model";
import { contractSchema } from "./contracts.types";
import type { Contract, ContractResponse, ContractsResponse } from "./contracts.types";

export class ContractsService {
  static async createContract(data: Partial<Contract>): Promise<ContractResponse> {
    try {
      // Validate input data
      const validatedData = contractSchema.parse(data);
      
      // Check if contract number already exists
      if (validatedData.contractNumber) {
        const existingContract = await ContractsModel.getContractByNumber(validatedData.contractNumber);
        if (existingContract) {
          return {
            success: false,
            error: "Contract with this number already exists",
          };
        }
      }

      // Check for overlapping contracts
      const activeContract = await ContractsModel.getActiveContractByOrganization(validatedData.organizationId);
      if (activeContract) {
        return {
          success: false,
          error: "Organization already has an active contract",
        };
      }

      // Create new contract
      const contract = await ContractsModel.createContract(validatedData);
      return {
        success: true,
        data: contract,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create contract",
      };
    }
  }

  static async getContractById(contractId: string): Promise<ContractResponse> {
    try {
      const contract = await ContractsModel.getContractById(contractId);
      if (!contract) {
        return {
          success: false,
          error: "Contract not found",
        };
      }
      return {
        success: true,
        data: contract,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get contract",
      };
    }
  }

  static async updateContract(
    contractId: string,
    data: Partial<Contract>
  ): Promise<ContractResponse> {
    try {
      // Validate input data
      const validatedData = contractSchema.partial().parse(data);
      
      const contract = await ContractsModel.updateContract(contractId, validatedData);
      if (!contract) {
        return {
          success: false,
          error: "Contract not found",
        };
      }
      return {
        success: true,
        data: contract,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update contract",
      };
    }
  }

  static async deleteContract(contractId: string): Promise<ContractResponse> {
    try {
      const success = await ContractsModel.deleteContract(contractId);
      if (!success) {
        return {
          success: false,
          error: "Contract not found",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete contract",
      };
    }
  }

  static async listContractsByOrganization(
    organizationId: string,
    activeOnly: boolean = false
  ): Promise<ContractsResponse> {
    try {
      const contracts = activeOnly
        ? await ContractsModel.listActiveContracts()
        : await ContractsModel.listContractsByOrganization(organizationId);
      return {
        success: true,
        data: contracts,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to list contracts",
      };
    }
  }
}
