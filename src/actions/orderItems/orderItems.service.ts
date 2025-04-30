import { OrderItemsModel } from "./orderItems.model";
import { orderItemSchema, partialOrderItemSchema } from "./orderItems.types";
import type { OrderItem, OrderItemResponse, OrderItemsResponse, NewOrderItem, OrderItemInput } from "./orderItems.types";

// Input type for service layer
type OrderItemServiceInput = {
  orderId?: string;
  productVariantId?: string;
  quantity?: number;
  price?: number;
  discount?: number;
  totalPrice?: number;
};

export class OrderItemsService {
  static async createOrderItem(data: OrderItemInput): Promise<OrderItemResponse> {
    try {
      if (!data.orderId || !data.productVariantId) {
        throw new Error("orderId and productVariantId are required");
      }

      // Calculate total price
      const price = data.price || 0;
      const quantity = data.quantity || 1;
      const discount = data.discount || 0;
      const totalPrice = data.totalPrice || Number((price * quantity - discount).toFixed(2));

      // Validate and transform input data
      const validatedData = orderItemSchema.parse({
        orderId: data.orderId,
        productVariantId: data.productVariantId,
        quantity,
        price,
        discount,
        totalPrice,
      }) as NewOrderItem;
      
      // Create new order item
      const item = await OrderItemsModel.createOrderItem(validatedData);
      return {
        success: true,
        data: item,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create order item",
      };
    }
  }

  static async getOrderItemById(id: string): Promise<OrderItemResponse> {
    try {
      const item = await OrderItemsModel.getOrderItemById(id);
      if (!item) {
        return {
          success: false,
          error: "Order item not found",
        };
      }
      return {
        success: true,
        data: item,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get order item",
      };
    }
  }

  static async getOrderItemsByOrderId(orderId: string): Promise<OrderItemsResponse> {
    try {
      const items = await OrderItemsModel.getOrderItemsByOrderId(orderId);
      return {
        success: true,
        data: items,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get order items",
      };
    }
  }

  static async getOrderItemsByProductVariantId(
    productVariantId: string
  ): Promise<OrderItemsResponse> {
    try {
      const items = await OrderItemsModel.getOrderItemsByProductVariantId(productVariantId);
      return {
        success: true,
        data: items,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get order items",
      };
    }
  }

  static async updateOrderItem(
    id: string,
    data: OrderItemInput
  ): Promise<OrderItemResponse> {
    try {
      // Calculate total price if price, quantity, or discount is updated
      let totalPrice = data.totalPrice;
      if (data.price !== undefined && data.quantity !== undefined) {
        const discount = data.discount || 0;
        totalPrice = Number((data.price * data.quantity - discount).toFixed(2));
      }

      // Validate and transform input data
      const validatedData = partialOrderItemSchema.parse({
        ...data,
        totalPrice,
      }) as Partial<NewOrderItem>;
      
      const item = await OrderItemsModel.updateOrderItem(id, validatedData);
      if (!item) {
        return {
          success: false,
          error: "Order item not found",
        };
      }
      return {
        success: true,
        data: item,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update order item",
      };
    }
  }

  static async deleteOrderItem(id: string): Promise<OrderItemResponse> {
    try {
      const success = await OrderItemsModel.deleteOrderItem(id);
      if (!success) {
        return {
          success: false,
          error: "Order item not found",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete order item",
      };
    }
  }

  static async deleteOrderItemsByOrderId(orderId: string): Promise<OrderItemResponse> {
    try {
      const success = await OrderItemsModel.deleteOrderItemsByOrderId(orderId);
      if (!success) {
        return {
          success: false,
          error: "No order items found for this order",
        };
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete order items",
      };
    }
  }
}
