import { db } from "@/lib/db";
import { cartItems } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import type { CartItem, NewCartItem } from "./cartItems.types";

export class CartItemsModel {
  static async createCartItem(data: NewCartItem): Promise<CartItem> {
    const [cartItem] = await db.insert(cartItems).values(data).returning();
    return cartItem;
  }

  static async getCartItemById(cartItemId: string): Promise<CartItem | null> {
    const [cartItem] = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.cartItemId, cartItemId));
    return cartItem || null;
  }

  static async updateCartItem(
    cartItemId: string,
    data: Partial<NewCartItem>
  ): Promise<CartItem | null> {
    const [cartItem] = await db
      .update(cartItems)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(cartItems.cartItemId, cartItemId))
      .returning();
    return cartItem || null;
  }

  static async deleteCartItem(cartItemId: string): Promise<boolean> {
    const result = await db
      .delete(cartItems)
      .where(eq(cartItems.cartItemId, cartItemId));
    return result.rowCount !== null && result.rowCount > 0;
  }

  static async getCartItemsByCartId(cartId: string): Promise<CartItem[]> {
    return await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.cartId, cartId));
  }

  static async getCartItemByCartAndProductVariant(
    cartId: string,
    productVariantId: string
  ): Promise<CartItem | null> {
    const [cartItem] = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.cartId, cartId),
          eq(cartItems.productVariantId, productVariantId)
        )
      );
    return cartItem || null;
  }

  static async updateCartItemQuantity(
    cartItemId: string,
    quantity: number
  ): Promise<CartItem | null> {
    const [cartItem] = await db
      .update(cartItems)
      .set({ quantity, updatedAt: new Date() })
      .where(eq(cartItems.cartItemId, cartItemId))
      .returning();
    return cartItem || null;
  }
}
