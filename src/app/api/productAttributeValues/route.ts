import { NextRequest, NextResponse } from "next/server";
import { ProductAttributeValuesService } from "@/actions/productAttributeValues/productAttributeValues.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const productAttributeId = searchParams.get("productAttributeId");
    const attributeValueId = searchParams.get("attributeValueId");

    if (id) {
      const value = await ProductAttributeValuesService.getProductAttributeValueById(id);
      return NextResponse.json(value);
    }

    if (productAttributeId && attributeValueId) {
      const value = await ProductAttributeValuesService.getProductAttributeValue(
        productAttributeId,
        attributeValueId
      );
      return NextResponse.json(value);
    }

    if (productAttributeId) {
      const values = await ProductAttributeValuesService.getProductAttributeValuesByProductAttributeId(
        productAttributeId
      );
      return NextResponse.json(values);
    }

    if (attributeValueId) {
      const values = await ProductAttributeValuesService.getProductAttributeValuesByAttributeValueId(
        attributeValueId
      );
      return NextResponse.json(values);
    }

    return NextResponse.json(
      { success: false, error: "Missing required parameters" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error getting product attribute values:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get product attribute values" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await ProductAttributeValuesService.createProductAttributeValue(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating product attribute value:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product attribute value" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const productAttributeId = searchParams.get("productAttributeId");
    const attributeValueId = searchParams.get("attributeValueId");
    const deleteAll = searchParams.get("deleteAll") === "true";
    
    if (id) {
      const result = await ProductAttributeValuesService.deleteProductAttributeValue(id);
      return NextResponse.json(result);
    }

    if (productAttributeId && attributeValueId) {
      const result = await ProductAttributeValuesService.deleteProductAttributeValueByAttribute(
        productAttributeId,
        attributeValueId
      );
      return NextResponse.json(result);
    }

    if (productAttributeId && deleteAll) {
      const result = await ProductAttributeValuesService.deleteAllProductAttributeValues(
        productAttributeId
      );
      return NextResponse.json(result);
    }

    return NextResponse.json(
      { success: false, error: "Missing required parameters" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error deleting product attribute value:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete product attribute value" },
      { status: 500 }
    );
  }
} 