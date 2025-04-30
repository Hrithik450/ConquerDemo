import { NextResponse } from "next/server";
import { BrandCategoriesService } from "@/actions/brand-categories/brand-categories.service";
import type { NewBrandCategory } from "@/actions/brand-categories/brand-categories.types";

// POST /api/brand-categories - Create a new brand category
export async function POST(request: Request) {
  try {
    const data: NewBrandCategory = await request.json();
    const brandCategory = await BrandCategoriesService.createBrandCategory(data);
    return NextResponse.json(brandCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create brand category" },
      { status: 500 }
    );
  }
}

// GET /api/brand-categories - List brand categories
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get("brandId");
    const categoryId = searchParams.get("categoryId");

    if (brandId && categoryId) {
      const brandCategory = await BrandCategoriesService.getBrandCategoryByBrandAndCategory(
        brandId,
        categoryId
      );
      return NextResponse.json(brandCategory);
    }

    if (brandId) {
      const brandCategories = await BrandCategoriesService.getBrandCategoriesByBrand(
        brandId
      );
      return NextResponse.json(brandCategories);
    }

    if (categoryId) {
      const brandCategories = await BrandCategoriesService.getBrandCategoriesByCategory(
        categoryId
      );
      return NextResponse.json(brandCategories);
    }

    const brandCategories = await BrandCategoriesService.listBrandCategories();
    return NextResponse.json(brandCategories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch brand categories" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get("brandId");
    const categoryId = searchParams.get("categoryId");

    if (!brandId || !categoryId) {
      return NextResponse.json(
        { error: "Brand ID and Category ID are required" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const brandCategory = await BrandCategoriesService.updateBrandCategory(
      brandId,
      categoryId,
      data
    );

    if (!brandCategory) {
      return NextResponse.json(
        { error: "Brand category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(brandCategory);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update brand category" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get("brandId");
    const categoryId = searchParams.get("categoryId");

    if (!brandId || !categoryId) {
      return NextResponse.json(
        { error: "Brand ID and Category ID are required" },
        { status: 400 }
      );
    }

    const success = await BrandCategoriesService.deleteBrandCategory(
      brandId,
      categoryId
    );

    if (!success) {
      return NextResponse.json(
        { error: "Brand category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete brand category" },
      { status: 500 }
    );
  }
} 