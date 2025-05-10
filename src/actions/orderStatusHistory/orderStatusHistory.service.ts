import { OrderStatusHistoryModel } from "./orderStatusHistory.model";
import { orderStatusHistorySchema } from "./orderStatusHistory.types";
import type {
  OrderStatusHistory,
  OrderStatusHistoryResponse,
  OrderStatusHistoriesResponse,
} from "./orderStatusHistory.types";
import { revalidatePath } from "next/cache";

//fix it later with next auth or something
function auth(): { userId: any; orgId: any } {
  throw new Error("Function not implemented.");
}

export async function createOrderStatusHistory(
  data: unknown
): Promise<OrderStatusHistoryResponse> {
  try {
    // const { userId, orgId } = auth();
    // if (!userId || !orgId) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const validatedData = orderStatusHistorySchema.parse(data);
    const history = await OrderStatusHistoryModel.createOrderStatusHistory({
      ...validatedData,
      // changedBy: userId,
    });

    revalidatePath("/orders");
    return { success: true, data: history };
  } catch (error) {
    console.error("Error creating order status history:", error);
    return { success: false, error: "Failed to create order status history" };
  }
}

export async function getOrderStatusHistoryById(
  historyId: string
): Promise<OrderStatusHistoryResponse> {
  try {
    // const { userId, orgId } = auth();
    // if (!userId || !orgId) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const history = await OrderStatusHistoryModel.getOrderStatusHistoryById(
      historyId
    );

    if (!history) {
      return { success: false, error: "Order status history not found" };
    }

    return { success: true, data: history };
  } catch (error) {
    console.error("Error getting order status history:", error);
    return { success: false, error: "Failed to get order status history" };
  }
}

export async function getOrderStatusHistoryByOrderId(
  orderId: string
): Promise<OrderStatusHistoriesResponse> {
  try {
    // const { userId, orgId } = auth();
    // if (!userId || !orgId) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const history =
      await OrderStatusHistoryModel.getOrderStatusHistoryByOrderId(orderId);

    return { success: true, data: history };
  } catch (error) {
    console.error("Error getting order status history:", error);
    return { success: false, error: "Failed to get order status history" };
  }
}

export async function getOrderStatusHistoryByStatus(
  status: string
): Promise<OrderStatusHistoriesResponse> {
  try {
    // const { userId, orgId } = auth();
    // if (!userId || !orgId) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const history = await OrderStatusHistoryModel.getOrderStatusHistoryByStatus(
      status
    );

    return { success: true, data: history };
  } catch (error) {
    console.error("Error getting order status history:", error);
    return { success: false, error: "Failed to get order status history" };
  }
}

export async function getOrderStatusHistoryByUser(
  userId: string
): Promise<OrderStatusHistoriesResponse> {
  try {
    // const { userId: authUserId, orgId } = auth();
    // if (!authUserId || !orgId) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const history = await OrderStatusHistoryModel.getOrderStatusHistoryByUser(
      userId
    );

    return { success: true, data: history };
  } catch (error) {
    console.error("Error getting order status history:", error);
    return { success: false, error: "Failed to get order status history" };
  }
}

export async function updateOrderStatusHistory(
  historyId: string,
  data: unknown
): Promise<OrderStatusHistoryResponse> {
  try {
    // const { userId, orgId } = auth();
    // if (!userId || !orgId) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const history = await OrderStatusHistoryModel.getOrderStatusHistoryById(
      historyId
    );

    if (!history) {
      return { success: false, error: "Order status history not found" };
    }

    const validatedData = orderStatusHistorySchema.partial().parse(data);
    const updatedHistory =
      await OrderStatusHistoryModel.updateOrderStatusHistory(
        historyId,
        validatedData
      );

    if (!updatedHistory) {
      return { success: false, error: "Failed to update order status history" };
    }

    revalidatePath("/orders");
    return { success: true, data: updatedHistory };
  } catch (error) {
    console.error("Error updating order status history:", error);
    return { success: false, error: "Failed to update order status history" };
  }
}

export async function deleteOrderStatusHistory(
  historyId: string
): Promise<OrderStatusHistoryResponse> {
  try {
    // const { userId, orgId } = auth();
    // if (!userId || !orgId) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const history = await OrderStatusHistoryModel.getOrderStatusHistoryById(
      historyId
    );

    if (!history) {
      return { success: false, error: "Order status history not found" };
    }

    const success = await OrderStatusHistoryModel.deleteOrderStatusHistory(
      historyId
    );

    if (!success) {
      return { success: false, error: "Failed to delete order status history" };
    }

    revalidatePath("/orders");
    return { success: true, data: history };
  } catch (error) {
    console.error("Error deleting order status history:", error);
    return { success: false, error: "Failed to delete order status history" };
  }
}

export async function listOrderStatusHistory(): Promise<OrderStatusHistoriesResponse> {
  try {
    // const { userId, orgId } = auth();
    // if (!userId || !orgId) {
    //   return { success: false, error: "Unauthorized" };
    // }

    const history = await OrderStatusHistoryModel.listOrderStatusHistory();
    return { success: true, data: history };
  } catch (error) {
    console.error("Error listing order status history:", error);
    return { success: false, error: "Failed to list order status history" };
  }
}
