import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import type { NewOrder, Order } from "./orders.types";

export class OrdersModel {
  static async createOrder(data: NewOrder): Promise<Order> {
    const [order] = await db.insert(orders).values(data).returning();
    return order;
  }

  static async getOrderById(orderId: string): Promise<Order | null> {
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.orderId, orderId));
    return order || null;
  }

  static async updateOrder(orderId: string, data: Partial<NewOrder>): Promise<Order | null> {
    const [order] = await db
      .update(orders)
      .set(data)
      .where(eq(orders.orderId, orderId))
      .returning();
    return order || null;
  }

  static async deleteOrder(orderId: string): Promise<boolean> {
    const result = await db
      .delete(orders)
      .where(eq(orders.orderId, orderId))
      .returning();
    return result.length > 0;
  }

  static async listOrders(): Promise<Order[]> {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  static async getOrdersByUser(userId: string): Promise<Order[]> {
    return await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt));
  }

  static async getOrdersByStatus(status: string): Promise<Order[]> {
    return await db
      .select()
      .from(orders)
      .where(eq(orders.status, status))
      .orderBy(desc(orders.createdAt));
  }
}
