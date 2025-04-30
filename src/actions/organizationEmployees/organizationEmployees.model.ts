import { db } from "@/lib/db";
import { organizationEmployees } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import type { NewOrganizationEmployee, OrganizationEmployee } from "./organizationEmployees.types";

export class OrganizationEmployeesModel {
  static async createEmployee(data: NewOrganizationEmployee): Promise<OrganizationEmployee> {
    const [employee] = await db.insert(organizationEmployees).values(data).returning();
    return employee;
  }

  static async getEmployeeById(employeeId: string): Promise<OrganizationEmployee | null> {
    const [employee] = await db
      .select()
      .from(organizationEmployees)
      .where(eq(organizationEmployees.employeeId, employeeId));
    return employee || null;
  }

  static async getEmployeeByUserAndOrg(
    userId: string,
    organizationId: string
  ): Promise<OrganizationEmployee | null> {
    const [employee] = await db
      .select()
      .from(organizationEmployees)
      .where(
        and(
          eq(organizationEmployees.userId, userId),
          eq(organizationEmployees.organizationId, organizationId)
        )
      );
    return employee || null;
  }

  static async updateEmployee(
    employeeId: string,
    data: Partial<NewOrganizationEmployee>
  ): Promise<OrganizationEmployee | null> {
    const [employee] = await db
      .update(organizationEmployees)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(organizationEmployees.employeeId, employeeId))
      .returning();
    return employee || null;
  }

  static async deleteEmployee(employeeId: string): Promise<boolean> {
    const result = await db
      .delete(organizationEmployees)
      .where(eq(organizationEmployees.employeeId, employeeId))
      .returning();
    return result.length > 0;
  }

  static async listEmployeesByOrganization(organizationId: string): Promise<OrganizationEmployee[]> {
    return await db
      .select()
      .from(organizationEmployees)
      .where(eq(organizationEmployees.organizationId, organizationId));
  }

  static async listActiveEmployeesByOrganization(organizationId: string): Promise<OrganizationEmployee[]> {
    return await db
      .select()
      .from(organizationEmployees)
      .where(
        and(
          eq(organizationEmployees.organizationId, organizationId),
          eq(organizationEmployees.isActive, true)
        )
      );
  }
}
