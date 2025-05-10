import { db } from "@/lib/db";
import { contractCategoryDiscounts } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import type {
  NewContractCategoryDiscount,
  ContractCategoryDiscount,
} from "./contractCategoryDiscounts.types";

export class ContractCategoryDiscountsModel {
  static async createContractCategoryDiscount(
    data: NewContractCategoryDiscount
  ): Promise<ContractCategoryDiscount> {
    const [discount] = await db
      .insert(contractCategoryDiscounts)
      .values(data)
      .returning();
    return discount;
  }

  static async getContractCategoryDiscount(
    contractId: string,
    categoryId: string
  ): Promise<ContractCategoryDiscount | null> {
    const [discount] = await db
      .select()
      .from(contractCategoryDiscounts)
      .where(
        and(
          eq(contractCategoryDiscounts.contractId, contractId),
          eq(contractCategoryDiscounts.categoryId, categoryId)
        )
      );
    return discount || null;
  }

  static async getDiscountsByContractId(
    contractId: string
  ): Promise<ContractCategoryDiscount[]> {
    return await db
      .select()
      .from(contractCategoryDiscounts)
      .where(eq(contractCategoryDiscounts.contractId, contractId));
  }

  static async getDiscountsByCategoryId(
    categoryId: string
  ): Promise<ContractCategoryDiscount[]> {
    return await db
      .select()
      .from(contractCategoryDiscounts)
      .where(eq(contractCategoryDiscounts.categoryId, categoryId));
  }

  static async updateContractCategoryDiscount(
    contractId: string,
    categoryId: string,
    data: Partial<NewContractCategoryDiscount>
  ): Promise<ContractCategoryDiscount | null> {
    const [discount] = await db
      .update(contractCategoryDiscounts)
      .set({ ...data, updatedAt: new Date() })
      .where(
        and(
          eq(contractCategoryDiscounts.contractId, contractId),
          eq(contractCategoryDiscounts.categoryId, categoryId)
        )
      )
      .returning();
    return discount || null;
  }

  static async deleteContractCategoryDiscount(
    contractId: string,
    categoryId: string
  ): Promise<boolean> {
    const result = await db
      .delete(contractCategoryDiscounts)
      .where(
        and(
          eq(contractCategoryDiscounts.contractId, contractId),
          eq(contractCategoryDiscounts.categoryId, categoryId)
        )
      );
    return result.count > 0;
  }

  static async listContractCategoryDiscounts(): Promise<
    ContractCategoryDiscount[]
  > {
    return await db.select().from(contractCategoryDiscounts);
  }
}
