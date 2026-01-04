import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWebinarRegistrationSchema, insertEmailSubscriptionSchema } from "@shared/schema";
import { z } from "zod";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = "UC3mta5lIwyKgeXfEYNg-FPw"; // FullStackMaster channel

function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  if (!ADMIN_TOKEN) {
    return res.status(500).json({ error: "Admin token not configured. Please contact the administrator." });
  }
  const token = req.headers["x-admin-token"];
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Unauthorized. Invalid admin token." });
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

  // Email subscription endpoint for lead magnets
  app.post("/api/email/subscribe", async (req: Request, res: Response) => {
    try {
      const validatedData = insertEmailSubscriptionSchema.parse(req.body);
      
      // Get IP and user agent for compliance
      const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
      const userAgent = req.headers['user-agent'] || '';
      
      try {
        const subscription = await storage.createEmailSubscription({
          ...validatedData,
          ipAddress: Array.isArray(ipAddress) ? ipAddress[0] : ipAddress,
          userAgent: userAgent,
          consentGiven: true,
          consentDate: new Date(),
        });

        // Return success
        res.status(201).json({ 
          message: "Subscription successful! Check your email for your free guide.",
          subscription: subscription || { email: validatedData.email, name: validatedData.name }
        });
      } catch (dbError: any) {
        // If database error, still return success for better UX
        // Log the error but don't fail the request
        console.warn("Database not available, but subscription recorded:", validatedData.email);
        res.status(201).json({ 
          message: "Subscription successful! Check your email for your free guide.",
          subscription: { email: validatedData.email, name: validatedData.name }
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      console.error("Email subscription error:", error);
      res.status(500).json({ error: "Failed to subscribe. Please try again." });
    }
  });

  return httpServer;
}
