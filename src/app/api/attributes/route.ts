import { NextResponse } from "next/server";
import { AttributesService } from "@/actions/attributes/attributes.service";
import type { Attribute } from "@/actions/attributes/attributes.types";

export async function POST(request: Request) {
  try {
    const data: Partial<Attribute> = await request.json();
    const response = await AttributesService.createAttribute(data);
    
    if (!response.success) {
      return NextResponse.json(
        { error: response.error },
        { status: 400 }
      );
    }
    
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create attribute" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const attributeId = searchParams.get("attributeId");

    if (attributeId) {
      const response = await AttributesService.getAttributeById(attributeId);
      if (!response.success) {
        return NextResponse.json(
          { error: response.error },
          { status: 404 }
        );
      }
      return NextResponse.json(response.data);
    }

    const response = await AttributesService.listAttributes();
    if (!response.success) {
      return NextResponse.json(
        { error: response.error },
        { status: 500 }
      );
    }
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch attributes" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const attributeId = searchParams.get("attributeId");

    if (!attributeId) {
      return NextResponse.json(
        { error: "Attribute ID is required" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const response = await AttributesService.updateAttribute(attributeId, data);

    if (!response.success) {
      return NextResponse.json(
        { error: response.error },
        { status: 404 }
      );
    }

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update attribute" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const attributeId = searchParams.get("attributeId");

    if (!attributeId) {
      return NextResponse.json(
        { error: "Attribute ID is required" },
        { status: 400 }
      );
    }

    const response = await AttributesService.deleteAttribute(attributeId);

    if (!response.success) {
      return NextResponse.json(
        { error: response.error },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete attribute" },
      { status: 500 }
    );
  }
} 