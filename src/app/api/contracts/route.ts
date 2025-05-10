import { NextRequest, NextResponse } from "next/server";
import { ContractsService } from "@/actions/contracts/contracts.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const organizationId = searchParams.get("organizationId");
    const activeOnly = searchParams.get("activeOnly") === "true";

    if (id) {
      const contract = await ContractsService.getContractById(id);
      return NextResponse.json(contract);
    }

    if (organizationId) {
      const contracts = await ContractsService.listContractsByOrganization(
        organizationId,
        activeOnly
      );
      return NextResponse.json(contracts);
    }

    return NextResponse.json(
      { success: false, error: "Missing required parameters" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error getting contracts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get contracts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await ContractsService.createContract(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating contract:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create contract" },
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
        { success: false, error: "Missing contract ID" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const result = await ContractsService.updateContract(id, data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating contract:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update contract" },
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
        { success: false, error: "Missing contract ID" },
        { status: 400 }
      );
    }

    const result = await ContractsService.deleteContract(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting contract:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete contract" },
      { status: 500 }
    );
  }
}
