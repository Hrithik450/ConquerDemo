import { CartModel } from "./cart.model";
import { cartSchema, CartResponse, CartsResponse } from "./cart.types";
import { revalidatePath } from "next/cache";

//fix it later with next auth or something
function auth(): { userId: any; orgId: any; } {
  throw new Error("Function not implemented.");
}

export async function createCart(data: unknown): Promise<CartResponse> {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return { success: false, error: "Unauthorized" };
    }

    const validatedData = cartSchema.parse(data);
    const cart = await CartModel.createCart({
      userId,
      organizationId: orgId,
    });

    revalidatePath("/cart");
    return { success: true, data: cart };
  } catch (error) {
    console.error("Error creating cart:", error);
    return { success: false, error: "Failed to create cart" };
  }
}

export async function getCartById(cartId: string): Promise<CartResponse> {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return { success: false, error: "Unauthorized" };
    }

    const cart = await CartModel.getCartById(cartId);
    if (!cart) {
      return { success: false, error: "Cart not found" };
    }

    if (cart.userId !== userId || cart.organizationId !== orgId) {
      return { success: false, error: "Unauthorized" };
    }

    return { success: true, data: cart };
  } catch (error) {
    console.error("Error getting cart:", error);
    return { success: false, error: "Failed to get cart" };
  }
}

export async function updateCart(cartId: string, data: unknown): Promise<CartResponse> {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return { success: false, error: "Unauthorized" };
    }

    const cart = await CartModel.getCartById(cartId);
    if (!cart) {
      return { success: false, error: "Cart not found" };
    }

    if (cart.userId !== userId || cart.organizationId !== orgId) {
      return { success: false, error: "Unauthorized" };
    }

    const validatedData = cartSchema.partial().parse(data);
    const updateData = {
      updatedAt: new Date(),
    };
    const updatedCart = await CartModel.updateCart(cartId, updateData);
    if (!updatedCart) {
      return { success: false, error: "Failed to update cart" };
    }

    revalidatePath("/cart");
    return { success: true, data: updatedCart };
  } catch (error) {
    console.error("Error updating cart:", error);
    return { success: false, error: "Failed to update cart" };
  }
}

export async function deleteCart(cartId: string): Promise<CartResponse> {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return { success: false, error: "Unauthorized" };
    }

    const cart = await CartModel.getCartById(cartId);
    if (!cart) {
      return { success: false, error: "Cart not found" };
    }

    if (cart.userId !== userId || cart.organizationId !== orgId) {
      return { success: false, error: "Unauthorized" };
    }

    const success = await CartModel.deleteCart(cartId);
    if (!success) {
      return { success: false, error: "Failed to delete cart" };
    }

    revalidatePath("/cart");
    return { success: true, data: cart };
  } catch (error) {
    console.error("Error deleting cart:", error);
    return { success: false, error: "Failed to delete cart" };
  }
}

export async function listCarts(): Promise<CartsResponse> {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return { success: false, error: "Unauthorized" };
    }

    const carts = await CartModel.getCartsByUser(userId);
    return { success: true, data: carts };
  } catch (error) {
    console.error("Error listing carts:", error);
    return { success: false, error: "Failed to list carts" };
  }
} 
