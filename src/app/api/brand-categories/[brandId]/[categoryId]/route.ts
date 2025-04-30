import { NextResponse } from "next/server";
import { BrandCategoriesService } from "@/actions/brand-categories/brand-categories.service";
import { brandCategorySchema, BrandCategoryResponse } from "@/actions/brand-categories/brand-categories.types";
import { z } from "zod";

// GET /api/brand-categories/[brandId]/[categoryId] - Get a specific brand category
export async function GET(
  request: Request,
  { params }: { params: { brandId: string; categoryId: string } }
) {
  try {
    const { brandId, categoryId } = params;
    const data = await BrandCategoriesService.getBrandCategoryByBrandAndCategory(
      brandId,
      categoryId
    );

    const response: BrandCategoryResponse = {
      success: true,
      data
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const response: BrandCategoryResponse = {
      success: false,
      error: "Failed to fetch brand category"
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// PUT /api/brand-categories/[brandId]/[categoryId] - Update a brand category
export async function PUT(
  request: Request,
  { params }: { params: { brandId: string; categoryId: string } }
) {
  try {
    const { brandId, categoryId } = params;
    const body = await request.json();
    const validatedData = brandCategorySchema.partial().parse(body);

    const data = await BrandCategoriesService.updateBrandCategory(
      brandId,
      categoryId,
      validatedData
    );

    const response: BrandCategoryResponse = {
      success: true,
      data
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response: BrandCategoryResponse = {
        success: false,
        error: "Validation error",
        message: error.errors.map(e => e.message).join(", ")
      };
      return NextResponse.json(response, { status: 400 });
    }
    const response: BrandCategoryResponse = {
      success: false,
      error: "Failed to update brand category"
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// DELETE /api/brand-categories/[brandId]/[categoryId] - Delete a brand category
export async function DELETE(
  request: Request,
  { params }: { params: { brandId: string; categoryId: string } }
) {
  try {
    const { brandId, categoryId } = params;
    await BrandCategoriesService.deleteBrandCategory(brandId, categoryId);

    const response: BrandCategoryResponse = {
      success: true,
      message: "Brand category deleted successfully"
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const response: BrandCategoryResponse = {
      success: false,
      error: "Failed to delete brand category"
    };
    return NextResponse.json(response, { status: 500 });
  }
} 