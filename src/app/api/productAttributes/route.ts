import { NextResponse } from "next/server";
import { ProductAttributesService } from "@/actions/productAttributes/productAttributes.service";
import type { ProductAttribute } from "@/actions/productAttributes/productAttributes.types";

export async function POST(request: Request) {
  try {
    const data: Partial<ProductAttribute> = await request.json();
    const response = await ProductAttributesService.createProductAttribute(
      data
    );

    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 400 });
    }

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product attribute" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productAttributeId = searchParams.get("productAttributeId");
    const productId = searchParams.get("productId");
    const attributeId = searchParams.get("attributeId");

    if (productAttributeId) {
      const response = await ProductAttributesService.getProductAttributeById(
        productAttributeId
      );
      if (!response.success) {
        return NextResponse.json({ error: response.error }, { status: 404 });
      }
      return NextResponse.json(response.data);
    }

    if (productId) {
      const response =
        await ProductAttributesService.getProductAttributesByProduct(productId);
      if (!response.success) {
        return NextResponse.json({ error: response.error }, { status: 500 });
      }
      return NextResponse.json(response.data);
    }

    if (attributeId) {
      const response =
        await ProductAttributesService.getProductAttributesByAttribute(
          attributeId
        );
      if (!response.success) {
        return NextResponse.json({ error: response.error }, { status: 500 });
      }
      return NextResponse.json(response.data);
    }

    const response = await ProductAttributesService.listProductAttributes();
    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 500 });
    }
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product attributes" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productAttributeId = searchParams.get("productAttributeId");

    if (!productAttributeId) {
      return NextResponse.json(
        { error: "Product Attribute ID is required" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const response = await ProductAttributesService.updateProductAttribute(
      productAttributeId,
      data
    );

    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 404 });
    }

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product attribute" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productAttributeId = searchParams.get("productAttributeId");

    if (!productAttributeId) {
      return NextResponse.json(
        { error: "Product Attribute ID is required" },
        { status: 400 }
      );
    }

    const response = await ProductAttributesService.deleteProductAttribute(
      productAttributeId
    );

    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product attribute" },
      { status: 500 }
    );
  }
}
