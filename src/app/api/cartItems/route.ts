import { NextRequest, NextResponse } from "next/server";
import {
  createCartItem,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
  getCartItemsByCartId,
  updateCartItemQuantity,
} from "@/actions/cartItems/cartItems.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cartId = searchParams.get("cartId");
    const id = searchParams.get("id");

    if (id) {
      const item = await getCartItemById(id);
      return NextResponse.json(item);
    }

    if (cartId) {
      const items = await getCartItemsByCartId(cartId);
      return NextResponse.json(items);
    }

    return NextResponse.json(
      { success: false, error: "Missing required parameters" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error getting cart items:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get cart items" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await createCartItem(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating cart item:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create cart item" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing cart item ID" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const result = await updateCartItem(id, data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update cart item" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing cart item ID" },
        { status: 400 }
      );
    }

    const result = await deleteCartItem(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete cart item" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing cart item ID" },
        { status: 400 }
      );
    }

    const { quantity } = await request.json();
    if (typeof quantity !== "number") {
      return NextResponse.json(
        { success: false, error: "Invalid quantity" },
        { status: 400 }
      );
    }

    const result = await updateCartItemQuantity(id, quantity);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update cart item quantity" },
      { status: 500 }
    );
  }
} 