import { NextResponse } from "next/server";
import { CategoriesService } from "@/actions/categories/categories.service";

// GET /api/categories/slug/[slug] - Get a category by slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const response = await CategoriesService.getCategoryBySlug(slug);

    if (!response.success) {
      return NextResponse.json(response, { status: 404 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch category" },
      { status: 500 }
    );
  }
} 