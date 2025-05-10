import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { NewUser, User } from "./users.types";

export class UsersModel {
  static async createUser(data: NewUser): Promise<User> {
    const [user] = await db.insert(users).values(data).returning();
    return user;
  }

  static async getUserById(userId: string): Promise<User | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.userId, userId));
    return user || null;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || null;
  }

  static async updateUser(
    userId: string,
    data: Partial<NewUser>
  ): Promise<User | null> {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.userId, userId))
      .returning();
    return user || null;
  }

  static async deleteUser(userId: string): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.userId, userId));
    return result.count > 0;
  }

  static async listUsers(): Promise<User[]> {
    return await db.select().from(users);
  }
}
