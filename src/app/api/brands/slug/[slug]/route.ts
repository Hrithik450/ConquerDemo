import { NextResponse } from "next/server";
import { BrandsService } from "@/actions/brands/brands.service";

// GET /api/brands/slug/[slug] - Get a brand by slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const response = await BrandsService.getBrandBySlug(slug);

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