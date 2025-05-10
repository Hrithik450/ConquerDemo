import { NextRequest, NextResponse } from "next/server";
import {
  getAuditLogsByAction,
  listAuditLogs,
} from "@/actions/auditLogs/auditLogs.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    if (action) {
      const logs = await getAuditLogsByAction(action);
      return NextResponse.json(logs);
    }

    const logs = await listAuditLogs();
    return NextResponse.json(logs);
  } catch (error) {
    console.error("Error getting audit logs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get audit logs" },
      { status: 500 }
    );
  }
}
