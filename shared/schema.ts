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
