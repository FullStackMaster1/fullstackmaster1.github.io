import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Download, Palette, Type, Image, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logoImage from "@assets/fullstack_master_logo_1764259679495.jpeg";

interface ColorSwatch {
  name: string;
  hex: string;
  hsl: string;
  usage: string;
}

const brandColors: ColorSwatch[] = [
  {
    name: "Navy Blue",
    hex: "#2563EB",
    hsl: "215 80% 45%",
    usage: "Primary - Headers, links, trust elements"
  },
  {
    name: "Crimson Red",
    hex: "#DC2626",
    hsl: "355 75% 50%",
    usage: "CTAs - Book Now buttons, urgent actions"
  },
  {
    name: "Cyan/Turquoise",
    hex: "#0891B2",
    hsl: "185 70% 42%",
    usage: "Accent - Highlights, info badges, icons"
  },
  {
    name: "Charcoal",
    hex: "#1E293B",
    hsl: "220 20% 12%",
    usage: "Dark Mode - Backgrounds, dark sections"
  },
  {
    name: "White",
    hex: "#FAFAFA",
    hsl: "0 0% 98%",
    usage: "Light backgrounds, cards"
  },
  {
    name: "Gray",
    hex: "#64748B",
    hsl: "215 15% 45%",
    usage: "Secondary text, muted elements"
  }
];

const fonts = [
  {
    name: "Inter",
    usage: "Primary - Body text, UI elements",
    weights: "400, 500, 600, 700",
    css: "font-family: 'Inter', sans-serif;"
  },
  {
    name: "DM Sans",
    usage: "Headlines - Hero sections, titles",
    weights: "500, 600, 700",
    css: "font-family: 'DM Sans', sans-serif;"
  },
  {
    name: "Fira Code",
    usage: "Code - Technical content, badges",
    weights: "400, 500",
    css: "font-family: 'Fira Code', monospace;"
  }
];

const logoGuidelines = [
  "Minimum size: 120px width for digital, 1 inch for print",
  "Clear space: Equal to the height of the 'F' in FULLSTACK",
  "Dark backgrounds: Use white/light logo version",
  "Light backgrounds: Use full color logo",
  "Never stretch, rotate, or add effects to the logo"
];

export default function BrandingAdmin() {
  const { toast } = useToast();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(label);
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
      });
      setTimeout(() => setCopiedItem(null), 2000);
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please copy manually",
        variant: "destructive"
      });
    }
  };

  const exportBrandKit = () => {
    const brandKit = {
      brand: "FullStack Master",
      website: "https://fullstackmaster1.github.io",
      colors: brandColors.map(c => ({ name: c.name, hex: c.hex, hsl: c.hsl, usage: c.usage })),
      fonts: fonts,
      logoGuidelines: logoGuidelines,
      socialHandles: {
        youtube: "@anthropic-fullstackmaster",
        linkedin: "in/anthropic-fullstackmaster",
        github: "FullStackMaster1"
      },
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(brandKit, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fullstackmaster-brand-kit.json";
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Brand Kit Exported!",
      description: "JSON file downloaded successfully",
    });
  };

  const exportCSS = () => {
    const css = `:root {
  /* FullStack Master Brand Colors */
  --brand-navy: hsl(215, 80%, 45%);
  --brand-crimson: hsl(355, 75%, 50%);
  --brand-cyan: hsl(185, 70%, 42%);
  --brand-charcoal: hsl(220, 20%, 12%);
  --brand-white: hsl(0, 0%, 98%);
  --brand-gray: hsl(215, 15%, 45%);
  
  /* Usage */
  --color-primary: var(--brand-navy);
  --color-cta: var(--brand-crimson);
  --color-accent: var(--brand-cyan);
  --color-background-dark: var(--brand-charcoal);
  --color-background-light: var(--brand-white);
  --color-text-muted: var(--brand-gray);
  
  /* Fonts */
  --font-primary: 'Inter', sans-serif;
  --font-heading: 'DM Sans', sans-serif;
  --font-code: 'Fira Code', monospace;
}`;
    
    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fullstackmaster-brand.css";
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "CSS Variables Exported!",
      description: "CSS file downloaded successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground" data-testid="text-page-title">
              Brand Kit
            </h1>
            <p className="text-muted-foreground mt-1">
              FullStack Master branding guidelines for websites, videos, and social media
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={exportBrandKit} data-testid="button-export-json">
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
            <Button variant="outline" onClick={exportCSS} data-testid="button-export-css">
              <FileText className="w-4 h-4 mr-2" />
              Export CSS
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Brand Colors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {brandColors.map((color) => (
                  <div 
                    key={color.name}
                    className="border rounded-lg overflow-hidden"
                    data-testid={`color-swatch-${color.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div 
                      className="h-20 w-full"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="p-3 bg-card">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-foreground">{color.name}</span>
                        <Badge variant="secondary" className="text-xs">{color.hex}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{color.usage}</p>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 text-xs"
                          onClick={() => copyToClipboard(color.hex, `${color.name} HEX`)}
                          data-testid={`button-copy-hex-${color.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {copiedItem === `${color.name} HEX` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          HEX
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 text-xs"
                          onClick={() => copyToClipboard(color.hsl, `${color.name} HSL`)}
                          data-testid={`button-copy-hsl-${color.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {copiedItem === `${color.name} HSL` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          HSL
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="w-5 h-5" />
                Typography
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {fonts.map((font) => (
                  <div 
                    key={font.name}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg gap-4"
                    data-testid={`font-item-${font.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="flex-1">
                      <h3 
                        className="text-xl font-semibold"
                        style={{ fontFamily: font.name === "Fira Code" ? "monospace" : font.name }}
                      >
                        {font.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{font.usage}</p>
                      <p className="text-xs text-muted-foreground mt-1">Weights: {font.weights}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(font.css, `${font.name} CSS`)}
                      data-testid={`button-copy-font-${font.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {copiedItem === `${font.name} CSS` ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                      Copy CSS
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5" />
                Logo Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="border rounded-lg p-6 bg-white flex items-center justify-center mb-4">
                    <img 
                      src={logoImage} 
                      alt="FullStack Master Logo" 
                      className="max-h-24 object-contain"
                      data-testid="img-logo-light"
                    />
                  </div>
                  <p className="text-sm text-center text-muted-foreground">On light backgrounds</p>
                </div>
                <div>
                  <div className="border rounded-lg p-6 bg-slate-900 flex items-center justify-center mb-4">
                    <img 
                      src={logoImage} 
                      alt="FullStack Master Logo Dark" 
                      className="max-h-24 object-contain brightness-0 invert"
                      data-testid="img-logo-dark"
                    />
                  </div>
                  <p className="text-sm text-center text-muted-foreground">On dark backgrounds</p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Guidelines</h4>
                <ul className="space-y-2">
                  {logoGuidelines.map((guideline, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">•</span>
                      {guideline}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Color Usage Guide</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: "#2563EB" }} />
                      <span><strong>Navy Blue</strong> - Headers, links, navigation, primary buttons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: "#DC2626" }} />
                      <span><strong>Crimson</strong> - "Book Now" CTAs, urgent messages, alerts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: "#0891B2" }} />
                      <span><strong>Cyan</strong> - Accents, badges, icons, secondary highlights</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: "#1E293B" }} />
                      <span><strong>Charcoal</strong> - Dark mode backgrounds, footer</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">YouTube/Video Settings</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>Thumbnail background:</strong> Navy Blue or Charcoal</p>
                    <p><strong>Text overlay:</strong> White on dark, Navy on light</p>
                    <p><strong>CTA text:</strong> Crimson for "Subscribe", "Watch Now"</p>
                    <p><strong>Accent elements:</strong> Cyan for highlights, arrows</p>
                    <p><strong>Font:</strong> DM Sans Bold for titles, Inter for subtitles</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>FullStack Master Brand Kit • Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
