import { NextRequest, NextResponse } from "next/server";
import { ProductVariantAttributeValuesService } from "@/actions/productVariantAttributeValues/productVariantAttributeValues.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const variantId = searchParams.get("variantId");
    const attributeValueId = searchParams.get("attributeValueId");

    if (variantId && attributeValueId) {
      const value = await ProductVariantAttributeValuesService.getProductVariantAttributeValue(
        variantId,
        attributeValueId
      );
      return NextResponse.json(value);
    }

    if (variantId) {
      const values = await ProductVariantAttributeValuesService.getProductVariantAttributeValuesByVariantId(
        variantId
      );
      return NextResponse.json(values);
    }

    if (attributeValueId) {
      const values = await ProductVariantAttributeValuesService.getProductVariantAttributeValuesByAttributeValueId(
        attributeValueId
      );
      return NextResponse.json(values);
    }

    return NextResponse.json(
      { success: false, error: "Missing required parameters" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error getting product variant attribute values:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get product variant attribute values" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await ProductVariantAttributeValuesService.createProductVariantAttributeValue(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating product variant attribute value:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product variant attribute value" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const variantId = searchParams.get("variantId");
    const attributeValueId = searchParams.get("attributeValueId");

    if (!variantId) {
      return NextResponse.json(
        { success: false, error: "Missing variant ID" },
        { status: 400 }
      );
    }

    if (attributeValueId) {
      const result = await ProductVariantAttributeValuesService.deleteProductVariantAttributeValue(
        variantId,
        attributeValueId
      );
      return NextResponse.json(result);
    }

    const result = await ProductVariantAttributeValuesService.deleteAllProductVariantAttributeValues(
      variantId
    );
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting product variant attribute value:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete product variant attribute value" },
      { status: 500 }
    );
  }
} 