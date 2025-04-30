import { NextResponse } from "next/server";
import { ProductVariantsService } from "@/actions/productVariants/productVariants.service";
import type { ProductVariant } from "@/actions/productVariants/productVariants.types";

export async function POST(request: Request) {
  try {
    const data: Partial<ProductVariant> = await request.json();
    const response = await ProductVariantsService.createProductVariant(data);
    
    if (!response.success) {
      return NextResponse.json(
        { error: response.error },
        { status: 400 }
      );
    }
    
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product variant" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productVariantId = searchParams.get("productVariantId");
    const productId = searchParams.get("productId");

    if (productVariantId) {
      const response = await ProductVariantsService.getProductVariantById(productVariantId);
      if (!response.success) {
        return NextResponse.json(
          { error: response.error },
          { status: 404 }
        );
      }
      return NextResponse.json(response.data);
    }

    if (productId) {
      const response = await ProductVariantsService.getProductVariantsByProduct(productId);
      if (!response.success) {
        return NextResponse.json(
          { error: response.error },
          { status: 500 }
        );
      }
      return NextResponse.json(response.data);
    }

    const response = await ProductVariantsService.listProductVariants();
    if (!response.success) {
      return NextResponse.json(
        { error: response.error },
        { status: 500 }
      );
    }
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product variants" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productVariantId = searchParams.get("productVariantId");

    if (!productVariantId) {
      return NextResponse.json(
        { error: "Product Variant ID is required" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const response = await ProductVariantsService.updateProductVariant(productVariantId, data);

    if (!response.success) {
      return NextResponse.json(
        { error: response.error },
        { status: 404 }
      );
    }

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product variant" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productVariantId = searchParams.get("productVariantId");

    if (!productVariantId) {
      return NextResponse.json(
        { error: "Product Variant ID is required" },
        { status: 400 }
      );
    }

    const response = await ProductVariantsService.deleteProductVariant(productVariantId);

    if (!response.success) {
      return NextResponse.json(
        { error: response.error },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product variant" },
      { status: 500 }
    );
  }
} 