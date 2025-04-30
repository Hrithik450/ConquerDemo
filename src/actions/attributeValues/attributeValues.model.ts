import { db } from "@/lib/db";
import { attributeValues } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { NewAttributeValue, AttributeValue } from "./attributeValues.types";

export class AttributeValuesModel {
  static async createAttributeValue(data: NewAttributeValue): Promise<AttributeValue> {
    const [attributeValue] = await db.insert(attributeValues).values(data).returning();
    return attributeValue;
  }

  static async getAttributeValueById(id: string): Promise<AttributeValue | null> {
    const [attributeValue] = await db
      .select()
      .from(attributeValues)
      .where(eq(attributeValues.id, id));
    return attributeValue || null;
  }

  static async getAttributeValuesByAttributeId(attributeId: string): Promise<AttributeValue[]> {
    return await db
      .select()
      .from(attributeValues)
      .where(eq(attributeValues.attributeId, attributeId));
  }

  static async updateAttributeValue(id: string, data: Partial<NewAttributeValue>): Promise<AttributeValue | null> {
    const [attributeValue] = await db
      .update(attributeValues)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(attributeValues.id, id))
      .returning();
    return attributeValue || null;
  }

  static async deleteAttributeValue(id: string): Promise<boolean> {
    const result = await db
      .delete(attributeValues)
      .where(eq(attributeValues.id, id));
    return result.count > 0;
  }

  static async listAttributeValues(): Promise<AttributeValue[]> {
    return await db.select().from(attributeValues);
  }
}
