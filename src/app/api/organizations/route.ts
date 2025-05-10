import { NextResponse } from "next/server";
import { OrganizationsService } from "@/actions/organizations/organizations.service";
import type { Organization } from "@/actions/organizations/organizations.types";

export async function POST(request: Request) {
  try {
    const data: Partial<Organization> = await request.json();
    const response = await OrganizationsService.createOrganization(data);

    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 400 });
    }

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create organization" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get("organizationId");

    if (organizationId) {
      const response = await OrganizationsService.getOrganizationById(
        organizationId
      );
      if (!response.success) {
        return NextResponse.json({ error: response.error }, { status: 404 });
      }
      return NextResponse.json(response.data);
    }

    const response = await OrganizationsService.listOrganizations();
    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 500 });
    }
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch organizations" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get("organizationId");

    if (!organizationId) {
      return NextResponse.json(
        { error: "Organization ID is required" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const response = await OrganizationsService.updateOrganization(
      organizationId,
      data
    );

    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 404 });
    }

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update organization" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get("organizationId");

    if (!organizationId) {
      return NextResponse.json(
        { error: "Organization ID is required" },
        { status: 400 }
      );
    }

    const response = await OrganizationsService.deleteOrganization(
      organizationId
    );

    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete organization" },
      { status: 500 }
    );
  }
}
