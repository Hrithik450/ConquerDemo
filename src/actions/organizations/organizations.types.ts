import { z } from "zod";
import { organizations } from "@/lib/db/schema";

// Type for the organizations table
export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;

// Zod schema for validation
export const organizationSchema = z.object({
  name: z.string().min(1).max(255),
  taxId: z.string().max(50).optional(),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  address: z.string().optional(),
  isActive: z.boolean().default(true),
  contractStartDate: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  contractEndDate: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
});

// Response types for API
export type OrganizationResponse = {
  success: boolean;
  data?: Organization;
  error?: string;
};

export type OrganizationsResponse = {
  success: boolean;
  data?: Organization[];
  error?: string;
};
