import { NextRequest, NextResponse } from "next/server";
import { CategoryAttributesService } from "@/actions/categoryAttributes/categoryAttributes.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const attributeId = searchParams.get("attributeId");

    if (categoryId && attributeId) {
      const categoryAttribute = await CategoryAttributesService.getCategoryAttribute(categoryId, attributeId);
      return NextResponse.json(categoryAttribute);
    }

    if (categoryId) {
      const categoryAttributes = await CategoryAttributesService.getAttributesByCategoryId(categoryId);
      return NextResponse.json(categoryAttributes);
    }

    if (attributeId) {
      const categoryAttributes = await CategoryAttributesService.getCategoriesByAttributeId(attributeId);
      return NextResponse.json(categoryAttributes);
    }

    const categoryAttributes = await CategoryAttributesService.listCategoryAttributes();
    return NextResponse.json(categoryAttributes);
  } catch (error) {
    console.error("Error getting category attributes:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get category attributes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await CategoryAttributesService.createCategoryAttribute(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating category attribute:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create category attribute" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const attributeId = searchParams.get("attributeId");
    
    if (!categoryId || !attributeId) {
      return NextResponse.json(
        { success: false, error: "Missing categoryId or attributeId" },
        { status: 400 }
      );
    }

    const result = await CategoryAttributesService.deleteCategoryAttribute(categoryId, attributeId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting category attribute:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete category attribute" },
      { status: 500 }
    );
  }
} 