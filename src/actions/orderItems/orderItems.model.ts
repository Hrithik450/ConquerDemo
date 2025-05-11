import { db } from "@/lib/db";
import { orderItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { NewOrderItem, OrderItem } from "./orderItems.types";

export class OrderItemsModel {
  static async createOrderItem(data: NewOrderItem): Promise<OrderItem> {
    const [item] = await db.insert(orderItems).values(data).returning();
    return item;
  }

  static async getOrderItemById(id: string): Promise<OrderItem | null> {
    const [item] = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderItemId, id));
    return item || null;
  }

  static async getOrderItemsByOrderId(orderId: string): Promise<OrderItem[]> {
    return await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, orderId));
  }

  static async getOrderItemsByProductVariantId(
    productVariantId: string
  ): Promise<OrderItem[]> {
    return await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.productVariantId, productVariantId));
  }

  static async updateOrderItem(
    id: string,
    data: Partial<NewOrderItem>
  ): Promise<OrderItem | null> {
    const [item] = await db
      .update(orderItems)
      .set(data)
      .where(eq(orderItems.orderItemId, id))
      .returning();
    return item || null;
  }

  static async deleteOrderItem(id: string): Promise<boolean> {
    const result = await db
      .delete(orderItems)
      .where(eq(orderItems.orderItemId, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  static async deleteOrderItemsByOrderId(orderId: string): Promise<boolean> {
    const result = await db
      .delete(orderItems)
      .where(eq(orderItems.orderId, orderId));
    return result.rowCount !== null && result.rowCount > 0;
  }
}
