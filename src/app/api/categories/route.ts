import { NextResponse } from "next/server";
import { CategoriesService } from "@/actions/categories/categories.service";
import type { Category } from "@/actions/categories/categories.types";

// POST /api/categories - Create a new category
export async function POST(request: Request) {
  try {
    const data: Partial<Category> = await request.json();
    const response = await CategoriesService.createCategory(data);

    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 400 });
    }

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}

// GET /api/categories - List categories
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const slug = searchParams.get("slug");
    const searchTerm = searchParams.get("search");
    const activeOnly = searchParams.get("activeOnly") === "true";

    if (categoryId) {
      const response = await CategoriesService.getCategoryById(categoryId);
      if (!response.success) {
        return NextResponse.json({ error: response.error }, { status: 404 });
      }
      return NextResponse.json(response.data);
    }

    if (slug) {
      const response = await CategoriesService.getCategoryBySlug(slug);
      if (!response.success) {
        return NextResponse.json({ error: response.error }, { status: 404 });
      }
      return NextResponse.json(response.data);
    }

    if (searchTerm) {
      const response = await CategoriesService.searchCategories(
        searchTerm,
        activeOnly
      );
      if (!response.success) {
        return NextResponse.json({ error: response.error }, { status: 500 });
      }
      return NextResponse.json(response.data);
    }

    const response = await CategoriesService.listCategories();
    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 500 });
    }
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    if (!categoryId) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const response = await CategoriesService.updateCategory(categoryId, data);

    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 404 });
    }

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    if (!categoryId) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    const response = await CategoriesService.deleteCategory(categoryId);

    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
