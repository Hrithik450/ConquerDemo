import { OrganizationEmployeesModel } from "./organizationEmployees.model";
import { organizationEmployeeSchema } from "./organizationEmployees.types";
import type {
  OrganizationEmployee,
  OrganizationEmployeeResponse,
  OrganizationEmployeesResponse,
} from "./organizationEmployees.types";

export class OrganizationEmployeesService {
  static async createEmployee(data: Partial<OrganizationEmployee>): Promise<OrganizationEmployeeResponse> {
    try {
      // Validate input data
      const validatedData = organizationEmployeeSchema.parse(data);
      
      // Check if employee already exists for this user and organization
      const existingEmployee = await OrganizationEmployeesModel.getEmployeeByUserAndOrg(
        validatedData.userId,
        validatedData.organizationId
      );
      if (existingEmployee) {
        return {
          success: false,
          error: "Employee already exists for this user and organization",
        };
      }

      // Create new employee
      const employee = await OrganizationEmployeesModel.createEmployee(validatedData);
      return {
        success: true,
        data: employee,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create employee",
      };
    }
  }

  static async getEmployeeById(employeeId: string): Promise<OrganizationEmployeeResponse> {
    try {
      const employee = await OrganizationEmployeesModel.getEmployeeById(employeeId);
      if (!employee) {
        return {
          success: false,
          error: "Employee not found",
        };
      }
      return {
        success: true,
        data: employee,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get employee",
      };
    }
  }

  static async updateEmployee(
    employeeId: string,
    data: Partial<OrganizationEmployee>
  ): Promise<OrganizationEmployeeResponse> {
    try {
      // Validate input data
      const validatedData = organizationEmployeeSchema.partial().parse(data);
      
      const employee = await OrganizationEmployeesModel.updateEmployee(employeeId, validatedData);
      if (!employee) {
        return {
          success: false,
          error: "Employee not found",
        };
      }
      return {
        success: true,
        data: employee,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update employee",
      };
    }
  }

  static async deleteEmployee(employeeId: string): Promise<OrganizationEmployeeResponse> {
    try {
      const success = await OrganizationEmployeesModel.deleteEmployee(employeeId);
      if (!success) {
        return {
          success: false,
          error: "Employee not found",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete employee",
      };
    }
  }

  static async listEmployeesByOrganization(
    organizationId: string,
    activeOnly: boolean = false
  ): Promise<OrganizationEmployeesResponse> {
    try {
      const employees = activeOnly
        ? await OrganizationEmployeesModel.listActiveEmployeesByOrganization(organizationId)
        : await OrganizationEmployeesModel.listEmployeesByOrganization(organizationId);
      return {
        success: true,
        data: employees,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to list employees",
      };
    }
  }
}
