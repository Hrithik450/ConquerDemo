import { NextResponse } from "next/server";
import { BrandsService } from "@/actions/brands/brands.service";
import { brandSchema } from "@/actions/brands/brands.types";
import { z } from "zod";

// GET /api/brands/[brandId] - Get a specific brand
export async function GET(
  request: Request,
  { params }: { params: { brandId: string } }
) {
  try {
    const { brandId } = params;
    const response = await BrandsService.getBrandById(brandId);

    if (!response.success) {
      return NextResponse.json(response, { status: 404 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch brand" },
      { status: 500 }
    );
  }
}

// PUT /api/brands/[brandId] - Update a brand
export async function PUT(
  request: Request,
  { params }: { params: { brandId: string } }
) {
  try {
    const { brandId } = params;
    const body = await request.json();
    const validatedData = brandSchema.partial().parse(body);

    const response = await BrandsService.updateBrand(brandId, validatedData);

    if (!response.success) {
      return NextResponse.json(response, { status: 404 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to update brand" },
      { status: 500 }
    );
  }
}

// DELETE /api/brands/[brandId] - Delete a brand
export async function DELETE(
  request: Request,
  { params }: { params: { brandId: string } }
) {
  try {
    const { brandId } = params;
    const response = await BrandsService.deleteBrand(brandId);

    if (!response.success) {
      return NextResponse.json(response, { status: 404 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete brand" },
      { status: 500 }
    );
  }
} 