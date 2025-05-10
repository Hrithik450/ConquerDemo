import { db } from "@/lib/db";
import { contractProductAttributeValueRestrictions } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import type {
  ContractProductAttributeValueRestriction,
  NewContractProductAttributeValueRestriction,
} from "./contractProductAttributeValueRestrictions.types";

export class ContractProductAttributeValueRestrictionsModel {
  static async createContractProductAttributeValueRestriction(
    data: NewContractProductAttributeValueRestriction
  ): Promise<ContractProductAttributeValueRestriction> {
    const [restriction] = await db
      .insert(contractProductAttributeValueRestrictions)
      .values(data)
      .returning();
    return restriction;
  }

  static async getContractProductAttributeValueRestriction(
    contractId: string,
    productId: string,
    attributeId: string,
    attributeValueId: string
  ): Promise<ContractProductAttributeValueRestriction | null> {
    const [restriction] = await db
      .select()
      .from(contractProductAttributeValueRestrictions)
      .where(
        and(
          eq(contractProductAttributeValueRestrictions.contractId, contractId),
          eq(contractProductAttributeValueRestrictions.productId, productId),
          eq(
            contractProductAttributeValueRestrictions.attributeId,
            attributeId
          ),
          eq(
            contractProductAttributeValueRestrictions.attributeValueId,
            attributeValueId
          )
        )
      );
    return restriction || null;
  }

  static async getRestrictionsByContractId(
    contractId: string
  ): Promise<ContractProductAttributeValueRestriction[]> {
    return await db
      .select()
      .from(contractProductAttributeValueRestrictions)
      .where(
        eq(contractProductAttributeValueRestrictions.contractId, contractId)
      );
  }

  static async getRestrictionsByProductId(
    productId: string
  ): Promise<ContractProductAttributeValueRestriction[]> {
    return await db
      .select()
      .from(contractProductAttributeValueRestrictions)
      .where(
        eq(contractProductAttributeValueRestrictions.productId, productId)
      );
  }

  static async getRestrictionsByAttributeId(
    attributeId: string
  ): Promise<ContractProductAttributeValueRestriction[]> {
    return await db
      .select()
      .from(contractProductAttributeValueRestrictions)
      .where(
        eq(contractProductAttributeValueRestrictions.attributeId, attributeId)
      );
  }

  static async updateContractProductAttributeValueRestriction(
    contractId: string,
    productId: string,
    attributeId: string,
    attributeValueId: string,
    data: Partial<NewContractProductAttributeValueRestriction>
  ): Promise<ContractProductAttributeValueRestriction | null> {
    const [restriction] = await db
      .update(contractProductAttributeValueRestrictions)
      .set(data)
      .where(
        and(
          eq(contractProductAttributeValueRestrictions.contractId, contractId),
          eq(contractProductAttributeValueRestrictions.productId, productId),
          eq(
            contractProductAttributeValueRestrictions.attributeId,
            attributeId
          ),
          eq(
            contractProductAttributeValueRestrictions.attributeValueId,
            attributeValueId
          )
        )
      )
      .returning();
    return restriction || null;
  }

  static async deleteContractProductAttributeValueRestriction(
    contractId: string,
    productId: string,
    attributeId: string,
    attributeValueId: string
  ): Promise<boolean> {
    const result = await db
      .delete(contractProductAttributeValueRestrictions)
      .where(
        and(
          eq(contractProductAttributeValueRestrictions.contractId, contractId),
          eq(contractProductAttributeValueRestrictions.productId, productId),
          eq(
            contractProductAttributeValueRestrictions.attributeId,
            attributeId
          ),
          eq(
            contractProductAttributeValueRestrictions.attributeValueId,
            attributeValueId
          )
        )
      );
    return result.count > 0;
  }

  static async listContractProductAttributeValueRestrictions(): Promise<
    ContractProductAttributeValueRestriction[]
  > {
    return await db.select().from(contractProductAttributeValueRestrictions);
  }
}
