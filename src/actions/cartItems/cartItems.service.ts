import { CartItemsModel } from "./cartItems.model";
import { cartItemSchema } from "./cartItems.types";
import type { CartItem, CartItemResponse, CartItemsResponse } from "./cartItems.types";
import { revalidatePath } from "next/cache";

//fix it later with next auth or something
function auth(): { userId: any; orgId: any; } {
  throw new Error("Function not implemented.");
}

export async function createCartItem(data: unknown): Promise<CartItemResponse> {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return { success: false, error: "Unauthorized" };
    }

    const validatedData = cartItemSchema.parse(data);
    const cartItem = await CartItemsModel.createCartItem(validatedData);

    revalidatePath("/cart");
    return { success: true, data: cartItem };
  } catch (error) {
    console.error("Error creating cart item:", error);
    return { success: false, error: "Failed to create cart item" };
  }
}

export async function getCartItemById(cartItemId: string): Promise<CartItemResponse> {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return { success: false, error: "Unauthorized" };
    }

    const cartItem = await CartItemsModel.getCartItemById(cartItemId);
    if (!cartItem) {
      return { success: false, error: "Cart item not found" };
    }

    return { success: true, data: cartItem };
  } catch (error) {
    console.error("Error getting cart item:", error);
    return { success: false, error: "Failed to get cart item" };
  }
}

export async function updateCartItem(
  cartItemId: string,
  data: unknown
): Promise<CartItemResponse> {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return { success: false, error: "Unauthorized" };
    }

    const cartItem = await CartItemsModel.getCartItemById(cartItemId);
    if (!cartItem) {
      return { success: false, error: "Cart item not found" };
    }

    const validatedData = cartItemSchema.partial().parse(data);
    const updatedCartItem = await CartItemsModel.updateCartItem(
      cartItemId,
      validatedData
    );

    if (!updatedCartItem) {
      return { success: false, error: "Failed to update cart item" };
    }

    revalidatePath("/cart");
    return { success: true, data: updatedCartItem };
  } catch (error) {
    console.error("Error updating cart item:", error);
    return { success: false, error: "Failed to update cart item" };
  }
}

export async function deleteCartItem(cartItemId: string): Promise<CartItemResponse> {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return { success: false, error: "Unauthorized" };
    }

    const cartItem = await CartItemsModel.getCartItemById(cartItemId);
    if (!cartItem) {
      return { success: false, error: "Cart item not found" };
    }

    const success = await CartItemsModel.deleteCartItem(cartItemId);
    if (!success) {
      return { success: false, error: "Failed to delete cart item" };
    }

    revalidatePath("/cart");
    return { success: true, data: cartItem };
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return { success: false, error: "Failed to delete cart item" };
  }
}

export async function getCartItemsByCartId(cartId: string): Promise<CartItemsResponse> {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return { success: false, error: "Unauthorized" };
    }

    const cartItems = await CartItemsModel.getCartItemsByCartId(cartId);
    return { success: true, data: cartItems };
  } catch (error) {
    console.error("Error getting cart items:", error);
    return { success: false, error: "Failed to get cart items" };
  }
}

export async function updateCartItemQuantity(
  cartItemId: string,
  quantity: number
): Promise<CartItemResponse> {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return { success: false, error: "Unauthorized" };
    }

    const cartItem = await CartItemsModel.getCartItemById(cartItemId);
    if (!cartItem) {
      return { success: false, error: "Cart item not found" };
    }

    const updatedCartItem = await CartItemsModel.updateCartItemQuantity(
      cartItemId,
      quantity
    );

    if (!updatedCartItem) {
      return { success: false, error: "Failed to update cart item quantity" };
    }

    revalidatePath("/cart");
    return { success: true, data: updatedCartItem };
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    return { success: false, error: "Failed to update cart item quantity" };
  }
}
