import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, DollarSign, Briefcase, ArrowRight, Sparkles, AlertTriangle, Clock } from "lucide-react";
import { SiWhatsapp, SiLinkedin } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { trackEvent, trackWhatsApp } from "@/lib/analytics";
import profileData from "@/data/profile.json";

const roles = [
  { value: "senior-engineer", label: "Senior Engineer", avgIncrease: 35 },
  { value: "staff-engineer", label: "Staff Engineer", avgIncrease: 45 },
  { value: "principal-engineer", label: "Principal Engineer", avgIncrease: 55 },
  { value: "solutions-architect", label: "Solutions Architect", avgIncrease: 40 },
  { value: "engineering-manager", label: "Engineering Manager", avgIncrease: 50 },
  { value: "director", label: "Director of Engineering", avgIncrease: 60 },
  { value: "vp", label: "VP of Engineering", avgIncrease: 75 },
];

export default function SalaryCalculator() {
  const [currentSalary, setCurrentSalary] = useState(180000);
  const [targetRole, setTargetRole] = useState("staff-engineer");
  const [showResult, setShowResult] = useState(false);
  const { contact } = profileData;

  const selectedRole = roles.find(r => r.value === targetRole) || roles[1];
  const potentialIncrease = Math.round(currentSalary * (selectedRole.avgIncrease / 100));
  const potentialSalary = currentSalary + potentialIncrease;
  const roi = Math.round((potentialIncrease / 600) * 100);
  const monthlyLoss = Math.round(potentialIncrease / 12);
  const yearsWaiting = 3;
  const opportunityCost = potentialIncrease * yearsWaiting;

  const shareText = `I just calculated my potential salary increase with FAANG coaching: $${potentialIncrease.toLocaleString()}/year! Check out @FullStackMaster for interview coaching.`;
  const shareUrl = "https://fullstackmaster.net";
  
  const whatsappMessage = `Hi Rupesh! I used the salary calculator and discovered I could be earning $${potentialIncrease.toLocaleString()} more per year as a ${selectedRole.label}. I'm ready to discuss coaching!`;

  const handleCalculate = () => {
    setShowResult(true);
    trackEvent('salary_calculated', 'engagement', `${targetRole}_${currentSalary}`);
  };

  return (
    <section
      id="calculator"
      className="py-12 md:py-16 bg-gradient-to-b from-background via-green-50/30 dark:via-green-950/10 to-background"
      data-testid="section-salary-calculator"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <Calculator className="w-3 h-3 mr-1" />
            ROI Calculator
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-calculator-title">
            Calculate Your <span className="text-green-600 dark:text-green-400">Potential Earnings</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how much your next role could increase your salary after coaching
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-2 border-green-200 dark:border-green-800 shadow-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Salary Potential Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  Current Base Salary (USD)
                </label>
                <div className="space-y-2">
                  <Slider
                    value={[currentSalary]}
                    onValueChange={(value) => {
                      setCurrentSalary(value[0]);
                      setShowResult(false);
                    }}
                    min={100000}
                    max={500000}
                    step={10000}
                    className="w-full"
                    data-testid="slider-salary"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>$100K</span>
                    <span className="text-lg font-bold text-foreground">${currentSalary.toLocaleString()}</span>
                    <span>$500K</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-green-600" />
                  Target Role
                </label>
                <Select
                  value={targetRole}
                  onValueChange={(value) => {
                    setTargetRole(value);
                    setShowResult(false);
                  }}
                >
                  <SelectTrigger data-testid="select-role">
                    <SelectValue placeholder="Select target role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label} (+{role.avgIncrease}% avg increase)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {!showResult && (
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold"
                  onClick={handleCalculate}
                  data-testid="button-calculate"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate My Potential
                </Button>
              )}

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="p-6 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700">
                    <div className="text-center space-y-3">
                      <p className="text-sm text-muted-foreground">Your potential new salary</p>
                      <p className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400" data-testid="text-potential-salary">
                        ${potentialSalary.toLocaleString()}
                      </p>
                      <Badge className="bg-green-600 text-white text-lg px-4 py-1">
                        +${potentialIncrease.toLocaleString()}/year
                      </Badge>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 rounded-lg bg-white/50 dark:bg-black/20">
                        <p className="text-xs text-muted-foreground">5-Year Earnings Boost</p>
                        <p className="text-xl font-bold text-green-700 dark:text-green-300">
                          +${(potentialIncrease * 5).toLocaleString()}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-white/50 dark:bg-black/20">
                        <p className="text-xs text-muted-foreground">ROI on Coaching</p>
                        <p className="text-xl font-bold text-green-700 dark:text-green-300">
                          {roi.toLocaleString()}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border border-red-200 dark:border-red-800">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/50">
                        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-red-800 dark:text-red-300 text-sm mb-1">
                          Every Month You Wait Costs You ${monthlyLoss.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          If you delay your career move by {yearsWaiting} years, you'll lose{" "}
                          <span className="font-bold text-red-600">${opportunityCost.toLocaleString()}</span> in potential earnings.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      size="lg"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold"
                      asChild
                    >
                      <a
                        href={`${contact.whatsappLink}?text=${encodeURIComponent(whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsApp('salary-calculator')}
                        data-testid="button-book-coaching"
                      >
                        <SiWhatsapp className="w-4 h-4 mr-2" />
                        Start Earning More Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Most clients see results in 4-6 weeks</span>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-center text-muted-foreground mb-3">Share your potential with your network</p>
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        data-testid="button-share-linkedin"
                      >
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <SiLinkedin className="w-4 h-4 mr-2 text-blue-600" />
                          LinkedIn
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        data-testid="button-share-twitter"
                      >
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaXTwitter className="w-4 h-4 mr-2" />
                          X/Twitter
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        data-testid="button-share-whatsapp"
                      >
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <SiWhatsapp className="w-4 h-4 mr-2 text-green-600" />
                          WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              <p className="text-xs text-center text-muted-foreground">
                *Based on average salary increases reported by coached professionals. Individual results vary.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
