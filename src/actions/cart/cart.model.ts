import { db } from "@/lib/db";
import { carts, cartItems } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export type Cart = typeof carts.$inferSelect;
export type NewCart = typeof carts.$inferInsert;

export class CartModel {
  static async createCart(data: NewCart): Promise<Cart> {
    const [cart] = await db.insert(carts).values(data).returning();
    return cart;
  }

  static async getCartById(cartId: string): Promise<Cart | null> {
    const [cart] = await db.select().from(carts).where(eq(carts.cartId, cartId));
    return cart || null;
  }

  static async updateCart(cartId: string, data: Partial<NewCart>): Promise<Cart | null> {
    const [cart] = await db
      .update(carts)
      .set(data)
      .where(eq(carts.cartId, cartId))
      .returning();
    return cart || null;
  }

  static async deleteCart(cartId: string): Promise<boolean> {
    const result = await db.delete(carts).where(eq(carts.cartId, cartId));
    return result.length > 0;
  }

  static async listCarts(): Promise<Cart[]> {
    return await db.select().from(carts);
  }

  static async getCartsByUser(userId: string): Promise<Cart[]> {
    return await db.select().from(carts).where(eq(carts.userId, userId));
  }

  static async getCartByUserAndProduct(userId: string, productVariantId: string): Promise<Cart | null> {
    const [result] = await db
      .select({
        cartId: carts.cartId,
        userId: carts.userId,
        organizationId: carts.organizationId,
        createdAt: carts.createdAt,
        updatedAt: carts.updatedAt
      })
      .from(carts)
      .innerJoin(cartItems, eq(carts.cartId, cartItems.cartId))
      .where(and(
        eq(carts.userId, userId),
        eq(cartItems.productVariantId, productVariantId)
      ));
    return result || null;
  }
} 