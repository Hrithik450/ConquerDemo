import { db } from "@/lib/db";
import { carts } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import type { NewCart, Cart } from "./carts.types";

export class CartsModel {
  static async createCart(data: NewCart): Promise<Cart> {
    const [cart] = await db.insert(carts).values(data).returning();
    return cart;
  }

  static async getCartById(id: string): Promise<Cart | null> {
    const [cart] = await db
      .select()
      .from(carts)
      .where(eq(carts.cartId, id));
    return cart || null;
  }

  static async getCartByUser(userId: string, organizationId: string): Promise<Cart | null> {
    const [cart] = await db
      .select()
      .from(carts)
      .where(
        and(
          eq(carts.userId, userId),
          eq(carts.organizationId, organizationId)
        )
      );
    return cart || null;
  }

  static async updateCart(id: string, data: Partial<NewCart>): Promise<Cart | null> {
    const [cart] = await db
      .update(carts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(carts.cartId, id))
      .returning();
    return cart || null;
  }

  static async deleteCart(id: string): Promise<boolean> {
    const result = await db
      .delete(carts)
      .where(eq(carts.cartId, id));
    return result.count > 0;
  }

  static async listCartsByUser(userId: string): Promise<Cart[]> {
    return await db
      .select()
      .from(carts)
      .where(eq(carts.userId, userId));
  }

  static async listCartsByOrganization(organizationId: string): Promise<Cart[]> {
    return await db
      .select()
      .from(carts)
      .where(eq(carts.organizationId, organizationId));
  }
}
