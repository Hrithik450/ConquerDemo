import { ContractProductAttributeValueRestrictionsModel } from "./contractProductAttributeValueRestrictions.model";
import { contractProductAttributeValueRestrictionSchema } from "./contractProductAttributeValueRestrictions.types";
import type {
  ContractProductAttributeValueRestriction,
  ContractProductAttributeValueRestrictionResponse,
  ContractProductAttributeValueRestrictionsResponse,
} from "./contractProductAttributeValueRestrictions.types";
import { revalidatePath } from "next/cache";

//fix it later with next auth or something
function auth(): { userId: any; orgId: any } {
  throw new Error("Function not implemented.");
}

export async function createContractProductAttributeValueRestriction(
  data: unknown
): Promise<ContractProductAttributeValueRestrictionResponse> {
  try {
    // const { userId, orgId } = auth();
    // if (!userId || !orgId) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const validatedData =
      contractProductAttributeValueRestrictionSchema.parse(data);
    const restriction =
      await ContractProductAttributeValueRestrictionsModel.createContractProductAttributeValueRestriction(
        validatedData
      );

    revalidatePath("/contracts");
    return { success: true, data: restriction };
  } catch (error) {
    console.error("Error creating restriction:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create restriction",
    };
  }
}

export async function getContractProductAttributeValueRestriction(
  contractId: string,
  productId: string,
  attributeId: string,
  attributeValueId: string
): Promise<ContractProductAttributeValueRestrictionResponse> {
  try {
    // const { userId, orgId } = auth();
    // if (!userId || !orgId) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const restriction =
      await ContractProductAttributeValueRestrictionsModel.getContractProductAttributeValueRestriction(
        contractId,
        productId,
        attributeId,
        attributeValueId
      );

    if (!restriction) {
      return { success: false, error: "Restriction not found" };
    }

    return { success: true, data: restriction };
  } catch (error) {
    console.error("Error getting restriction:", error);
    return { success: false, error: "Failed to get restriction" };
  }
}

export async function getRestrictionsByContractId(
  contractId: string
): Promise<ContractProductAttributeValueRestrictionsResponse> {
  try {
    // const { userId, orgId } = auth();
    // if (!userId || !orgId) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const restrictions =
      await ContractProductAttributeValueRestrictionsModel.getRestrictionsByContractId(
        contractId
      );

    return { success: true, data: restrictions };
  } catch (error) {
    console.error("Error getting restrictions:", error);
    return { success: false, error: "Failed to get restrictions" };
  }
}

export async function getRestrictionsByProductId(
  productId: string
): Promise<ContractProductAttributeValueRestrictionsResponse> {
  try {
    // const { userId, orgId } = auth();
    // if (!userId || !orgId) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const restrictions =
      await ContractProductAttributeValueRestrictionsModel.getRestrictionsByProductId(
        productId
      );

    return { success: true, data: restrictions };
  } catch (error) {
    console.error("Error getting restrictions:", error);
    return { success: false, error: "Failed to get restrictions" };
  }
}

export async function getRestrictionsByAttributeId(
  attributeId: string
): Promise<ContractProductAttributeValueRestrictionsResponse> {
  try {
    // const { userId, orgId } = auth();
    // if (!userId || !orgId) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const restrictions =
      await ContractProductAttributeValueRestrictionsModel.getRestrictionsByAttributeId(
        attributeId
      );

    return { success: true, data: restrictions };
  } catch (error) {
    console.error("Error getting restrictions:", error);
    return { success: false, error: "Failed to get restrictions" };
  }
}

export async function updateContractProductAttributeValueRestriction(
  contractId: string,
  productId: string,
  attributeId: string,
  attributeValueId: string,
  data: unknown
): Promise<ContractProductAttributeValueRestrictionResponse> {
  try {
    // const { userId, orgId } = auth();
    // if (!userId || !orgId) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const restriction =
      await ContractProductAttributeValueRestrictionsModel.getContractProductAttributeValueRestriction(
        contractId,
        productId,
        attributeId,
        attributeValueId
      );

    if (!restriction) {
      return { success: false, error: "Restriction not found" };
    }

    const validatedData = contractProductAttributeValueRestrictionSchema
      .partial()
      .parse(data);

    const updatedRestriction =
      await ContractProductAttributeValueRestrictionsModel.updateContractProductAttributeValueRestriction(
        contractId,
        productId,
        attributeId,
        attributeValueId,
        validatedData
      );

    if (!updatedRestriction) {
      return { success: false, error: "Failed to update restriction" };
    }

    revalidatePath("/contracts");
    return { success: true, data: updatedRestriction };
  } catch (error) {
    console.error("Error updating restriction:", error);
    return { success: false, error: "Failed to update restriction" };
  }
}

export async function deleteContractProductAttributeValueRestriction(
  contractId: string,
  productId: string,
  attributeId: string,
  attributeValueId: string
): Promise<ContractProductAttributeValueRestrictionResponse> {
  try {
    // const { userId, orgId } = auth();
    // if (!userId || !orgId) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const restriction =
      await ContractProductAttributeValueRestrictionsModel.getContractProductAttributeValueRestriction(
        contractId,
        productId,
        attributeId,
        attributeValueId
      );

    if (!restriction) {
      return { success: false, error: "Restriction not found" };
    }

    const success =
      await ContractProductAttributeValueRestrictionsModel.deleteContractProductAttributeValueRestriction(
        contractId,
        productId,
        attributeId,
        attributeValueId
      );

    if (!success) {
      return { success: false, error: "Failed to delete restriction" };
    }

    revalidatePath("/contracts");
    return { success: true, data: restriction };
  } catch (error) {
    console.error("Error deleting restriction:", error);
    return { success: false, error: "Failed to delete restriction" };
  }
}

export async function listContractProductAttributeValueRestrictions(): Promise<ContractProductAttributeValueRestrictionsResponse> {
  try {
    // const { userId, orgId } = auth();
    // if (!userId || !orgId) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const restrictions =
      await ContractProductAttributeValueRestrictionsModel.listContractProductAttributeValueRestrictions();
    return { success: true, data: restrictions };
  } catch (error) {
    console.error("Error listing restrictions:", error);
    return { success: false, error: "Failed to list restrictions" };
  }
}
