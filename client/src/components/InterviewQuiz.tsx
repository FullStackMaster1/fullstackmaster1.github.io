import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ClipboardCheck, 
  ArrowRight, 
  ArrowLeft, 
  Trophy, 
  Target, 
  Construction, 
  Sprout,
  Share2,
  RotateCcw,
  Sparkles,
  CheckCircle
} from "lucide-react";
import { SiWhatsapp, SiLinkedin } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import quizData from "@/data/interviewQuiz.json";
import profileData from "@/data/profile.json";
import { trackEvent, trackWhatsApp } from "@/lib/analytics";

const resultIcons: Record<string, any> = {
  trophy: Trophy,
  target: Target,
  construction: Construction,
  seedling: Sprout,
};

const resultColors: Record<string, string> = {
  green: "from-green-500 to-emerald-500 text-white",
  blue: "from-blue-500 to-cyan-500 text-white",
  amber: "from-amber-500 to-orange-500 text-white",
  purple: "from-purple-500 to-pink-500 text-white",
};

export default function InterviewQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const { questions, results, cta, shareText, shareUrl, title, subtitle, badge } = quizData;
  const { contact, personal } = profileData;

  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
  const maxScore = totalQuestions * 4;

  const getResult = () => {
    if (totalScore >= results.excellent.minScore) return results.excellent;
    if (totalScore >= results.good.minScore) return results.good;
    if (totalScore >= results.needsWork.minScore) return results.needsWork;
    return results.beginner;
  };

  const getWeakAreas = () => {
    const categoryScores: Record<string, { total: number; count: number }> = {};
    
    questions.forEach((q, index) => {
      const score = answers[index] || 0;
      if (!categoryScores[q.category]) {
        categoryScores[q.category] = { total: 0, count: 0 };
      }
      categoryScores[q.category].total += score;
      categoryScores[q.category].count += 1;
    });

    return Object.entries(categoryScores)
      .map(([category, { total, count }]) => ({
        category,
        avgScore: total / count,
      }))
      .filter((c) => c.avgScore < 3)
      .map((c) => c.category)
      .slice(0, 3);
  };

  const handleAnswer = (score: number) => {
    setAnswers({ ...answers, [currentQuestion]: score });
    trackEvent('quiz_answer', 'engagement', `question_${currentQuestion + 1}`);

    if (currentQuestion < totalQuestions - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => {
        setShowResult(true);
        trackEvent('quiz_completed', 'engagement', `score_${totalScore}`);
      }, 300);
    }
  };

  const handleStart = () => {
    setHasStarted(true);
    trackEvent('quiz_started', 'engagement', 'interview_readiness');
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    trackEvent('quiz_restarted', 'engagement', 'interview_readiness');
  };

  const result = getResult();
  const weakAreas = getWeakAreas();
  const ResultIcon = resultIcons[result.emoji] || Trophy;

  const whatsappMessage = cta.whatsappMessage
    .replace('[SCORE]', totalScore.toString())
    .replace('[AREAS]', weakAreas.join(', ') || 'None identified');

  const shareMessage = shareText
    .replace('[SCORE]', totalScore.toString());

  if (!hasStarted) {
    return (
      <section
        id="quiz"
        className="py-12 md:py-16 bg-gradient-to-b from-background via-indigo-50/30 dark:via-indigo-950/10 to-background"
        data-testid="section-interview-quiz"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <ClipboardCheck className="w-3 h-3 mr-1" />
              {badge}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3" data-testid="text-quiz-title">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-6">
              {subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-2 border-indigo-200 dark:border-indigo-800 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white text-center">
                <ClipboardCheck className="w-12 h-12 mx-auto mb-3 opacity-90" />
                <h3 className="text-xl font-bold mb-2">10 Quick Questions</h3>
                <p className="text-white/80 text-sm">Takes only 2 minutes</p>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-indigo-600">50+</p>
                    <p className="text-xs text-muted-foreground">Clients Assessed</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">92%</p>
                    <p className="text-xs text-muted-foreground">Found Gaps</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Get personalized readiness score</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Identify your weak areas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Get custom prep recommendations</span>
                  </div>
                </div>
                <Button 
                  onClick={handleStart}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                  size="lg"
                  data-testid="button-quiz-start"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start Free Assessment
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  if (showResult) {
    return (
      <section
        id="quiz"
        className="py-12 md:py-16 bg-gradient-to-b from-background via-indigo-50/30 dark:via-indigo-950/10 to-background"
        data-testid="section-interview-quiz"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-indigo-200 dark:border-indigo-800 shadow-xl overflow-hidden">
              <div className={`bg-gradient-to-r ${resultColors[result.color]} p-6 text-center`}>
                <ResultIcon className="w-16 h-16 mx-auto mb-3" />
                <h3 className="text-2xl font-bold mb-1">{result.title}</h3>
                <p className="text-3xl font-bold">{totalScore}/{maxScore}</p>
              </div>
              <CardContent className="p-6 space-y-5">
                <p className="text-center text-muted-foreground">{result.description}</p>

                {weakAreas.length > 0 && (
                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                    <p className="font-semibold text-amber-800 dark:text-amber-300 text-sm mb-2">
                      Areas to Focus On:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {weakAreas.map((area) => (
                        <Badge key={area} variant="outline" className="border-amber-400 text-amber-700 dark:text-amber-300">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
                  <p className="font-semibold text-indigo-800 dark:text-indigo-300 text-sm mb-1">
                    My Recommendation:
                  </p>
                  <p className="text-sm text-muted-foreground">{result.recommendation}</p>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                    asChild
                  >
                    <a
                      href={`${contact.whatsappLink}?text=${encodeURIComponent(whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackWhatsApp('quiz-result')}
                      data-testid="button-quiz-whatsapp"
                    >
                      <SiWhatsapp className="w-4 h-4 mr-2" />
                      {cta.buttonText}
                    </a>
                  </Button>

                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">Share your result:</p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                      >
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackEvent('quiz_shared', 'social', 'linkedin')}
                          data-testid="button-quiz-share-linkedin"
                        >
                          <SiLinkedin className="w-4 h-4 text-blue-600" />
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                      >
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackEvent('quiz_shared', 'social', 'twitter')}
                          data-testid="button-quiz-share-twitter"
                        >
                          <FaXTwitter className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                      >
                        <a
                          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage + ' ' + shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackEvent('quiz_shared', 'social', 'whatsapp')}
                          data-testid="button-quiz-share-whatsapp"
                        >
                          <SiWhatsapp className="w-4 h-4 text-green-600" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={handleRestart}
                    className="w-full"
                    data-testid="button-quiz-restart"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Take Quiz Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  const question = questions[currentQuestion];

  return (
    <section
      id="quiz"
      className="py-12 md:py-16 bg-gradient-to-b from-background via-indigo-50/30 dark:via-indigo-950/10 to-background"
      data-testid="section-interview-quiz"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-2 border-indigo-200 dark:border-indigo-800 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  {question.category}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {currentQuestion + 1} of {totalQuestions}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold mb-4" data-testid="text-quiz-question">
                    {question.question}
                  </h3>
                  <div className="space-y-2">
                    {question.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option.score)}
                        className={`w-full p-3 text-left rounded-lg border transition-all duration-200 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 ${
                          answers[currentQuestion] === option.score
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30'
                            : 'border-border'
                        }`}
                        data-testid={`button-quiz-option-${index}`}
                      >
                        <span className="text-sm">{option.text}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between pt-2">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  data-testid="button-quiz-prev"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
                {answers[currentQuestion] !== undefined && currentQuestion < totalQuestions - 1 && (
                  <Button
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    data-testid="button-quiz-next"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
