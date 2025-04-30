import { db } from "@/lib/db";
import { contracts } from "@/lib/db/schema";
import { eq, and, gte, lte } from "drizzle-orm";
import type { NewContract, Contract } from "./contracts.types";

export class ContractsModel {
  static async createContract(data: NewContract): Promise<Contract> {
    const [contract] = await db.insert(contracts).values(data).returning();
    return contract;
  }

  static async getContractById(contractId: string): Promise<Contract | null> {
    const [contract] = await db
      .select()
      .from(contracts)
      .where(eq(contracts.contractId, contractId));
    return contract || null;
  }

  static async getContractByNumber(contractNumber: string): Promise<Contract | null> {
    const [contract] = await db
      .select()
      .from(contracts)
      .where(eq(contracts.contractNumber, contractNumber));
    return contract || null;
  }

  static async getActiveContractByOrganization(organizationId: string): Promise<Contract | null> {
    const [contract] = await db
      .select()
      .from(contracts)
      .where(
        and(
          eq(contracts.organizationId, organizationId),
          eq(contracts.isActive, true),
          gte(contracts.endDate, new Date()),
          lte(contracts.startDate, new Date())
        )
      );
    return contract || null;
  }

  static async updateContract(
    contractId: string,
    data: Partial<NewContract>
  ): Promise<Contract | null> {
    const [contract] = await db
      .update(contracts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(contracts.contractId, contractId))
      .returning();
    return contract || null;
  }

  static async deleteContract(contractId: string): Promise<boolean> {
    const result = await db
      .delete(contracts)
      .where(eq(contracts.contractId, contractId))
      .returning();
    return result.length > 0;
  }

  static async listContractsByOrganization(organizationId: string): Promise<Contract[]> {
    return await db
      .select()
      .from(contracts)
      .where(eq(contracts.organizationId, organizationId));
  }

  static async listActiveContracts(): Promise<Contract[]> {
    return await db
      .select()
      .from(contracts)
      .where(
        and(
          eq(contracts.isActive, true),
          gte(contracts.endDate, new Date()),
          lte(contracts.startDate, new Date())
        )
      );
  }
}
