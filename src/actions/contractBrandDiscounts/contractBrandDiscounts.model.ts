import { db } from "@/lib/db";
import { contractBrandDiscounts } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import type {
  NewContractBrandDiscount,
  ContractBrandDiscount,
} from "./contractBrandDiscounts.types";

export class ContractBrandDiscountsModel {
  static async createContractBrandDiscount(
    data: NewContractBrandDiscount
  ): Promise<ContractBrandDiscount> {
    const [discount] = await db
      .insert(contractBrandDiscounts)
      .values(data)
      .returning();
    return discount;
  }

  static async getContractBrandDiscount(
    contractId: string,
    brandId: string
  ): Promise<ContractBrandDiscount | null> {
    const [discount] = await db
      .select()
      .from(contractBrandDiscounts)
      .where(
        and(
          eq(contractBrandDiscounts.contractId, contractId),
          eq(contractBrandDiscounts.brandId, brandId)
        )
      );
    return discount || null;
  }

  static async getDiscountsByContractId(
    contractId: string
  ): Promise<ContractBrandDiscount[]> {
    return await db
      .select()
      .from(contractBrandDiscounts)
      .where(eq(contractBrandDiscounts.contractId, contractId));
  }

  static async getDiscountsByBrandId(
    brandId: string
  ): Promise<ContractBrandDiscount[]> {
    return await db
      .select()
      .from(contractBrandDiscounts)
      .where(eq(contractBrandDiscounts.brandId, brandId));
  }

  static async updateContractBrandDiscount(
    contractId: string,
    brandId: string,
    data: Partial<NewContractBrandDiscount>
  ): Promise<ContractBrandDiscount | null> {
    const [discount] = await db
      .update(contractBrandDiscounts)
      .set({ ...data, updatedAt: new Date() })
      .where(
        and(
          eq(contractBrandDiscounts.contractId, contractId),
          eq(contractBrandDiscounts.brandId, brandId)
        )
      )
      .returning();
    return discount || null;
  }

  static async deleteContractBrandDiscount(
    contractId: string,
    brandId: string
  ): Promise<boolean> {
    const result = await db
      .delete(contractBrandDiscounts)
      .where(
        and(
          eq(contractBrandDiscounts.contractId, contractId),
          eq(contractBrandDiscounts.brandId, brandId)
        )
      );
    return result.rowCount !== null && result.rowCount > 0;
  }

  static async listContractBrandDiscounts(): Promise<ContractBrandDiscount[]> {
    return await db.select().from(contractBrandDiscounts);
  }
}
