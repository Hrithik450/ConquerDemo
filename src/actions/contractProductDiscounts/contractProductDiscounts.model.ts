import { db } from "@/lib/db";
import { contractProductDiscounts } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import type { NewContractProductDiscount, ContractProductDiscount } from "./contractProductDiscounts.types";

export class ContractProductDiscountsModel {
  static async createContractProductDiscount(data: NewContractProductDiscount): Promise<ContractProductDiscount> {
    const [discount] = await db.insert(contractProductDiscounts).values(data).returning();
    return discount;
  }

  static async getContractProductDiscount(contractId: string, productId: string): Promise<ContractProductDiscount | null> {
    const [discount] = await db
      .select()
      .from(contractProductDiscounts)
      .where(
        and(
          eq(contractProductDiscounts.contractId, contractId),
          eq(contractProductDiscounts.productId, productId)
        )
      );
    return discount || null;
  }

  static async getDiscountsByContractId(contractId: string): Promise<ContractProductDiscount[]> {
    return await db
      .select()
      .from(contractProductDiscounts)
      .where(eq(contractProductDiscounts.contractId, contractId));
  }

  static async getDiscountsByProductId(productId: string): Promise<ContractProductDiscount[]> {
    return await db
      .select()
      .from(contractProductDiscounts)
      .where(eq(contractProductDiscounts.productId, productId));
  }

  static async updateContractProductDiscount(
    contractId: string,
    productId: string,
    data: Partial<NewContractProductDiscount>
  ): Promise<ContractProductDiscount | null> {
    const [discount] = await db
      .update(contractProductDiscounts)
      .set({ ...data, updatedAt: new Date() })
      .where(
        and(
          eq(contractProductDiscounts.contractId, contractId),
          eq(contractProductDiscounts.productId, productId)
        )
      )
      .returning();
    return discount || null;
  }

  static async deleteContractProductDiscount(contractId: string, productId: string): Promise<boolean> {
    const result = await db
      .delete(contractProductDiscounts)
      .where(
        and(
          eq(contractProductDiscounts.contractId, contractId),
          eq(contractProductDiscounts.productId, productId)
        )
      );
    return result.count > 0;
  }

  static async listContractProductDiscounts(): Promise<ContractProductDiscount[]> {
    return await db.select().from(contractProductDiscounts);
  }
}
