import { PriceHistoryModel } from "./priceHistory.model";
import { priceHistorySchema } from "./priceHistory.types";
import type {
  PriceHistory,
  PriceHistoryResponse,
  PriceHistoriesResponse,
} from "./priceHistory.types";

export class PriceHistoryService {
  static async createPriceHistory(
    data: Partial<PriceHistory>
  ): Promise<PriceHistoryResponse> {
    try {
      // Validate input data and transform numbers to strings
      const validatedData = priceHistorySchema.parse(data);

      // Check if there's an active price history for this variant
      const currentHistory =
        await PriceHistoryModel.getCurrentPriceHistoryByVariantId(
          validatedData.variantId
        );
      if (currentHistory) {
        // End the current price history
        await PriceHistoryModel.updatePriceHistory(currentHistory.id, {
          effectiveTo: new Date(),
        });
      }

      // Create new price history
      const history = await PriceHistoryModel.createPriceHistory(validatedData);
      return {
        success: true,
        data: history,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create price history",
      };
    }
  }

  static async getPriceHistoryById(id: string): Promise<PriceHistoryResponse> {
    try {
      const history = await PriceHistoryModel.getPriceHistoryById(id);
      if (!history) {
        return {
          success: false,
          error: "Price history not found",
        };
      }
      return {
        success: true,
        data: history,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get price history",
      };
    }
  }

  static async getCurrentPriceHistoryByVariantId(
    variantId: string
  ): Promise<PriceHistoryResponse> {
    try {
      const history = await PriceHistoryModel.getCurrentPriceHistoryByVariantId(
        variantId
      );
      if (!history) {
        return {
          success: false,
          error: "No active price history found for this variant",
        };
      }
      return {
        success: true,
        data: history,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get current price history",
      };
    }
  }

  static async getPriceHistoryByVariantId(
    variantId: string
  ): Promise<PriceHistoriesResponse> {
    try {
      const histories = await PriceHistoryModel.getPriceHistoryByVariantId(
        variantId
      );
      return {
        success: true,
        data: histories,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get price history",
      };
    }
  }

  static async getPriceHistoryByDateRange(
    variantId: string,
    startDate: Date,
    endDate: Date
  ): Promise<PriceHistoriesResponse> {
    try {
      if (startDate > endDate) {
        return {
          success: false,
          error: "Start date must be before end date",
        };
      }

      const histories = await PriceHistoryModel.getPriceHistoryByDateRange(
        variantId,
        startDate,
        endDate
      );
      return {
        success: true,
        data: histories,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get price history",
      };
    }
  }

  static async updatePriceHistory(
    id: string,
    data: Partial<PriceHistory>
  ): Promise<PriceHistoryResponse> {
    try {
      // Validate input data and transform numbers to strings
      const validatedData = priceHistorySchema.partial().parse(data);

      const history = await PriceHistoryModel.updatePriceHistory(
        id,
        validatedData
      );
      if (!history) {
        return {
          success: false,
          error: "Price history not found",
        };
      }
      return {
        success: true,
        data: history,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update price history",
      };
    }
  }

  static async deletePriceHistory(id: string): Promise<PriceHistoryResponse> {
    try {
      const success = await PriceHistoryModel.deletePriceHistory(id);
      if (!success) {
        return {
          success: false,
          error: "Price history not found",
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
            : "Failed to delete price history",
      };
    }
  }

  static async deletePriceHistoryByVariantId(
    variantId: string
  ): Promise<PriceHistoryResponse> {
    try {
      const success = await PriceHistoryModel.deletePriceHistoryByVariantId(
        variantId
      );
      if (!success) {
        return {
          success: false,
          error: "No price history found for this variant",
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
            : "Failed to delete price history",
      };
    }
  }
}
