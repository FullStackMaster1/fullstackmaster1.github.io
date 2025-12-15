import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const webinarRegistrations = pgTable("webinar_registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  webinarId: text("webinar_id").notNull(),
  webinarTitle: text("webinar_title").notNull(),
  whatsappOptIn: boolean("whatsapp_opt_in").default(false),
  registeredAt: timestamp("registered_at").defaultNow(),
});

export const insertWebinarRegistrationSchema = createInsertSchema(webinarRegistrations).omit({
  id: true,
  registeredAt: true,
});

export type InsertWebinarRegistration = z.infer<typeof insertWebinarRegistrationSchema>;
export type WebinarRegistration = typeof webinarRegistrations.$inferSelect;

export const webinarInterests = pgTable("webinar_interests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  webinarId: text("webinar_id").notNull(),
  sessionId: text("session_id").notNull(),
  vote: text("vote").notNull(), // "upvote" or "downvote"
  votedAt: timestamp("voted_at").defaultNow(),
});

export const insertWebinarInterestSchema = createInsertSchema(webinarInterests).omit({
  id: true,
  votedAt: true,
});

export type InsertWebinarInterest = z.infer<typeof insertWebinarInterestSchema>;
export type WebinarInterest = typeof webinarInterests.$inferSelect;

// Referral System
export const referrals = pgTable("referrals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  referrerName: text("referrer_name").notNull(),
  referrerEmail: text("referrer_email").notNull().unique(),
  referralCode: text("referral_code").notNull().unique(),
  referralCount: text("referral_count").default("0"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertReferralSchema = createInsertSchema(referrals).omit({
  id: true,
  createdAt: true,
  referralCount: true,
});

export type InsertReferral = z.infer<typeof insertReferralSchema>;
export type Referral = typeof referrals.$inferSelect;

// Track referred signups
export const referredUsers = pgTable("referred_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  referralCode: text("referral_code").notNull(),
  referredName: text("referred_name").notNull(),
  referredEmail: text("referred_email").notNull(),
  status: text("status").default("pending"), // pending, enrolled, completed
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertReferredUserSchema = createInsertSchema(referredUsers).omit({
  id: true,
  createdAt: true,
  status: true,
});

export type InsertReferredUser = z.infer<typeof insertReferredUserSchema>;
export type ReferredUser = typeof referredUsers.$inferSelect;
