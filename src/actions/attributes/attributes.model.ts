import { db } from "@/lib/db";
import { attributes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { NewAttribute, Attribute } from "./attributes.types";

export class AttributesModel {
  static async createAttribute(data: NewAttribute): Promise<Attribute> {
    const [attribute] = await db.insert(attributes).values(data).returning();
    return attribute;
  }

  static async getAttributeById(id: string): Promise<Attribute | null> {
    const [attribute] = await db
      .select()
      .from(attributes)
      .where(eq(attributes.id, id));
    return attribute || null;
  }

  static async getAttributeBySlug(slug: string): Promise<Attribute | null> {
    const [attribute] = await db
      .select()
      .from(attributes)
      .where(eq(attributes.slug, slug));
    return attribute || null;
  }

  static async updateAttribute(id: string, data: Partial<NewAttribute>): Promise<Attribute | null> {
    const [attribute] = await db
      .update(attributes)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(attributes.id, id))
      .returning();
    return attribute || null;
  }

  static async deleteAttribute(id: string): Promise<boolean> {
    const result = await db
      .delete(attributes)
      .where(eq(attributes.id, id));
    return result.count > 0;
  }

  static async listAttributes(): Promise<Attribute[]> {
    return await db.select().from(attributes);
  }
}
