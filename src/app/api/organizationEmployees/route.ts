import { NextRequest, NextResponse } from "next/server";
import { OrganizationEmployeesService } from "@/actions/organizationEmployees/organizationEmployees.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const organizationId = searchParams.get("organizationId");
    const activeOnly = searchParams.get("activeOnly") === "true";

    if (id) {
      const employee = await OrganizationEmployeesService.getEmployeeById(id);
      return NextResponse.json(employee);
    }

    if (organizationId) {
      const employees = await OrganizationEmployeesService.listEmployeesByOrganization(
        organizationId,
        activeOnly
      );
      return NextResponse.json(employees);
    }

    return NextResponse.json(
      { success: false, error: "Missing required parameters" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error getting organization employees:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get organization employees" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await OrganizationEmployeesService.createEmployee(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating organization employee:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create organization employee" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing employee ID" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const result = await OrganizationEmployeesService.updateEmployee(id, data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating organization employee:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update organization employee" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing employee ID" },
        { status: 400 }
      );
    }

    const result = await OrganizationEmployeesService.deleteEmployee(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting organization employee:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete organization employee" },
      { status: 500 }
    );
  }
} 