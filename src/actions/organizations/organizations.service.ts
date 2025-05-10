import { OrganizationsModel } from "./organizations.model";
import { organizationSchema } from "./organizations.types";
import type {
  Organization,
  OrganizationResponse,
  OrganizationsResponse,
} from "./organizations.types";

export class OrganizationsService {
  static async createOrganization(
    data: Partial<Organization>
  ): Promise<OrganizationResponse> {
    try {
      // Validate input data
      const validatedData = organizationSchema.parse(data);

      // Check if organization already exists
      const existingOrg = await OrganizationsModel.getOrganizationByName(
        validatedData.name
      );
      if (existingOrg) {
        return {
          success: false,
          error: "Organization with this name already exists",
        };
      }

      // Create new organization
      const organization = await OrganizationsModel.createOrganization(
        validatedData
      );
      return {
        success: true,
        data: organization,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create organization",
      };
    }
  }

  static async getOrganizationById(
    organizationId: string
  ): Promise<OrganizationResponse> {
    try {
      const organization = await OrganizationsModel.getOrganizationById(
        organizationId
      );
      if (!organization) {
        return {
          success: false,
          error: "Organization not found",
        };
      }
      return {
        success: true,
        data: organization,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to get organization",
      };
    }
  }

  static async updateOrganization(
    organizationId: string,
    data: Partial<Organization>
  ): Promise<OrganizationResponse> {
    try {
      // Validate input data
      const validatedData = organizationSchema.partial().parse(data);

      const organization = await OrganizationsModel.updateOrganization(
        organizationId,
        validatedData
      );
      if (!organization) {
        return {
          success: false,
          error: "Organization not found",
        };
      }
      return {
        success: true,
        data: organization,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update organization",
      };
    }
  }

  static async deleteOrganization(
    organizationId: string
  ): Promise<OrganizationResponse> {
    try {
      const success = await OrganizationsModel.deleteOrganization(
        organizationId
      );
      if (!success) {
        return {
          success: false,
          error: "Organization not found",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete organization",
      };
    }
  }

  static async listOrganizations(
    activeOnly: boolean = false
  ): Promise<OrganizationsResponse> {
    try {
      const organizations = activeOnly
        ? await OrganizationsModel.listActiveOrganizations()
        : await OrganizationsModel.listOrganizations();
      return {
        success: true,
        data: organizations,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to list organizations",
      };
    }
  }
}
