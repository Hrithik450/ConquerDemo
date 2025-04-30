import { NextResponse } from "next/server";
import { AttributeValuesService } from "@/actions/attributeValues/attributeValues.service";
import type { AttributeValue } from "@/actions/attributeValues/attributeValues.types";

export async function POST(request: Request) {
  try {
    const data: Partial<AttributeValue> = await request.json();
    const response = await AttributeValuesService.createAttributeValue(data);
    
    if (!response.success) {
      return NextResponse.json(
        { error: response.error },
        { status: 400 }
      );
    }
    
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create attribute value" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const attributeValueId = searchParams.get("attributeValueId");
    const attributeId = searchParams.get("attributeId");

    if (attributeValueId) {
      const response = await AttributeValuesService.getAttributeValueById(attributeValueId);
      if (!response.success) {
        return NextResponse.json(
          { error: response.error },
          { status: 404 }
        );
      }
      return NextResponse.json(response.data);
    }

    if (attributeId) {
      const response = await AttributeValuesService.getAttributeValuesByAttributeId(attributeId);
      if (!response.success) {
        return NextResponse.json(
          { error: response.error },
          { status: 500 }
        );
      }
      return NextResponse.json(response.data);
    }

    const response = await AttributeValuesService.listAttributeValues();
    if (!response.success) {
      return NextResponse.json(
        { error: response.error },
        { status: 500 }
      );
    }
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch attribute values" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const attributeValueId = searchParams.get("attributeValueId");

    if (!attributeValueId) {
      return NextResponse.json(
        { error: "Attribute Value ID is required" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const response = await AttributeValuesService.updateAttributeValue(attributeValueId, data);

    if (!response.success) {
      return NextResponse.json(
        { error: response.error },
        { status: 404 }
      );
    }

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update attribute value" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const attributeValueId = searchParams.get("attributeValueId");

    if (!attributeValueId) {
      return NextResponse.json(
        { error: "Attribute Value ID is required" },
        { status: 400 }
      );
    }

    const response = await AttributeValuesService.deleteAttributeValue(attributeValueId);

    if (!response.success) {
      return NextResponse.json(
        { error: response.error },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete attribute value" },
      { status: 500 }
    );
  }
} 