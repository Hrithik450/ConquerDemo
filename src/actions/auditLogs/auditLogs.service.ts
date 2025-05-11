import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { AuditLogsModel } from "./auditLogs.model";
import { auditLogSchema } from "./auditLogs.types";
import type { AuditLogResponse, AuditLogsResponse } from "./auditLogs.types";

export async function createAuditLog(data: unknown): Promise<AuditLogResponse> {
  try {
    // const session = await auth();
    // if (!session?.user) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const validatedData = auditLogSchema.parse(data);
    const log = await AuditLogsModel.createAuditLog(validatedData);
    revalidatePath("/audit-logs");
    return { success: true, data: log };
  } catch (error) {
    console.error("Error creating audit log:", error);
    return { success: false, error: "Failed to create audit log" };
  }
}

export async function getAuditLogById(
  logId: string
): Promise<AuditLogResponse> {
  try {
    // const session = await auth();
    // if (!session?.user) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const log = await AuditLogsModel.getAuditLogById(logId);
    if (!log) {
      return { success: false, error: "Audit log not found" };
    }
    return { success: true, data: log };
  } catch (error) {
    console.error("Error getting audit log:", error);
    return { success: false, error: "Failed to get audit log" };
  }
}

export async function getAuditLogsByUserId(
  userId: string
): Promise<AuditLogsResponse> {
  try {
    // const session = await auth();
    // if (!session?.user) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const logs = await AuditLogsModel.getAuditLogsByUserId(userId);
    return { success: true, data: logs };
  } catch (error) {
    console.error("Error getting audit logs by user:", error);
    return { success: false, error: "Failed to get audit logs" };
  }
}

export async function getAuditLogsByEntity(
  entityType: string,
  entityId: string
): Promise<AuditLogsResponse> {
  try {
    // const session = await auth();
    // if (!session?.user) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const logs = await AuditLogsModel.getAuditLogsByEntity(
      entityType,
      entityId
    );
    return { success: true, data: logs };
  } catch (error) {
    console.error("Error getting audit logs by entity:", error);
    return { success: false, error: "Failed to get audit logs" };
  }
}

export async function getAuditLogsByAction(
  action: string
): Promise<AuditLogsResponse> {
  try {
    // const session = await auth();
    // if (!session?.user) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const logs = await AuditLogsModel.getAuditLogsByAction(action);
    return { success: true, data: logs };
  } catch (error) {
    console.error("Error getting audit logs by action:", error);
    return { success: false, error: "Failed to get audit logs" };
  }
}

export async function getAuditLogsByEntityType(
  entityType: string
): Promise<AuditLogsResponse> {
  try {
    // const session = await auth();
    // if (!session?.user) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const logs = await AuditLogsModel.getAuditLogsByEntityType(entityType);
    return { success: true, data: logs };
  } catch (error) {
    console.error("Error getting audit logs by entity type:", error);
    return { success: false, error: "Failed to get audit logs" };
  }
}

export async function listAuditLogs(): Promise<AuditLogsResponse> {
  try {
    // const session = await auth();
    // if (!session?.user) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const logs = await AuditLogsModel.listAuditLogs();
    return { success: true, data: logs };
  } catch (error) {
    console.error("Error listing audit logs:", error);
    return { success: false, error: "Failed to list audit logs" };
  }
}
