import { OrdersModel } from "./orders.model";
import type { NewOrder, Order } from "./orders.types";

export class OrdersService {
  static async createOrder(data: NewOrder): Promise<Order> {
    return await OrdersModel.createOrder(data);
  }

  static async getOrderById(orderId: string): Promise<Order | null> {
    return await OrdersModel.getOrderById(orderId);
  }

  static async updateOrder(orderId: string, data: Partial<NewOrder>): Promise<Order | null> {
    return await OrdersModel.updateOrder(orderId, data);
  }

  static async deleteOrder(orderId: string): Promise<boolean> {
    return await OrdersModel.deleteOrder(orderId);
  }

  static async listOrders(): Promise<Order[]> {
    return await OrdersModel.listOrders();
  }

  static async getOrdersByUser(userId: string): Promise<Order[]> {
    return await OrdersModel.getOrdersByUser(userId);
  }

  static async getOrdersByStatus(status: string): Promise<Order[]> {
    return await OrdersModel.getOrdersByStatus(status);
  }
}
