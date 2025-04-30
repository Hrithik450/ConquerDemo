import { NextRequest, NextResponse } from "next/server";
import { createOrderStatusHistory, getOrderStatusHistoryByOrderId } from "@/actions/orderStatusHistory/orderStatusHistory.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");
    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Missing order ID" },
        { status: 400 }
      );
    }

    const history = await getOrderStatusHistoryByOrderId(orderId);
    return NextResponse.json(history);
  } catch (error) {
    console.error("Error getting order status history:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get order status history" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await createOrderStatusHistory(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating order status history:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order status history" },
      { status: 500 }
    );
  }
} 