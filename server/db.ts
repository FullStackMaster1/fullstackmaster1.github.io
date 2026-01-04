import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

// Make database optional for development
let db: ReturnType<typeof drizzle> | null = null;

if (process.env.DATABASE_URL) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle(pool);
} else if (process.env.NODE_ENV === "production") {
  throw new Error("DATABASE_URL must be set in production");
} else {
  console.warn("⚠️  DATABASE_URL not set - running in development mode without database");
}

export { db };
