import { db } from "@/lib/db";
import { categoryAttributes } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import type { NewCategoryAttribute, CategoryAttribute } from "./categoryAttributes.types";

export class CategoryAttributesModel {
  static async createCategoryAttribute(data: NewCategoryAttribute): Promise<CategoryAttribute> {
    const [categoryAttribute] = await db.insert(categoryAttributes).values(data).returning();
    return categoryAttribute;
  }

  static async getCategoryAttribute(categoryId: string, attributeId: string): Promise<CategoryAttribute | null> {
    const [categoryAttribute] = await db
      .select()
      .from(categoryAttributes)
      .where(
        and(
          eq(categoryAttributes.categoryId, categoryId),
          eq(categoryAttributes.attributeId, attributeId)
        )
      );
    return categoryAttribute || null;
  }

  static async getAttributesByCategoryId(categoryId: string): Promise<CategoryAttribute[]> {
    return await db
      .select()
      .from(categoryAttributes)
      .where(eq(categoryAttributes.categoryId, categoryId));
  }

  static async getCategoriesByAttributeId(attributeId: string): Promise<CategoryAttribute[]> {
    return await db
      .select()
      .from(categoryAttributes)
      .where(eq(categoryAttributes.attributeId, attributeId));
  }

  static async deleteCategoryAttribute(categoryId: string, attributeId: string): Promise<boolean> {
    const result = await db
      .delete(categoryAttributes)
      .where(
        and(
          eq(categoryAttributes.categoryId, categoryId),
          eq(categoryAttributes.attributeId, attributeId)
        )
      );
    return result.count > 0;
  }

  static async listCategoryAttributes(): Promise<CategoryAttribute[]> {
    return await db.select().from(categoryAttributes);
  }
}
