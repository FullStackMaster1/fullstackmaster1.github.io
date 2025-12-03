import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWebinarRegistrationSchema, insertWebinarInterestSchema } from "@shared/schema";
import { z } from "zod";
import { sendWebinarRegistrationNotification } from "./email";

const ADMIN_TOKEN = (process.env.ADMIN_TOKEN || "").trim();
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = "UCfjBZHutgAYon-T8sqt1rwg"; // FullStackMaster channel

// Log on startup for debugging
if (process.env.NODE_ENV === "development") {
  console.log("🔐 Server initialized - ADMIN_TOKEN is", ADMIN_TOKEN ? "configured" : "NOT SET");
}

// Simple in-memory rate limiter for voting
const voteRateLimiter = new Map<string, { count: number; resetTime: number }>();
const VOTE_RATE_LIMIT = 10; // Max votes per window
const VOTE_RATE_WINDOW = 60000; // 1 minute window

function checkVoteRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = voteRateLimiter.get(identifier);
  
  if (!record || now > record.resetTime) {
    voteRateLimiter.set(identifier, { count: 1, resetTime: now + VOTE_RATE_WINDOW });
    return true;
  }
  
  if (record.count >= VOTE_RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  if (!ADMIN_TOKEN) {
    console.error("❌ ADMIN_TOKEN environment variable is not set");
    return res.status(500).json({ error: "Admin token not configured. Please contact the administrator." });
  }
  
  let token = req.headers["x-admin-token"];
  
  // Handle token being an array (Express sometimes does this)
  if (Array.isArray(token)) {
    token = token[0];
  }
  
  // Ensure token is a string and trim whitespace
  token = String(token || "").trim();
  const expectedToken = ADMIN_TOKEN;
  
  console.log(`🔐 Auth attempt - received token length: ${token.length}, expected length: ${expectedToken.length}`);
  
  if (!token) {
    console.error("❌ No token provided in request");
    return res.status(401).json({ error: "Unauthorized. No admin token provided." });
  }
  
  if (token !== expectedToken) {
    // Debug: show character-by-character comparison for first 5 chars
    const receivedStart = token.substring(0, 5);
    const expectedStart = expectedToken.substring(0, 5);
    console.error(`❌ Token mismatch - received start: [${receivedStart}], expected start: [${expectedStart}]`);
    return res.status(401).json({ error: "Unauthorized. Invalid admin token." });
  }
  
  console.log("✅ Admin authentication successful");
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Debug endpoint - shows token status
  app.get("/api/debug/token-status", (req: Request, res: Response) => {
    const hasToken = !!ADMIN_TOKEN;
    const tokenLength = ADMIN_TOKEN?.length || 0;
    res.json({
      isTokenConfigured: hasToken,
      tokenLength: tokenLength,
      firstChars: hasToken ? ADMIN_TOKEN.substring(0, 5) + "..." : "NO_TOKEN",
      environment: process.env.NODE_ENV,
      message: hasToken 
        ? `✅ Token configured (${tokenLength} chars)` 
        : "❌ Token NOT found in environment"
    });
  });

  // Test endpoint - verify token works
  app.post("/api/debug/test-token", (req: Request, res: Response) => {
    const testToken = req.body.token;
    if (!testToken) {
      return res.status(400).json({ error: "No token provided in body" });
    }
    
    const cleanTestToken = String(testToken).trim();
    const match = cleanTestToken === ADMIN_TOKEN;
    
    res.json({
      match,
      receivedLength: cleanTestToken.length,
      expectedLength: ADMIN_TOKEN.length,
      received: cleanTestToken.substring(0, 10) + "...",
      expected: ADMIN_TOKEN.substring(0, 10) + "...",
      message: match ? "✅ Token matches!" : "❌ Token does NOT match"
    });
  });

  app.post("/api/webinar/register", async (req: Request, res: Response) => {
    try {
      const validatedData = insertWebinarRegistrationSchema.parse(req.body);
      
      const existing = await storage.getWebinarRegistrationByEmail(
        validatedData.email,
        validatedData.webinarId
      );
      
      if (existing) {
        return res.status(400).json({ 
          error: "You have already registered for this webinar with this email." 
        });
      }
      
      const registration = await storage.createWebinarRegistration(validatedData);
      
      // Send email notification to admin
      sendWebinarRegistrationNotification({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        webinarId: validatedData.webinarId,
        webinarTitle: validatedData.webinarTitle,
        whatsappOptIn: validatedData.whatsappOptIn ?? false
      }).catch(err => console.error('Email notification failed:', err));
      
      res.status(201).json({ 
        message: "Registration successful! You will receive updates about this webinar.",
        registration 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      console.error("Registration error:", error);
      res.status(500).json({ error: "Failed to register. Please try again." });
    }
  });

  app.get("/api/webinar/registrations", requireAdminAuth, async (_req: Request, res: Response) => {
    try {
      const registrations = await storage.getWebinarRegistrations();
      res.json(registrations);
    } catch (error) {
      console.error("Fetch registrations error:", error);
      res.status(500).json({ error: "Failed to fetch registrations." });
    }
  });

  app.get("/api/webinar/registrations/:webinarId", requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const registrations = await storage.getWebinarRegistrationsByWebinarId(req.params.webinarId);
      res.json(registrations);
    } catch (error) {
      console.error("Fetch registrations error:", error);
      res.status(500).json({ error: "Failed to fetch registrations." });
    }
  });

  app.get("/api/webinar/export", requireAdminAuth, async (_req: Request, res: Response) => {
    try {
      const registrations = await storage.getWebinarRegistrations();
      
      const csvHeader = "Name,Email,Phone,Webinar,WhatsApp Opt-In,Registered At\n";
      const csvRows = registrations.map(r => 
        `"${r.name}","${r.email}","${r.phone || ''}","${r.webinarTitle}","${r.whatsappOptIn ? 'Yes' : 'No'}","${r.registeredAt}"`
      ).join("\n");
      
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=webinar-registrations.csv");
      res.send(csvHeader + csvRows);
    } catch (error) {
      console.error("Export error:", error);
      res.status(500).json({ error: "Failed to export registrations." });
    }
  });

  app.get("/api/youtube/playlists", async (_req: Request, res: Response) => {
    try {
      if (!YOUTUBE_API_KEY) {
        return res.status(500).json({ error: "YouTube API key not configured" });
      }

      const playlistsUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${YOUTUBE_CHANNEL_ID}&maxResults=20&key=${YOUTUBE_API_KEY}`;
      
      const response = await fetch(playlistsUrl);
      const data = await response.json();

      if (!response.ok) {
        console.error("YouTube API error:", data);
        return res.status(response.status).json({ error: data.error?.message || "Failed to fetch playlists" });
      }

      const playlists = data.items?.map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
        videoCount: item.contentDetails.itemCount,
        url: `https://www.youtube.com/playlist?list=${item.id}`,
      })) || [];

      res.json(playlists);
    } catch (error) {
      console.error("YouTube fetch error:", error);
      res.status(500).json({ error: "Failed to fetch YouTube playlists" });
    }
  });

  // Get webinar stats (registration count + interest votes) - public endpoint
  app.get("/api/webinar/stats/:webinarId", async (req: Request, res: Response) => {
    try {
      const { webinarId } = req.params;
      const sessionId = req.query.sessionId as string | undefined;
      
      const [registrationCount, interestCounts] = await Promise.all([
        storage.getRegistrationCountByWebinarId(webinarId),
        storage.getWebinarInterestCounts(webinarId)
      ]);
      
      let userVote: string | null = null;
      if (sessionId) {
        const existing = await storage.getWebinarInterestBySession(webinarId, sessionId);
        userVote = existing?.vote || null;
      }
      
      res.json({
        registrations: registrationCount,
        upvotes: interestCounts.upvotes,
        downvotes: interestCounts.downvotes,
        userVote
      });
    } catch (error) {
      console.error("Stats fetch error:", error);
      res.status(500).json({ error: "Failed to fetch webinar stats" });
    }
  });

  // Vote for webinar interest
  app.post("/api/webinar/vote", async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        webinarId: z.string(),
        sessionId: z.string(),
        vote: z.enum(["upvote", "downvote"])
      });
      
      const validatedData = schema.parse(req.body);
      
      // Rate limit by sessionId + IP combination
      const clientIp = req.ip || req.headers["x-forwarded-for"] || "unknown";
      const rateLimitKey = `${validatedData.sessionId}_${clientIp}`;
      
      if (!checkVoteRateLimit(rateLimitKey)) {
        return res.status(429).json({ error: "Too many votes. Please wait a moment before trying again." });
      }
      
      const interest = await storage.upsertWebinarInterest(validatedData);
      
      const counts = await storage.getWebinarInterestCounts(validatedData.webinarId);
      
      res.json({
        success: true,
        interest,
        upvotes: counts.upvotes,
        downvotes: counts.downvotes
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      console.error("Vote error:", error);
      res.status(500).json({ error: "Failed to record vote" });
    }
  });

  return httpServer;
}
