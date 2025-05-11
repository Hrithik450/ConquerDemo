import { db } from "@/lib/db";
import { orderStatusHistory } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import type {
  OrderStatusHistory,
  NewOrderStatusHistory,
} from "./orderStatusHistory.types";

export class OrderStatusHistoryModel {
  static async createOrderStatusHistory(
    data: NewOrderStatusHistory
  ): Promise<OrderStatusHistory> {
    const [history] = await db
      .insert(orderStatusHistory)
      .values(data)
      .returning();
    return history;
  }

  static async getOrderStatusHistoryById(
    historyId: string
  ): Promise<OrderStatusHistory | null> {
    const [history] = await db
      .select()
      .from(orderStatusHistory)
      .where(eq(orderStatusHistory.historyId, historyId));
    return history || null;
  }

  static async getOrderStatusHistoryByOrderId(
    orderId: string
  ): Promise<OrderStatusHistory[]> {
    return await db
      .select()
      .from(orderStatusHistory)
      .where(eq(orderStatusHistory.orderId, orderId))
      .orderBy(orderStatusHistory.createdAt);
  }

  static async getOrderStatusHistoryByStatus(
    status: string
  ): Promise<OrderStatusHistory[]> {
    return await db
      .select()
      .from(orderStatusHistory)
      .where(eq(orderStatusHistory.status, status));
  }

  static async getOrderStatusHistoryByUser(
    userId: string
  ): Promise<OrderStatusHistory[]> {
    return await db
      .select()
      .from(orderStatusHistory)
      .where(eq(orderStatusHistory.changedBy, userId));
  }

  static async updateOrderStatusHistory(
    historyId: string,
    data: Partial<NewOrderStatusHistory>
  ): Promise<OrderStatusHistory | null> {
    const [history] = await db
      .update(orderStatusHistory)
      .set(data)
      .where(eq(orderStatusHistory.historyId, historyId))
      .returning();
    return history || null;
  }

  static async deleteOrderStatusHistory(historyId: string): Promise<boolean> {
    const result = await db
      .delete(orderStatusHistory)
      .where(eq(orderStatusHistory.historyId, historyId));
    return result.rowCount !== null && result.rowCount > 0;
  }

  static async listOrderStatusHistory(): Promise<OrderStatusHistory[]> {
    return await db.select().from(orderStatusHistory);
  }
}
