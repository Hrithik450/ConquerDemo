import { NextRequest, NextResponse } from "next/server";
import { BrandCategoriesService } from "@/actions/brandCategories/brandCategories.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get("brandId");
    const categoryId = searchParams.get("categoryId");

    if (brandId && categoryId) {
      const brandCategory = await BrandCategoriesService.getBrandCategory(brandId, categoryId);
      return NextResponse.json(brandCategory);
    }

    if (brandId) {
      const categories = await BrandCategoriesService.getCategoriesByBrandId(brandId);
      return NextResponse.json(categories);
    }

    if (categoryId) {
      const brands = await BrandCategoriesService.getBrandsByCategoryId(categoryId);
      return NextResponse.json(brands);
    }

    const brandCategories = await BrandCategoriesService.listBrandCategories();
    return NextResponse.json(brandCategories);
  } catch (error) {
    console.error("Error getting brand categories:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get brand categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await BrandCategoriesService.createBrandCategory(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating brand category:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create brand category" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get("brandId");
    const categoryId = searchParams.get("categoryId");

    if (!brandId || !categoryId) {
      return NextResponse.json(
        { success: false, error: "Missing brand ID or category ID" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const result = await BrandCategoriesService.updateBrandCategory(brandId, categoryId, data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating brand category:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update brand category" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get("brandId");
    const categoryId = searchParams.get("categoryId");

    if (!brandId || !categoryId) {
      return NextResponse.json(
        { success: false, error: "Missing brand ID or category ID" },
        { status: 400 }
      );
    }

    const result = await BrandCategoriesService.deleteBrandCategory(brandId, categoryId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting brand category:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete brand category" },
      { status: 500 }
    );
  }
} 