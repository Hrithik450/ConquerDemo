import { NextRequest, NextResponse } from "next/server";
import {
  createContractProductAttributeValueRestriction,
  getContractProductAttributeValueRestriction,
  getRestrictionsByContractId,
  getRestrictionsByProductId,
  getRestrictionsByAttributeId,
  updateContractProductAttributeValueRestriction,
  deleteContractProductAttributeValueRestriction,
  listContractProductAttributeValueRestrictions,
} from "@/actions/contractProductAttributeValueRestrictions/contractProductAttributeValueRestrictions.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contractId = searchParams.get("contractId");
    const productId = searchParams.get("productId");
    const attributeId = searchParams.get("attributeId");
    const attributeValueId = searchParams.get("attributeValueId");

    if (contractId && productId && attributeId && attributeValueId) {
      const restriction = await getContractProductAttributeValueRestriction(
        contractId,
        productId,
        attributeId,
        attributeValueId
      );
      return NextResponse.json(restriction);
    }

    if (contractId) {
      const restrictions = await getRestrictionsByContractId(contractId);
      return NextResponse.json(restrictions);
    }

    if (productId) {
      const restrictions = await getRestrictionsByProductId(productId);
      return NextResponse.json(restrictions);
    }

    if (attributeId) {
      const restrictions = await getRestrictionsByAttributeId(attributeId);
      return NextResponse.json(restrictions);
    }

    const restrictions = await listContractProductAttributeValueRestrictions();
    return NextResponse.json(restrictions);
  } catch (error) {
    console.error("Error getting contract product attribute value restrictions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get restrictions" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await createContractProductAttributeValueRestriction(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating contract product attribute value restriction:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create restriction" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contractId = searchParams.get("contractId");
    const productId = searchParams.get("productId");
    const attributeId = searchParams.get("attributeId");
    const attributeValueId = searchParams.get("attributeValueId");
    
    if (!contractId || !productId || !attributeId || !attributeValueId) {
      return NextResponse.json(
        { success: false, error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const result = await updateContractProductAttributeValueRestriction(
      contractId,
      productId,
      attributeId,
      attributeValueId,
      data
    );
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating contract product attribute value restriction:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update restriction" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contractId = searchParams.get("contractId");
    const productId = searchParams.get("productId");
    const attributeId = searchParams.get("attributeId");
    const attributeValueId = searchParams.get("attributeValueId");
    
    if (!contractId || !productId || !attributeId || !attributeValueId) {
      return NextResponse.json(
        { success: false, error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const result = await deleteContractProductAttributeValueRestriction(
      contractId,
      productId,
      attributeId,
      attributeValueId
    );
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting contract product attribute value restriction:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete restriction" },
      { status: 500 }
    );
  }
} 