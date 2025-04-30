import { z } from "zod";
import { organizationEmployees } from "@/lib/db/schema";

// Type for the organizationEmployees table
export type OrganizationEmployee = typeof organizationEmployees.$inferSelect;
export type NewOrganizationEmployee = typeof organizationEmployees.$inferInsert;

// Zod schema for validation
export const organizationEmployeeSchema = z.object({
  organizationId: z.string().uuid(),
  userId: z.string().uuid(),
  employeeNumber: z.string().max(50).optional(),
  department: z.string().max(100).optional(),
  position: z.string().max(100).optional(),
  isActive: z.boolean().default(true),
});

// Response types for API
export type OrganizationEmployeeResponse = {
  success: boolean;
  data?: OrganizationEmployee;
  error?: string;
};

export type OrganizationEmployeesResponse = {
  success: boolean;
  data?: OrganizationEmployee[];
  error?: string;
};
