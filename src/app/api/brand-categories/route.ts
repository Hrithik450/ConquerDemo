import { NextResponse } from "next/server";
import { BrandCategoriesService } from "@/actions/brand-categories/brand-categories.service";
import { brandCategorySchema, BrandCategoryResponse, BrandCategoriesResponse } from "@/actions/brand-categories/brand-categories.types";
import { z } from "zod";

// POST /api/brand-categories - Create a new brand category
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = brandCategorySchema.parse(body);

    const brandCategory = await BrandCategoriesService.createBrandCategory(validatedData);
    const response: BrandCategoryResponse = {
      success: true,
      data: brandCategory
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to create brand category" },
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

    let response: BrandCategoriesResponse;
    if (brandId && categoryId) {
      const brandCategory = await BrandCategoriesService.getBrandCategoryByBrandAndCategory(
        brandId,
        categoryId
      );
      response = {
        success: true,
        data: [brandCategory]
      };
    } else if (brandId) {
      const brandCategories = await BrandCategoriesService.getBrandCategoriesByBrand(brandId);
      response = {
        success: true,
        data: brandCategories
      };
    } else if (categoryId) {
      const brandCategories = await BrandCategoriesService.getBrandCategoriesByCategory(categoryId);
      response = {
        success: true,
        data: brandCategories
      };
    } else {
      return NextResponse.json(
        { success: false, error: "Either brandId or categoryId must be provided" },
        { status: 400 }
      );
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch brand categories" },
      { status: 500 }
    );
  }
} 