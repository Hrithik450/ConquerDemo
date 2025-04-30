import { CartsModel } from "./carts.model";
import { cartSchema } from "./carts.types";
import type { Cart, CartResponse, CartsResponse } from "./carts.types";

export class CartsService {
  static async createCart(data: Partial<Cart>): Promise<CartResponse> {
    try {
      // Validate input data
      const validatedData = cartSchema.parse(data);
      
      // Check if cart already exists for user and organization
      const existingCart = await CartsModel.getCartByUser(
        validatedData.userId,
        validatedData.organizationId
      );
      if (existingCart) {
        return {
          success: false,
          error: "Cart already exists for this user and organization",
        };
      }

      // Create new cart
      const cart = await CartsModel.createCart(validatedData);
      return {
        success: true,
        data: cart,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create cart",
      };
    }
  }

  static async getCartById(id: string): Promise<CartResponse> {
    try {
      const cart = await CartsModel.getCartById(id);
      if (!cart) {
        return {
          success: false,
          error: "Cart not found",
        };
      }
      return {
        success: true,
        data: cart,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get cart",
      };
    }
  }

  static async getCartByUser(userId: string, organizationId: string): Promise<CartResponse> {
    try {
      const cart = await CartsModel.getCartByUser(userId, organizationId);
      if (!cart) {
        return {
          success: false,
          error: "Cart not found",
        };
      }
      return {
        success: true,
        data: cart,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get cart",
      };
    }
  }

  static async updateCart(id: string, data: Partial<Cart>): Promise<CartResponse> {
    try {
      // Validate input data
      const validatedData = cartSchema.partial().parse(data);
      
      const cart = await CartsModel.updateCart(id, validatedData);
      if (!cart) {
        return {
          success: false,
          error: "Cart not found",
        };
      }
      return {
        success: true,
        data: cart,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update cart",
      };
    }
  }

  static async deleteCart(id: string): Promise<CartResponse> {
    try {
      const success = await CartsModel.deleteCart(id);
      if (!success) {
        return {
          success: false,
          error: "Cart not found",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete cart",
      };
    }
  }

  static async listCartsByUser(userId: string): Promise<CartsResponse> {
    try {
      const carts = await CartsModel.listCartsByUser(userId);
      return {
        success: true,
        data: carts,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to list carts",
      };
    }
  }

  static async listCartsByOrganization(organizationId: string): Promise<CartsResponse> {
    try {
      const carts = await CartsModel.listCartsByOrganization(organizationId);
      return {
        success: true,
        data: carts,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to list carts",
      };
    }
  }
}
