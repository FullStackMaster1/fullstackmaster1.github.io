import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  Wand2, 
  Copy, 
  Check, 
  Sparkles,
  FileText,
  ArrowRight
} from "lucide-react";
import { SiWhatsapp, SiLinkedin } from "react-icons/si";
import generatorData from "@/data/linkedInGenerator.json";
import profileData from "@/data/profile.json";
import { trackEvent, trackWhatsApp } from "@/lib/analytics";

export default function LinkedInGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState(generatorData.templates[0].id);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedPost, setGeneratedPost] = useState("");
  const [copied, setCopied] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const { templates, cta, title, subtitle, badge } = generatorData;
  const { contact } = profileData;

  const currentTemplate = templates.find(t => t.id === selectedTemplate) || templates[0];

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData({ ...formData, [fieldId]: value });
  };

  const generatePost = () => {
    let post = currentTemplate.template;
    
    currentTemplate.fields.forEach(field => {
      const value = formData[field.id] || field.placeholder;
      post = post.replace(new RegExp(`\\[${field.id}\\]`, 'g'), value);
    });

    setGeneratedPost(post);
    setHasGenerated(true);
    trackEvent('linkedin_post_generated', 'engagement', currentTemplate.id);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedPost);
    setCopied(true);
    trackEvent('linkedin_post_copied', 'engagement', currentTemplate.id);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setFormData({});
    setGeneratedPost("");
    setHasGenerated(false);
  };

  return (
    <section
      id="linkedin-generator"
      className="py-12 md:py-16 bg-gradient-to-b from-background via-blue-50/30 dark:via-blue-950/10 to-background"
      data-testid="section-linkedin-generator"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <Wand2 className="w-3 h-3 mr-1" />
            {badge}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-linkedin-title">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-2 border-blue-200 dark:border-blue-800 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <SiLinkedin className="w-5 h-5 text-blue-600" />
                Choose Your Template
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={selectedTemplate} onValueChange={(v) => { setSelectedTemplate(v); resetForm(); }}>
                <TabsList className="grid w-full grid-cols-3">
                  {templates.map(template => (
                    <TabsTrigger key={template.id} value={template.id} className="text-xs sm:text-sm">
                      {template.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {templates.map(template => (
                  <TabsContent key={template.id} value={template.id} className="space-y-4 mt-4">
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {template.fields.map(field => (
                        <div key={field.id} className="space-y-1">
                          <Label htmlFor={field.id} className="text-xs font-medium">
                            {field.label}
                          </Label>
                          <Input
                            id={field.id}
                            placeholder={field.placeholder}
                            value={formData[field.id] || ""}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            className="text-sm"
                            data-testid={`input-linkedin-${field.id}`}
                          />
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={generatePost}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                      size="lg"
                      data-testid="button-linkedin-generate"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate My Post
                    </Button>
                  </TabsContent>
                ))}
              </Tabs>

              {hasGenerated && generatedPost && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="font-semibold flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Your Generated Post
                      </Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                        data-testid="button-linkedin-copy"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3 mr-1" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 whitespace-pre-wrap text-sm font-mono max-h-64 overflow-y-auto">
                      {generatedPost}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      asChild
                    >
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=https://fullstackmaster.net`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('linkedin_opened', 'social', 'generator')}
                        data-testid="button-linkedin-open"
                      >
                        <SiLinkedin className="w-4 h-4 mr-2 text-blue-600" />
                        Open LinkedIn to Post
                      </a>
                    </Button>
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      asChild
                    >
                      <a
                        href={`${contact.whatsappLink}?text=${encodeURIComponent(cta.whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsApp('linkedin-generator')}
                        data-testid="button-linkedin-whatsapp"
                      >
                        <SiWhatsapp className="w-4 h-4 mr-2" />
                        {cta.buttonText}
                      </a>
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.p
          className="text-center text-xs text-muted-foreground mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Tip: Personalize the placeholders with your real experiences for maximum engagement
        </motion.p>
      </div>
    </section>
  );
}
