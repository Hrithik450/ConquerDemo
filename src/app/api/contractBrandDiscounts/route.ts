import { NextRequest, NextResponse } from "next/server";
import { ContractBrandDiscountsService } from "@/actions/contractBrandDiscounts/contractBrandDiscounts.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contractId = searchParams.get("contractId");
    const brandId = searchParams.get("brandId");

    if (contractId && brandId) {
      const discount = await ContractBrandDiscountsService.getContractBrandDiscount(contractId, brandId);
      return NextResponse.json(discount);
    }

    if (contractId) {
      const discounts = await ContractBrandDiscountsService.getDiscountsByContractId(contractId);
      return NextResponse.json(discounts);
    }

    if (brandId) {
      const discounts = await ContractBrandDiscountsService.getDiscountsByBrandId(brandId);
      return NextResponse.json(discounts);
    }

    const discounts = await ContractBrandDiscountsService.listContractBrandDiscounts();
    return NextResponse.json(discounts);
  } catch (error) {
    console.error("Error getting contract brand discounts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get contract brand discounts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await ContractBrandDiscountsService.createContractBrandDiscount(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating contract brand discount:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create contract brand discount" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contractId = searchParams.get("contractId");
    const brandId = searchParams.get("brandId");
    
    if (!contractId || !brandId) {
      return NextResponse.json(
        { success: false, error: "Missing contractId or brandId" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const result = await ContractBrandDiscountsService.updateContractBrandDiscount(contractId, brandId, data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating contract brand discount:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update contract brand discount" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contractId = searchParams.get("contractId");
    const brandId = searchParams.get("brandId");
    
    if (!contractId || !brandId) {
      return NextResponse.json(
        { success: false, error: "Missing contractId or brandId" },
        { status: 400 }
      );
    }

    const result = await ContractBrandDiscountsService.deleteContractBrandDiscount(contractId, brandId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting contract brand discount:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete contract brand discount" },
      { status: 500 }
    );
  }
} 