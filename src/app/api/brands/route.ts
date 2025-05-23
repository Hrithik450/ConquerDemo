import { NextResponse } from "next/server";
import { BrandsService } from "@/actions/brands/brands.service";
import type { Brand } from "@/actions/brands/brands.types";

// POST /api/brands - Create a new brand
export async function POST(request: Request) {
  try {
    const data: Partial<Brand> = await request.json();
    const response = await BrandsService.createBrand(data);
    
    if (!response.success) {
      return NextResponse.json(
        { error: response.error },
        { status: 400 }
      );
    }
    
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create brand" },
      { status: 500 }
    );
  }
}

// GET /api/brands - List brands
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get("brandId");
    const slug = searchParams.get("slug");
    const searchTerm = searchParams.get("search");

    if (brandId) {
      const response = await BrandsService.getBrandById(brandId);
      if (!response.success) {
        return NextResponse.json(
          { error: response.error },
          { status: 404 }
        );
      }
      return NextResponse.json(response.data);
    }

    if (slug) {
      const response = await BrandsService.getBrandBySlug(slug);
      if (!response.success) {
        return NextResponse.json(
          { error: response.error },
          { status: 404 }
        );
      }
      return NextResponse.json(response.data);
    }

    if (searchTerm) {
      const response = await BrandsService.searchBrands(searchTerm);
      if (!response.success) {
        return NextResponse.json(
          { error: response.error },
          { status: 500 }
        );
      }
      return NextResponse.json(response.data);
    }

    const response = await BrandsService.listBrands();
    if (!response.success) {
      return NextResponse.json(
        { error: response.error },
        { status: 500 }
      );
    }
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch brands" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get("brandId");

    if (!brandId) {
      return NextResponse.json(
        { error: "Brand ID is required" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const response = await BrandsService.updateBrand(brandId, data);

    if (!response.success) {
      return NextResponse.json(
        { error: response.error },
        { status: 404 }
      );
    }

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update brand" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get("brandId");

    if (!brandId) {
      return NextResponse.json(
        { error: "Brand ID is required" },
        { status: 400 }
      );
    }

    const response = await BrandsService.deleteBrand(brandId);

    if (!response.success) {
      return NextResponse.json(
        { error: response.error },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete brand" },
      { status: 500 }
    );
  }
} 