import { NextRequest, NextResponse } from "next/server";
import { PriceHistoryService } from "@/actions/priceHistory/priceHistory.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const variantId = searchParams.get("variantId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (id) {
      const history = await PriceHistoryService.getPriceHistoryById(id);
      return NextResponse.json(history);
    }

    if (variantId) {
      if (startDate && endDate) {
        const history = await PriceHistoryService.getPriceHistoryByDateRange(
          variantId,
          new Date(startDate),
          new Date(endDate)
        );
        return NextResponse.json(history);
      }

      const history = await PriceHistoryService.getPriceHistoryByVariantId(variantId);
      return NextResponse.json(history);
    }

    return NextResponse.json(
      { success: false, error: "Missing required parameters" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error getting price history:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get price history" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await PriceHistoryService.createPriceHistory(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating price history:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create price history" },
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
        { success: false, error: "Missing price history ID" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const result = await PriceHistoryService.updatePriceHistory(id, data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating price history:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update price history" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const variantId = searchParams.get("variantId");

    if (id) {
      const result = await PriceHistoryService.deletePriceHistory(id);
      return NextResponse.json(result);
    }

    if (variantId) {
      const result = await PriceHistoryService.deletePriceHistoryByVariantId(variantId);
      return NextResponse.json(result);
    }

    return NextResponse.json(
      { success: false, error: "Missing required parameters" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error deleting price history:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete price history" },
      { status: 500 }
    );
  }
} 