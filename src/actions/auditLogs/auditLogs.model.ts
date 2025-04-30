import { db } from "@/lib/db";
import { auditLogs } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import type { AuditLog, NewAuditLog } from "./auditLogs.types";

export class AuditLogsModel {
  static async createAuditLog(data: NewAuditLog): Promise<AuditLog> {
    const [log] = await db.insert(auditLogs).values(data).returning();
    return log;
  }

  static async getAuditLogById(logId: string): Promise<AuditLog | null> {
    const [log] = await db
      .select()
      .from(auditLogs)
      .where(eq(auditLogs.logId, logId));
    return log || null;
  }

  static async getAuditLogsByUserId(userId: string): Promise<AuditLog[]> {
    return await db
      .select()
      .from(auditLogs)
      .where(eq(auditLogs.userId, userId))
      .orderBy(auditLogs.createdAt);
  }

  static async getAuditLogsByEntity(
    entityType: string,
    entityId: string
  ): Promise<AuditLog[]> {
    return await db
      .select()
      .from(auditLogs)
      .where(
        and(
          eq(auditLogs.entityType, entityType),
          eq(auditLogs.entityId, entityId)
        )
      )
      .orderBy(auditLogs.createdAt);
  }

  static async getAuditLogsByAction(action: string): Promise<AuditLog[]> {
    return await db
      .select()
      .from(auditLogs)
      .where(eq(auditLogs.action, action))
      .orderBy(auditLogs.createdAt);
  }

  static async getAuditLogsByEntityType(entityType: string): Promise<AuditLog[]> {
    return await db
      .select()
      .from(auditLogs)
      .where(eq(auditLogs.entityType, entityType))
      .orderBy(auditLogs.createdAt);
  }

  static async listAuditLogs(): Promise<AuditLog[]> {
    return await db
      .select()
      .from(auditLogs)
      .orderBy(auditLogs.createdAt);
  }
}
