import { type User, type InsertUser, type WebinarRegistration, type InsertWebinarRegistration, webinarRegistrations, type WebinarInterest, type InsertWebinarInterest, webinarInterests } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { desc, eq, and, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createWebinarRegistration(registration: InsertWebinarRegistration): Promise<WebinarRegistration>;
  getWebinarRegistrations(): Promise<WebinarRegistration[]>;
  getWebinarRegistrationsByWebinarId(webinarId: string): Promise<WebinarRegistration[]>;
  getWebinarRegistrationByEmail(email: string, webinarId: string): Promise<WebinarRegistration | undefined>;
  getRegistrationCountByWebinarId(webinarId: string): Promise<number>;
  upsertWebinarInterest(interest: InsertWebinarInterest): Promise<WebinarInterest>;
  getWebinarInterestCounts(webinarId: string): Promise<{ upvotes: number; downvotes: number }>;
  getWebinarInterestBySession(webinarId: string, sessionId: string): Promise<WebinarInterest | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createWebinarRegistration(registration: InsertWebinarRegistration): Promise<WebinarRegistration> {
    const [result] = await db.insert(webinarRegistrations).values(registration).returning();
    return result;
  }

  async getWebinarRegistrations(): Promise<WebinarRegistration[]> {
    return await db.select().from(webinarRegistrations).orderBy(desc(webinarRegistrations.registeredAt));
  }

  async getWebinarRegistrationsByWebinarId(webinarId: string): Promise<WebinarRegistration[]> {
    return await db.select().from(webinarRegistrations).where(eq(webinarRegistrations.webinarId, webinarId)).orderBy(desc(webinarRegistrations.registeredAt));
  }

  async getWebinarRegistrationByEmail(email: string, webinarId: string): Promise<WebinarRegistration | undefined> {
    const [result] = await db.select().from(webinarRegistrations)
      .where(and(
        eq(webinarRegistrations.email, email),
        eq(webinarRegistrations.webinarId, webinarId)
      ));
    return result;
  }

  async getRegistrationCountByWebinarId(webinarId: string): Promise<number> {
    const result = await db.select({ count: sql<number>`count(*)` })
      .from(webinarRegistrations)
      .where(eq(webinarRegistrations.webinarId, webinarId));
    return Number(result[0]?.count || 0);
  }

  async upsertWebinarInterest(interest: InsertWebinarInterest): Promise<WebinarInterest> {
    const existing = await this.getWebinarInterestBySession(interest.webinarId, interest.sessionId);
    
    if (existing) {
      const [updated] = await db.update(webinarInterests)
        .set({ vote: interest.vote })
        .where(eq(webinarInterests.id, existing.id))
        .returning();
      return updated;
    }
    
    const [created] = await db.insert(webinarInterests).values(interest).returning();
    return created;
  }

  async getWebinarInterestCounts(webinarId: string): Promise<{ upvotes: number; downvotes: number }> {
    const upvoteResult = await db.select({ count: sql<number>`count(*)` })
      .from(webinarInterests)
      .where(and(eq(webinarInterests.webinarId, webinarId), eq(webinarInterests.vote, "upvote")));
    
    const downvoteResult = await db.select({ count: sql<number>`count(*)` })
      .from(webinarInterests)
      .where(and(eq(webinarInterests.webinarId, webinarId), eq(webinarInterests.vote, "downvote")));
    
    return {
      upvotes: Number(upvoteResult[0]?.count || 0),
      downvotes: Number(downvoteResult[0]?.count || 0)
    };
  }

  async getWebinarInterestBySession(webinarId: string, sessionId: string): Promise<WebinarInterest | undefined> {
    const [result] = await db.select().from(webinarInterests)
      .where(and(
        eq(webinarInterests.webinarId, webinarId),
        eq(webinarInterests.sessionId, sessionId)
      ));
    return result;
  }
}

export const storage = new MemStorage();
