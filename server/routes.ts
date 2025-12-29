import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWebinarRegistrationSchema, insertWebinarInterestSchema, insertReferralSchema, insertReferredUserSchema, insertEmailSubscriptionSchema } from "@shared/schema";
import { z } from "zod";
import { sendWebinarRegistrationNotification } from "./email";

// Generate a unique referral code
function generateReferralCode(name: string): string {
  const namePart = name.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 4);
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${namePart}${randomPart}`;
}

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
    return res.status(500).json({ error: "Admin token not configured." });
  }
  
  let token = req.headers["x-admin-token"];
  if (Array.isArray(token)) {
    token = token[0];
  }
  
  token = String(token || "").trim();
  
  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Unauthorized." });
  }
  
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
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

  // Cache for playlist videos (5 minute TTL)
  const playlistCache = new Map<string, { data: any[]; expiry: number }>();
  const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

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

  // Get videos from a specific playlist
  app.get("/api/youtube/playlist/:playlistId/videos", async (req: Request, res: Response) => {
    try {
      const { playlistId } = req.params;
      const maxResults = Math.min(Number(req.query.maxResults) || 10, 50);

      if (!YOUTUBE_API_KEY) {
        return res.status(500).json({ error: "YouTube API key not configured" });
      }

      // Check cache first
      const cached = playlistCache.get(playlistId);
      if (cached && cached.expiry > Date.now()) {
        return res.json(cached.data.slice(0, maxResults));
      }

      const videosUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=50&key=${YOUTUBE_API_KEY}`;
      
      const response = await fetch(videosUrl);
      const data = await response.json();

      if (!response.ok) {
        console.error("YouTube API error:", data);
        return res.status(response.status).json({ error: data.error?.message || "Failed to fetch playlist videos" });
      }

      const videos = data.items?.map((item: any) => ({
        id: item.contentDetails.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || item.snippet.thumbnails?.high?.url,
        position: item.snippet.position,
        publishedAt: item.snippet.publishedAt,
      })).filter((v: any) => v.title !== "Private video" && v.title !== "Deleted video") || [];

      // Cache the results
      playlistCache.set(playlistId, { data: videos, expiry: Date.now() + CACHE_TTL });

      res.json(videos.slice(0, maxResults));
    } catch (error) {
      console.error("YouTube playlist videos fetch error:", error);
      res.status(500).json({ error: "Failed to fetch playlist videos" });
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

  // ========== REFERRAL SYSTEM ROUTES ==========

  // Create or get existing referral code
  app.post("/api/referral/create", async (req: Request, res: Response) => {
    try {
      const createSchema = z.object({
        name: z.string().min(2),
        email: z.string().email()
      });
      
      const { name, email } = createSchema.parse(req.body);
      
      // Check if user already has a referral code
      const existing = await storage.getReferralByEmail(email);
      if (existing) {
        return res.json({ 
          referral: existing,
          isNew: false,
          message: "Welcome back! Here's your existing referral code."
        });
      }
      
      // Generate unique referral code
      let referralCode = generateReferralCode(name);
      let attempts = 0;
      while (await storage.getReferralByCode(referralCode) && attempts < 5) {
        referralCode = generateReferralCode(name);
        attempts++;
      }
      
      const referral = await storage.createReferral({
        referrerName: name,
        referrerEmail: email,
        referralCode
      });
      
      res.status(201).json({ 
        referral,
        isNew: true,
        message: "Your referral code has been created!"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      console.error("Referral creation error:", error);
      res.status(500).json({ error: "Failed to create referral code" });
    }
  });

  // Get referral stats by code
  app.get("/api/referral/stats/:code", async (req: Request, res: Response) => {
    try {
      const { code } = req.params;
      
      const referral = await storage.getReferralByCode(code);
      if (!referral) {
        return res.status(404).json({ error: "Referral code not found" });
      }
      
      const stats = await storage.getReferralStats(code);
      const referredUsers = await storage.getReferredUsersByCode(code);
      
      res.json({
        referral,
        stats,
        referredUsers: referredUsers.map(u => ({
          name: u.referredName,
          status: u.status,
          createdAt: u.createdAt
        }))
      });
    } catch (error) {
      console.error("Referral stats error:", error);
      res.status(500).json({ error: "Failed to fetch referral stats" });
    }
  });

  // Track a referred user
  app.post("/api/referral/track", async (req: Request, res: Response) => {
    try {
      const validatedData = insertReferredUserSchema.parse(req.body);
      
      // Verify referral code exists
      const referral = await storage.getReferralByCode(validatedData.referralCode);
      if (!referral) {
        return res.status(404).json({ error: "Invalid referral code" });
      }
      
      const referredUser = await storage.createReferredUser(validatedData);
      
      res.status(201).json({ 
        success: true,
        message: "Referral tracked successfully",
        referredUser
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      console.error("Referral tracking error:", error);
      res.status(500).json({ error: "Failed to track referral" });
    }
  });

  // Validate a referral code (public endpoint)
  app.get("/api/referral/validate/:code", async (req: Request, res: Response) => {
    try {
      const { code } = req.params;
      const referral = await storage.getReferralByCode(code);
      
      if (!referral) {
        return res.json({ valid: false });
      }
      
      res.json({ 
        valid: true,
        referrerName: referral.referrerName
      });
    } catch (error) {
      console.error("Referral validation error:", error);
      res.status(500).json({ error: "Failed to validate referral code" });
    }
  });

  // Email subscription endpoint (USA compliant - CAN-SPAM, CCPA)
  app.post("/api/email/subscribe", async (req: Request, res: Response) => {
    try {
      // Get IP address and user agent for compliance
      const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
      const userAgent = req.headers['user-agent'] || 'unknown';
      
      const validatedData = insertEmailSubscriptionSchema.parse({
        ...req.body,
        ipAddress: Array.isArray(ipAddress) ? ipAddress[0] : ipAddress,
        userAgent,
        consentGiven: true, // Explicit consent required for USA
        consentDate: new Date(),
      });

      // Check if already subscribed
      const existing = await storage.getEmailSubscriptionByEmail(validatedData.email);
      if (existing && existing.isActive) {
        return res.status(200).json({ 
          message: "You're already subscribed! Check your email for the latest updates.",
          alreadySubscribed: true
        });
      }

      const subscription = await storage.createEmailSubscription(validatedData);

      // TODO: Send welcome email with lead magnet
      // TODO: Add to email service provider (ConvertKit/Mailchimp) if configured
      // For now, we just store it in the database

      res.status(201).json({ 
        message: "Successfully subscribed! Check your email for your free guide.",
        subscription: {
          id: subscription.id,
          email: subscription.email
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      console.error("Email subscription error:", error);
      res.status(500).json({ error: "Failed to subscribe. Please try again." });
    }
  });

  // Unsubscribe endpoint (CAN-SPAM compliant)
  app.post("/api/email/unsubscribe", async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: "Valid email is required" });
      }

      await storage.unsubscribeEmail(email);

      res.json({ 
        message: "Successfully unsubscribed. You will no longer receive emails from us."
      });
    } catch (error) {
      console.error("Unsubscribe error:", error);
      res.status(500).json({ error: "Failed to unsubscribe. Please try again." });
    }
  });

  // Get subscription status (for checking if already subscribed)
  app.get("/api/email/status/:email", async (req: Request, res: Response) => {
    try {
      const { email } = req.params;
      const subscription = await storage.getEmailSubscriptionByEmail(email);
      
      res.json({ 
        subscribed: subscription?.isActive || false,
        subscribedAt: subscription?.subscribedAt
      });
    } catch (error) {
      console.error("Email status error:", error);
      res.status(500).json({ error: "Failed to check subscription status" });
    }
  });

  return httpServer;
}
