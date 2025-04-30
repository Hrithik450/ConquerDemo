import { NextRequest, NextResponse } from "next/server";
import { OrderItemsService } from "@/actions/orderItems/orderItems.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");
    const id = searchParams.get("id");

    if (id) {
      const item = await OrderItemsService.getOrderItemById(id);
      return NextResponse.json(item);
    }

    if (orderId) {
      const items = await OrderItemsService.getOrderItemsByOrderId(orderId);
      return NextResponse.json(items);
    }

    return NextResponse.json(
      { success: false, error: "Missing required parameters" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error getting order items:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get order items" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await OrderItemsService.createOrderItem(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating order item:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order item" },
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
        { success: false, error: "Missing order item ID" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const result = await OrderItemsService.updateOrderItem(id, data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating order item:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update order item" },
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
        { success: false, error: "Missing order item ID" },
        { status: 400 }
      );
    }

    const result = await OrderItemsService.deleteOrderItem(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting order item:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete order item" },
      { status: 500 }
    );
  }
} 