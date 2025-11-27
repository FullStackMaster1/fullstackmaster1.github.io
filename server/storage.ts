import { type User, type InsertUser, type WebinarRegistration, type InsertWebinarRegistration, webinarRegistrations } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { desc, eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createWebinarRegistration(registration: InsertWebinarRegistration): Promise<WebinarRegistration>;
  getWebinarRegistrations(): Promise<WebinarRegistration[]>;
  getWebinarRegistrationsByWebinarId(webinarId: string): Promise<WebinarRegistration[]>;
  getWebinarRegistrationByEmail(email: string, webinarId: string): Promise<WebinarRegistration | undefined>;
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
      .where(eq(webinarRegistrations.email, email))
      .where(eq(webinarRegistrations.webinarId, webinarId));
    return result;
  }
}

export const storage = new MemStorage();
