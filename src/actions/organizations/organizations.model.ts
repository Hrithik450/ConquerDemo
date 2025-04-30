import { db } from "@/lib/db";
import { organizations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { NewOrganization, Organization } from "./organizations.types";

export class OrganizationsModel {
  static async createOrganization(data: NewOrganization): Promise<Organization> {
    const [organization] = await db.insert(organizations).values(data).returning();
    return organization;
  }

  static async getOrganizationById(organizationId: string): Promise<Organization | null> {
    const [organization] = await db
      .select()
      .from(organizations)
      .where(eq(organizations.organizationId, organizationId));
    return organization || null;
  }

  static async getOrganizationByName(name: string): Promise<Organization | null> {
    const [organization] = await db
      .select()
      .from(organizations)
      .where(eq(organizations.name, name));
    return organization || null;
  }

  static async updateOrganization(
    organizationId: string,
    data: Partial<NewOrganization>
  ): Promise<Organization | null> {
    const [organization] = await db
      .update(organizations)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(organizations.organizationId, organizationId))
      .returning();
    return organization || null;
  }

  static async deleteOrganization(organizationId: string): Promise<boolean> {
    const result = await db
      .delete(organizations)
      .where(eq(organizations.organizationId, organizationId))
      .returning();
    return result.length > 0;
  }

  static async listOrganizations(): Promise<Organization[]> {
    return await db.select().from(organizations);
  }

  static async listActiveOrganizations(): Promise<Organization[]> {
    return await db
      .select()
      .from(organizations)
      .where(eq(organizations.isActive, true));
  }
}
