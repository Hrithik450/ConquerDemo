import { db } from "@/lib/db";
import { priceHistory } from "@/lib/db/schema";
import { eq, and, lte, gte, or, desc, isNull } from "drizzle-orm";
import type { NewPriceHistory, PriceHistory } from "./priceHistory.types";

export class PriceHistoryModel {
  static async createPriceHistory(
    data: NewPriceHistory
  ): Promise<PriceHistory> {
    const [history] = await db.insert(priceHistory).values(data).returning();
    return history;
  }

  static async getPriceHistoryById(id: string): Promise<PriceHistory | null> {
    const [history] = await db
      .select()
      .from(priceHistory)
      .where(eq(priceHistory.id, id));
    return history || null;
  }

  static async getCurrentPriceHistoryByVariantId(
    variantId: string
  ): Promise<PriceHistory | null> {
    const now = new Date();
    const [history] = await db
      .select()
      .from(priceHistory)
      .where(
        and(
          eq(priceHistory.variantId, variantId),
          lte(priceHistory.effectiveFrom, now),
          or(
            isNull(priceHistory.effectiveTo),
            gte(priceHistory.effectiveTo, now)
          )
        )
      )
      .orderBy(desc(priceHistory.effectiveFrom))
      .limit(1);
    return history || null;
  }

  static async getPriceHistoryByVariantId(
    variantId: string
  ): Promise<PriceHistory[]> {
    return await db
      .select()
      .from(priceHistory)
      .where(eq(priceHistory.variantId, variantId))
      .orderBy(desc(priceHistory.effectiveFrom));
  }

  static async getPriceHistoryByDateRange(
    variantId: string,
    startDate: Date,
    endDate: Date
  ): Promise<PriceHistory[]> {
    return await db
      .select()
      .from(priceHistory)
      .where(
        and(
          eq(priceHistory.variantId, variantId),
          gte(priceHistory.effectiveFrom, startDate),
          lte(priceHistory.effectiveFrom, endDate)
        )
      )
      .orderBy(desc(priceHistory.effectiveFrom));
  }

  static async updatePriceHistory(
    id: string,
    data: Partial<NewPriceHistory>
  ): Promise<PriceHistory | null> {
    const [history] = await db
      .update(priceHistory)
      .set(data)
      .where(eq(priceHistory.id, id))
      .returning();
    return history || null;
  }

  static async deletePriceHistory(id: string): Promise<boolean> {
    const result = await db.delete(priceHistory).where(eq(priceHistory.id, id));
    return result.count > 0;
  }

  static async deletePriceHistoryByVariantId(
    variantId: string
  ): Promise<boolean> {
    const result = await db
      .delete(priceHistory)
      .where(eq(priceHistory.variantId, variantId));
    return result.count > 0;
  }
}
