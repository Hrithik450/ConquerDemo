import { NextRequest, NextResponse } from "next/server";
import { ContractCategoryDiscountsService } from "@/actions/contractCategoryDiscounts/contractCategoryDiscounts.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contractId = searchParams.get("contractId");
    const categoryId = searchParams.get("categoryId");

    if (contractId && categoryId) {
      const discount = await ContractCategoryDiscountsService.getContractCategoryDiscount(contractId, categoryId);
      return NextResponse.json(discount);
    }

    if (contractId) {
      const discounts = await ContractCategoryDiscountsService.getDiscountsByContractId(contractId);
      return NextResponse.json(discounts);
    }

    if (categoryId) {
      const discounts = await ContractCategoryDiscountsService.getDiscountsByCategoryId(categoryId);
      return NextResponse.json(discounts);
    }

    const discounts = await ContractCategoryDiscountsService.listContractCategoryDiscounts();
    return NextResponse.json(discounts);
  } catch (error) {
    console.error("Error getting contract category discounts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get contract category discounts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await ContractCategoryDiscountsService.createContractCategoryDiscount(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating contract category discount:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create contract category discount" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contractId = searchParams.get("contractId");
    const categoryId = searchParams.get("categoryId");
    
    if (!contractId || !categoryId) {
      return NextResponse.json(
        { success: false, error: "Missing contractId or categoryId" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const result = await ContractCategoryDiscountsService.updateContractCategoryDiscount(contractId, categoryId, data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating contract category discount:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update contract category discount" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contractId = searchParams.get("contractId");
    const categoryId = searchParams.get("categoryId");
    
    if (!contractId || !categoryId) {
      return NextResponse.json(
        { success: false, error: "Missing contractId or categoryId" },
        { status: 400 }
      );
    }

    const result = await ContractCategoryDiscountsService.deleteContractCategoryDiscount(contractId, categoryId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting contract category discount:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete contract category discount" },
      { status: 500 }
    );
  }
} 