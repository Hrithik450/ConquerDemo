import { NextResponse } from "next/server";
import { CategoriesService } from "@/actions/categories/categories.service";
import { categorySchema } from "@/actions/categories/categories.types";
import { z } from "zod";

// POST /api/categories - Create a new category
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = categorySchema.parse(body);

    const response = await CategoriesService.createCategory(validatedData);

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
      { success: false, error: "Failed to create category" },
      { status: 500 }
    );
  }
}

// GET /api/categories - List categories
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("search");
    const activeOnly = searchParams.get("activeOnly") === "true";

    let response;
    if (searchTerm) {
      response = await CategoriesService.searchCategories(searchTerm, activeOnly);
    } else {
      response = await CategoriesService.listCategories(activeOnly);
    }

    if (!response.success) {
      return NextResponse.json(response, { status: 400 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
} 