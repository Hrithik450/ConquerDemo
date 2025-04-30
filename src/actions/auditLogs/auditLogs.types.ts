import { z } from "zod";
import { auditLogs } from "@/lib/db/schema";

// Type for the auditLogs table
export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;

// Zod schema for validation
export const auditLogSchema = z.object({
  action: z.string().min(1),
  entityType: z.string().min(1),
  entityId: z.string().uuid().optional(),
  userId: z.string().uuid(),
  oldValues: z.record(z.any()).optional(),
  newValues: z.record(z.any()).optional(),
  ipAddress: z.string().ip().optional(),
});

// Response types for API
export type AuditLogResponse = {
  success: boolean;
  data?: AuditLog;
  error?: string;
};

export type AuditLogsResponse = {
  success: boolean;
  data?: AuditLog[];
  error?: string;
};
