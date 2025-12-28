import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Gift, Users, DollarSign, ArrowRight, Check, Sparkles, Heart, Share2, Copy, Link2, Trophy } from "lucide-react";
import { SiWhatsapp, SiLinkedin } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import profileData from "@/data/profile.json";
import { trackEvent, trackWhatsApp } from "@/lib/analytics";

const benefits = [
  {
    icon: Gift,
    title: "You Get Free Session",
    description: "Receive 1 FREE coaching session (worth $141) when your friend books",
  },
  {
    icon: DollarSign,
    title: "Friend Gets 10% Off",
    description: "Your referral gets 10% discount on their first coaching package",
  },
  {
    icon: Users,
    title: "Unlimited Referrals",
    description: "No cap on referrals - keep earning free sessions forever",
  },
  {
    icon: Sparkles,
    title: "Stack with Offers",
    description: "Combine with any seasonal promotion for maximum savings",
  },
];

const steps = [
  { step: 1, text: "Share your unique referral via WhatsApp" },
  { step: 2, text: "Your friend books their first session" },
  { step: 3, text: "Both of you receive your bonuses!" },
];

export default function ReferralProgramSection() {
  const [referrerName, setReferrerName] = useState("");
  const [copied, setCopied] = useState(false);
  const [showReferralLink, setShowReferralLink] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const { contact } = profileData;

  const generateReferralCode = (name: string) => {
    const cleanName = name.trim().toLowerCase().replace(/\s+/g, '-').slice(0, 20);
    const random = Math.random().toString(36).substring(2, 6);
    return `${cleanName}-${random}`;
  };

  const referralLink = `https://fullstackmaster.net?ref=${generatedCode}`;
  const referralMessage = `Hey! I've been working with Rupesh from FullStack Master on my FAANG interview prep and it's been amazing. He's offering 10% off your first coaching session if you use my referral. Check it out: ${referralLink}`;
  
  const whatsappMessage = `Hi Rupesh! I want to refer a friend for coaching. My name is ${referrerName}. My referral code is: ${generatedCode}. Please let me know when my friend books so I can claim my free session!`;

  const handleGenerateLink = () => {
    if (referrerName.trim()) {
      const code = generateReferralCode(referrerName);
      setGeneratedCode(code);
      setShowReferralLink(true);
      trackEvent('referral_link_generated', 'engagement', code);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(referralMessage);
    setCopied(true);
    trackEvent('referral_link_copied', 'engagement', generatedCode);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="referral"
      className="py-12 md:py-16 bg-gradient-to-b from-background via-purple-50/30 dark:via-purple-950/10 to-background"
      data-testid="section-referral-program"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-pulse">
            <Heart className="w-3 h-3 mr-1" />
            Win-Win Referral Program
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" data-testid="text-referral-title">
            Refer a Friend, <span className="text-purple-600 dark:text-purple-400">Both Win</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help your colleagues land their dream jobs and earn free coaching sessions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                  <Gift className="w-5 h-5" />
                  Referral Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={benefit.title}
                      className="flex items-start gap-4 p-3 rounded-lg bg-white/50 dark:bg-black/20"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50">
                        <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-semibold">{benefit.title}</p>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <Share2 className="w-5 h-5" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                    <p className="text-lg">{step.text}</p>
                  </motion.div>
                ))}

                <div className="pt-4 space-y-4">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 border border-green-200 dark:border-green-700 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Total Value When You Refer</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">$141+ Saved</p>
                    <p className="text-xs text-muted-foreground mt-1">Per successful referral</p>
                  </div>

                  {!showReferralLink ? (
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Your Name</label>
                        <Input
                          placeholder="Enter your name to generate link"
                          value={referrerName}
                          onChange={(e) => setReferrerName(e.target.value)}
                          className="text-sm"
                          data-testid="input-referrer-name"
                        />
                      </div>
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold shadow-lg"
                        onClick={handleGenerateLink}
                        disabled={!referrerName.trim()}
                        data-testid="button-generate-referral"
                      >
                        <Link2 className="w-4 h-4 mr-2" />
                        Generate My Referral Link
                      </Button>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      <div className="p-3 bg-white dark:bg-black/30 rounded-lg border border-green-300 dark:border-green-700">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-green-600 text-white text-xs">
                            <Trophy className="w-3 h-3 mr-1" />
                            Your Unique Link
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={copyToClipboard}
                            data-testid="button-copy-referral"
                          >
                            {copied ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <p className="text-xs font-mono text-muted-foreground break-all">{referralLink}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          asChild
                        >
                          <a
                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(referralMessage)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent('referral_shared', 'social', 'whatsapp')}
                            data-testid="button-share-referral-whatsapp"
                          >
                            <SiWhatsapp className="w-4 h-4 mr-1 text-green-600" />
                            Share
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          asChild
                        >
                          <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent('referral_shared', 'social', 'linkedin')}
                            data-testid="button-share-referral-linkedin"
                          >
                            <SiLinkedin className="w-4 h-4 mr-1 text-blue-600" />
                            Share
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          asChild
                        >
                          <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(referralMessage)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent('referral_shared', 'social', 'twitter')}
                            data-testid="button-share-referral-twitter"
                          >
                            <FaXTwitter className="w-4 h-4 mr-1" />
                            Share
                          </a>
                        </Button>
                      </div>

                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold"
                        asChild
                      >
                        <a
                          href={`${contact.whatsappLink}?text=${encodeURIComponent(whatsappMessage)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackWhatsApp('referral-program')}
                          data-testid="button-refer-friend"
                        >
                          <SiWhatsapp className="w-5 h-5 mr-2" />
                          Register My Referral
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>No referral limit</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Stack with any offer</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Sessions never expire</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Instant WhatsApp enrollment</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
