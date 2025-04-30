import { NextResponse } from "next/server";
import { OrdersService } from "@/actions/orders/orders.service";
import type { NewOrder } from "@/actions/orders/orders.types";

export async function POST(request: Request) {
  try {
    const data: NewOrder = await request.json();
    const order = await OrdersService.createOrder(data);
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");

    if (orderId) {
      const order = await OrdersService.getOrderById(orderId);
      if (!order) {
        return NextResponse.json(
          { error: "Order not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(order);
    }

    if (userId) {
      const orders = await OrdersService.getOrdersByUser(userId);
      return NextResponse.json(orders);
    }

    if (status) {
      const orders = await OrdersService.getOrdersByStatus(status);
      return NextResponse.json(orders);
    }

    const orders = await OrdersService.listOrders();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const order = await OrdersService.updateOrder(orderId, data);

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const success = await OrdersService.deleteOrder(orderId);

    if (!success) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 }
    );
  }
} 