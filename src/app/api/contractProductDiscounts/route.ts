import { NextRequest, NextResponse } from "next/server";
import { ContractProductDiscountsService } from "@/actions/contractProductDiscounts/contractProductDiscounts.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contractId = searchParams.get("contractId");
    const productId = searchParams.get("productId");

    if (contractId && productId) {
      const discount = await ContractProductDiscountsService.getContractProductDiscount(contractId, productId);
      return NextResponse.json(discount);
    }

    if (contractId) {
      const discounts = await ContractProductDiscountsService.getDiscountsByContractId(contractId);
      return NextResponse.json(discounts);
    }

    if (productId) {
      const discounts = await ContractProductDiscountsService.getDiscountsByProductId(productId);
      return NextResponse.json(discounts);
    }

    const discounts = await ContractProductDiscountsService.listContractProductDiscounts();
    return NextResponse.json(discounts);
  } catch (error) {
    console.error("Error getting contract product discounts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get contract product discounts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await ContractProductDiscountsService.createContractProductDiscount(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating contract product discount:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create contract product discount" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contractId = searchParams.get("contractId");
    const productId = searchParams.get("productId");
    
    if (!contractId || !productId) {
      return NextResponse.json(
        { success: false, error: "Missing contractId or productId" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const result = await ContractProductDiscountsService.updateContractProductDiscount(contractId, productId, data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating contract product discount:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update contract product discount" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contractId = searchParams.get("contractId");
    const productId = searchParams.get("productId");
    
    if (!contractId || !productId) {
      return NextResponse.json(
        { success: false, error: "Missing contractId or productId" },
        { status: 400 }
      );
    }

    const result = await ContractProductDiscountsService.deleteContractProductDiscount(contractId, productId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting contract product discount:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete contract product discount" },
      { status: 500 }
    );
  }
} 