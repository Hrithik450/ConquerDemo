import { NextResponse } from "next/server";
import { ProductsService } from "@/actions/products/products.service";
import type { NewProduct } from "@/actions/products/products.types";

export async function POST(request: Request) {
  try {
    const data: NewProduct = await request.json();
    const product = await ProductsService.createProduct(data);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const categoryId = searchParams.get("categoryId");
    const brandId = searchParams.get("brandId");

    if (productId) {
      const product = await ProductsService.getProductById(productId);
      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(product);
    }

    if (categoryId) {
      const products = await ProductsService.getProductsByCategory(categoryId);
      return NextResponse.json(products);
    }

    if (brandId) {
      const products = await ProductsService.getProductsByBrand(brandId);
      return NextResponse.json(products);
    }

    const products = await ProductsService.listProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const product = await ProductsService.updateProduct(productId, data);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const response = await ProductsService.deleteProduct(productId);

    if (!response.success) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
