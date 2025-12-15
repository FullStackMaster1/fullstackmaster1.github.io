import { type User, type InsertUser, type WebinarRegistration, type InsertWebinarRegistration, webinarRegistrations, type WebinarInterest, type InsertWebinarInterest, webinarInterests, type Referral, type InsertReferral, referrals, type ReferredUser, type InsertReferredUser, referredUsers } from "@shared/schema";
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
  // Referral system
  createReferral(referral: InsertReferral): Promise<Referral>;
  getReferralByEmail(email: string): Promise<Referral | undefined>;
  getReferralByCode(code: string): Promise<Referral | undefined>;
  incrementReferralCount(code: string): Promise<void>;
  createReferredUser(referredUser: InsertReferredUser): Promise<ReferredUser>;
  getReferredUsersByCode(code: string): Promise<ReferredUser[]>;
  getReferralStats(code: string): Promise<{ total: number; pending: number; enrolled: number }>;
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

  // Referral system methods
  async createReferral(referral: InsertReferral): Promise<Referral> {
    const [result] = await db.insert(referrals).values(referral).returning();
    return result;
  }

  async getReferralByEmail(email: string): Promise<Referral | undefined> {
    const [result] = await db.select().from(referrals).where(eq(referrals.referrerEmail, email));
    return result;
  }

  async getReferralByCode(code: string): Promise<Referral | undefined> {
    const [result] = await db.select().from(referrals).where(eq(referrals.referralCode, code));
    return result;
  }

  async incrementReferralCount(code: string): Promise<void> {
    const existing = await this.getReferralByCode(code);
    if (existing) {
      const newCount = (parseInt(existing.referralCount || "0") + 1).toString();
      await db.update(referrals).set({ referralCount: newCount }).where(eq(referrals.referralCode, code));
    }
  }

  async createReferredUser(referredUser: InsertReferredUser): Promise<ReferredUser> {
    const [result] = await db.insert(referredUsers).values(referredUser).returning();
    // Also increment the referral count
    await this.incrementReferralCount(referredUser.referralCode);
    return result;
  }

  async getReferredUsersByCode(code: string): Promise<ReferredUser[]> {
    return await db.select().from(referredUsers).where(eq(referredUsers.referralCode, code)).orderBy(desc(referredUsers.createdAt));
  }

  async getReferralStats(code: string): Promise<{ total: number; pending: number; enrolled: number }> {
    const users = await this.getReferredUsersByCode(code);
    return {
      total: users.length,
      pending: users.filter(u => u.status === "pending").length,
      enrolled: users.filter(u => u.status === "enrolled" || u.status === "completed").length
    };
  }
}

export const storage = new MemStorage();
