import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWebinarRegistrationSchema } from "@shared/schema";
import { z } from "zod";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "rupesh-admin-2024";

function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
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

  return httpServer;
}
