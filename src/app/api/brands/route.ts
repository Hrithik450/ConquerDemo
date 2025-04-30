import { NextResponse } from "next/server";
import { BrandsService } from "@/actions/brands/brands.service";
import { brandSchema } from "@/actions/brands/brands.types";
import { z } from "zod";

// POST /api/brands - Create a new brand
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = brandSchema.parse(body);

    const response = await BrandsService.createBrand(validatedData);

    if (!response.success) {
      return NextResponse.json(response, { status: 400 });
    }

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to create brand" },
      { status: 500 }
    );
  }
}

// GET /api/brands - List brands
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("search");

    let response;
    if (searchTerm) {
      response = await BrandsService.searchBrands(searchTerm);
    } else {
      response = await BrandsService.listBrands();
    }

    if (!response.success) {
      return NextResponse.json(response, { status: 400 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch brands" },
      { status: 500 }
    );
  }
} 