import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { eq, and, like } from "drizzle-orm";
import type { NewCategory, Category } from "./categories.types";

export class CategoriesModel {
  static async createCategory(data: NewCategory): Promise<Category> {
    const [category] = await db.insert(categories).values(data).returning();
    return category;
  }

  static async getCategoryById(id: string): Promise<Category | null> {
    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.categoryId, id));
    return category || null;
  }

  static async getCategoryBySlug(slug: string): Promise<Category | null> {
    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug));
    return category || null;
  }

  static async updateCategory(id: string, data: Partial<NewCategory>): Promise<Category | null> {
    const [category] = await db
      .update(categories)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(categories.categoryId, id))
      .returning();
    return category || null;
  }

  static async deleteCategory(id: string): Promise<boolean> {
    const result = await db
      .delete(categories)
      .where(eq(categories.categoryId, id));
    return result.count > 0;
  }

  static async listCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  static async listActiveCategories(): Promise<Category[]> {
    return await db
      .select()
      .from(categories)
      .where(eq(categories.isActive, true));
  }

  static async searchCategories(searchTerm: string): Promise<Category[]> {
    return await db
      .select()
      .from(categories)
      .where(like(categories.name, `%${searchTerm}%`));
  }

  static async searchActiveCategories(searchTerm: string): Promise<Category[]> {
    return await db
      .select()
      .from(categories)
      .where(
        and(
          like(categories.name, `%${searchTerm}%`),
          eq(categories.isActive, true)
        )
      );
  }
}
