import { NextResponse } from "next/server";
import { ProductVariantAttributeService } from "@/actions/productVariantAttributes/productVariantAttributes.service";
import type { CreateProductVariantAttributeInput, UpdateProductVariantAttributeInput } from "@/actions/productVariantAttributes/productVariantAttributes.types";

export async function POST(request: Request) {
  try {
    const data: CreateProductVariantAttributeInput = await request.json();
    const response = await ProductVariantAttributeService.createProductVariantAttribute(data);
    
    if (!response.success) {
      return NextResponse.json(
        { error: response.error },
        { status: 400 }
      );
    }
    
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product variant attribute" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productVariantAttributeId = searchParams.get("productVariantAttributeId");
    const productVariantId = searchParams.get("productVariantId");

    if (productVariantAttributeId) {
      const response = await ProductVariantAttributeService.getProductVariantAttribute(productVariantAttributeId);
      if (!response.success) {
        return NextResponse.json(
          { error: response.error },
          { status: 404 }
        );
      }
      return NextResponse.json(response.data);
    }

    if (productVariantId) {
      const response = await ProductVariantAttributeService.getProductVariantAttributesByVariantId(productVariantId);
      if (!response.success) {
        return NextResponse.json(
          { error: response.error },
          { status: 500 }
        );
      }
      return NextResponse.json(response.data);
    }

    return NextResponse.json(
      { error: "Product variant attribute ID or product variant ID is required" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product variant attributes" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productVariantAttributeId = searchParams.get("productVariantAttributeId");

    if (!productVariantAttributeId) {
      return NextResponse.json(
        { error: "Product variant attribute ID is required" },
        { status: 400 }
      );
    }

    const data: UpdateProductVariantAttributeInput = await request.json();
    const response = await ProductVariantAttributeService.updateProductVariantAttribute(productVariantAttributeId, data);

    if (!response.success) {
      return NextResponse.json(
        { error: response.error },
        { status: 404 }
      );
    }

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product variant attribute" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productVariantAttributeId = searchParams.get("productVariantAttributeId");

    if (!productVariantAttributeId) {
      return NextResponse.json(
        { error: "Product variant attribute ID is required" },
        { status: 400 }
      );
    }

    const response = await ProductVariantAttributeService.deleteProductVariantAttribute(productVariantAttributeId);

    if (!response.success) {
      return NextResponse.json(
        { error: response.error },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product variant attribute" },
      { status: 500 }
    );
  }
} 