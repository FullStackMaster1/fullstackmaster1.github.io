import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Mail,
  Download,
  TrendingUp,
  Target,
  Clock,
  Award,
  Sparkles
} from "lucide-react";
import EmailCaptureForm from "./EmailCaptureForm";
import { trackEvent } from "@/lib/analytics";

interface Question {
  id: number;
  question: string;
  options: {
    label: string;
    value: string;
    points: number;
  }[];
}

interface RoadmapResult {
  role: string;
  level: string;
  timeline: string;
  skills: string[];
  nextSteps: string[];
  salaryRange: string;
  roadmapUrl: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What's your current role level?",
    options: [
      { label: "Senior Engineer / Staff Engineer", value: "senior_engineer", points: 1 },
      { label: "Engineering Manager / Senior Manager", value: "manager", points: 2 },
      { label: "Principal Engineer / Architect", value: "principal", points: 3 },
      { label: "Director / Senior Director", value: "director", points: 4 },
      { label: "VP / Senior VP", value: "vp", points: 5 }
    ]
  },
  {
    id: 2,
    question: "What's your target role?",
    options: [
      { label: "Director of Engineering", value: "director", points: 3 },
      { label: "Senior Director", value: "senior_director", points: 4 },
      { label: "VP of Engineering", value: "vp", points: 5 },
      { label: "Senior Product Manager", value: "senior_pm", points: 3 },
      { label: "Senior Program Manager", value: "senior_pgm", points: 3 },
      { label: "Senior Technical Program Manager", value: "senior_tpm", points: 4 }
    ]
  },
  {
    id: 3,
    question: "Which company are you targeting?",
    options: [
      { label: "AWS / Amazon", value: "aws", points: 1 },
      { label: "Google", value: "google", points: 1 },
      { label: "Microsoft", value: "microsoft", points: 1 },
      { label: "Meta / Facebook", value: "meta", points: 1 },
      { label: "Apple", value: "apple", points: 1 },
      { label: "Other FAANG / Top Tech", value: "other", points: 1 }
    ]
  },
  {
    id: 4,
    question: "How would you rate your system design skills?",
    options: [
      { label: "Beginner - Need to learn basics", value: "beginner", points: 1 },
      { label: "Intermediate - Can design simple systems", value: "intermediate", points: 2 },
      { label: "Advanced - Can design complex distributed systems", value: "advanced", points: 3 },
      { label: "Expert - Can design at scale for millions of users", value: "expert", points: 4 }
    ]
  },
  {
    id: 5,
    question: "How comfortable are you with behavioral interviews?",
    options: [
      { label: "Not comfortable - Need to learn STAR method", value: "beginner", points: 1 },
      { label: "Somewhat comfortable - Know STAR but need practice", value: "intermediate", points: 2 },
      { label: "Comfortable - Can tell good stories", value: "advanced", points: 3 },
      { label: "Very comfortable - Strong at leadership principles", value: "expert", points: 4 }
    ]
  },
  {
    id: 6,
    question: "What's your timeline to land the role?",
    options: [
      { label: "1-3 months (Urgent)", value: "urgent", points: 1 },
      { label: "3-6 months (Active search)", value: "active", points: 2 },
      { label: "6-12 months (Planning ahead)", value: "planning", points: 3 },
      { label: "12+ months (Long-term goal)", value: "longterm", points: 4 }
    ]
  },
  {
    id: 7,
    question: "What's your biggest challenge?",
    options: [
      { label: "System design interviews", value: "system_design", points: 1 },
      { label: "Behavioral / Leadership interviews", value: "behavioral", points: 1 },
      { label: "Executive presence / Communication", value: "executive", points: 1 },
      { label: "Understanding what interviewers look for", value: "understanding", points: 1 },
      { label: "All of the above", value: "all", points: 1 }
    ]
  }
];

const roadmapResults: Record<string, RoadmapResult> = {
  director: {
    role: "Director of Engineering",
    level: "L7",
    timeline: "3-6 months",
    skills: [
      "Organizational impact & scope",
      "Cross-functional leadership",
      "Strategic vision & planning",
      "Executive communication",
      "Team building at scale"
    ],
    nextSteps: [
      "Map your experiences to org-level impact",
      "Build compelling STAR stories for Leadership Principles",
      "Practice executive presence and communication",
      "Prepare for bar raiser interviews",
      "Get personalized coaching for Director-level prep"
    ],
    salaryRange: "$350K - $500K",
    roadmapUrl: "/director-roadmap"
  },
  senior_director: {
    role: "Senior Director of Engineering",
    level: "L7-L8",
    timeline: "6-12 months",
    skills: [
      "Multi-org influence",
      "Strategic planning & vision",
      "Executive stakeholder management",
      "Organizational transformation",
      "Business impact at scale"
    ],
    nextSteps: [
      "Demonstrate multi-org impact in your stories",
      "Prepare for executive-level interviews",
      "Build strategic vision narratives",
      "Practice C-suite communication",
      "Get coaching for Senior Director prep"
    ],
    salaryRange: "$450K - $650K",
    roadmapUrl: "/senior-director-roadmap"
  },
  vp: {
    role: "VP of Engineering",
    level: "L8",
    timeline: "6-12 months",
    skills: [
      "Executive presence",
      "Organizational strategy",
      "Cross-functional influence",
      "Technical vision at scale",
      "Board-level communication"
    ],
    nextSteps: [
      "Develop executive presence and communication",
      "Build strategic vision narratives",
      "Practice organizational influence stories",
      "Prepare for VP-level interviews",
      "Get personalized VP coaching"
    ],
    salaryRange: "$500K - $750K",
    roadmapUrl: "/vp-roadmap"
  },
  senior_pm: {
    role: "Senior Product Manager",
    level: "L6-L7",
    timeline: "3-6 months",
    skills: [
      "Product strategy & vision",
      "Cross-functional leadership",
      "Data-driven decision making",
      "Stakeholder management",
      "Technical product sense"
    ],
    nextSteps: [
      "Master product strategy frameworks",
      "Build product impact stories",
      "Practice product sense interviews",
      "Prepare for PM behavioral rounds",
      "Get Senior PM interview coaching"
    ],
    salaryRange: "$300K - $450K",
    roadmapUrl: "/senior-pm-roadmap"
  },
  senior_pgm: {
    role: "Senior Program Manager",
    level: "L6-L7",
    timeline: "3-6 months",
    skills: [
      "Program management at scale",
      "Cross-functional coordination",
      "Stakeholder influence",
      "Risk management",
      "Strategic planning"
    ],
    nextSteps: [
      "Master program management frameworks",
      "Build program impact stories",
      "Practice PM behavioral interviews",
      "Prepare for program management rounds",
      "Get Senior PGM interview coaching"
    ],
    salaryRange: "$250K - $400K",
    roadmapUrl: "/senior-pgm-roadmap"
  },
  senior_tpm: {
    role: "Senior Technical Program Manager",
    level: "L6-L7",
    timeline: "3-6 months",
    skills: [
      "Technical program management",
      "System design understanding",
      "Cross-functional technical leadership",
      "Stakeholder management",
      "Technical strategy"
    ],
    nextSteps: [
      "Master TPM frameworks and methodologies",
      "Build technical program impact stories",
      "Practice system design for TPM roles",
      "Prepare for TPM behavioral interviews",
      "Get Senior TPM interview coaching"
    ],
    salaryRange: "$300K - $450K",
    roadmapUrl: "/senior-tpm-roadmap"
  }
};

export default function RoleAssessmentQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [result, setResult] = useState<RoadmapResult | null>(null);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion + 1]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      trackEvent("quiz_answer", "engagement", `question_${currentQuestion + 1}`);
    } else {
      // Calculate result
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (allAnswers: Record<number, string>) => {
    // Determine target role from question 2
    const targetRole = allAnswers[2];
    
    // Get roadmap result
    const roadmapResult = roadmapResults[targetRole] || roadmapResults.director;
    setResult(roadmapResult);
    setShowEmailCapture(true);
    trackEvent("quiz_complete", "engagement", targetRole);
  };

  const handleEmailCaptured = () => {
    setShowEmailCapture(false);
    setShowResult(true);
    trackEvent("roadmap_email_captured", "conversion", result?.role || "unknown");
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showEmailCapture && result) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-5 h-5 text-primary" />
            <CardTitle>Get Your Personalized Roadmap</CardTitle>
          </div>
          <CardDescription>
            Enter your email to receive your complete {result.role} roadmap with detailed steps, timelines, and resources.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmailCaptureForm
            formId="role-assessment-quiz"
            onSuccess={handleEmailCaptured}
            buttonText="Get My Roadmap"
            successMessage="Check your email! Your personalized roadmap is on its way."
            showGumroadLink={false}
          />
        </CardContent>
      </Card>
    );
  }

  if (showResult && result) {
    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <CardTitle>Your Personalized Roadmap</CardTitle>
          </div>
          <CardDescription>
            Based on your answers, here's your path to {result.role}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{result.role}</div>
              <div className="text-sm text-muted-foreground">{result.level}</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{result.timeline}</div>
              <div className="text-sm text-muted-foreground">Timeline</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{result.salaryRange}</div>
              <div className="text-sm text-muted-foreground">Salary Range</div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Key Skills to Develop
            </h3>
            <ul className="space-y-2">
              {result.skills.map((skill, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Your Next Steps</h3>
            <ol className="space-y-2 list-decimal list-inside">
              {result.nextSteps.map((step, idx) => (
                <li key={idx} className="text-muted-foreground">{step}</li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
            <Button size="lg" className="flex-1" asChild>
              <a href={result.roadmapUrl}>
                <Download className="w-4 h-4 mr-2" />
                Download Full Roadmap PDF
              </a>
            </Button>
            <Button size="lg" variant="outline" className="flex-1" onClick={() => {
              trackEvent("quiz_book_coaching", "conversion", result.role);
              window.location.href = "/book";
            }}>
              Get Personalized Coaching
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>Find Your Path to Director/VP</CardTitle>
          <Badge variant="outline">
            {currentQuestion + 1} of {questions.length}
          </Badge>
        </div>
        <Progress value={progress} className="mb-4" />
        <CardDescription>
          Answer 7 quick questions to get your personalized roadmap
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="w-full justify-start h-auto py-3 px-4 text-left"
                  onClick={() => handleAnswer(option.value)}
                >
                  <span className="flex-1">{option.label}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

