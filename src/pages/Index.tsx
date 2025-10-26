import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProgressTracker } from "@/components/ProgressTracker";
import { ProblemDefinition } from "@/components/ProblemDefinition";
import { RootCauseAnalysis } from "@/components/RootCauseAnalysis";
import { BrainstormingSolutions } from "@/components/BrainstormingSolutions";
import { ActionPlanBuilder } from "@/components/ActionPlanBuilder";
import { SummaryDashboard } from "@/components/SummaryDashboard";
import { ProblemSolverState } from "@/types/problemSolver";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ArrowRight, ArrowLeft, ArrowUp, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 0, name: "Problem", icon: "🧩" },
  { id: 1, name: "Root Cause", icon: "🔍" },
  { id: 2, name: "Solutions", icon: "💡" },
  { id: 3, name: "Action Plan", icon: "🧭" },
  { id: 4, name: "Summary", icon: "📊" },
];

const INITIAL_STATE: ProblemSolverState = {
  problem: {
    title: "",
    description: "",
    importance: "",
    impact: "",
    category: "",
  },
  rootCauses: [{ why: "" }, { why: "" }, { why: "" }, { why: "" }, { why: "" }],
  solutions: [{ idea: "", effort: 3, impact: 3, score: 1 }],
  actions: [],
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [state, setState] = useLocalStorage<ProblemSolverState>("problem-solver-state", INITIAL_STATE);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      scrollToTop();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      scrollToTop();
    }
  };

  const handleReset = () => {
    setState(INITIAL_STATE);
    setCurrentStep(0);
    scrollToTop();
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="sticky top-0 z-50 bg-card border-b shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-8 h-8 text-primary" />
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Problem Solver Sheet
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <ProgressTracker currentStep={currentStep} steps={STEPS} />

          <div className="mb-8">
            {currentStep === 0 && (
              <ProblemDefinition
                data={state.problem}
                onChange={(problem) => setState({ ...state, problem })}
              />
            )}
            {currentStep === 1 && (
              <RootCauseAnalysis
                causes={state.rootCauses}
                onChange={(rootCauses) => setState({ ...state, rootCauses })}
              />
            )}
            {currentStep === 2 && (
              <BrainstormingSolutions
                solutions={state.solutions}
                onChange={(solutions) => setState({ ...state, solutions })}
              />
            )}
            {currentStep === 3 && (
              <ActionPlanBuilder
                actions={state.actions}
                onChange={(actions) => setState({ ...state, actions })}
              />
            )}
            {currentStep === 4 && <SummaryDashboard state={state} onReset={handleReset} />}
          </div>

          <div className="flex justify-between gap-4">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              variant="outline"
              size="lg"
              className="min-w-[120px]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            {currentStep < STEPS.length - 1 && (
              <Button onClick={handleNext} size="lg" className="min-w-[120px]">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-16 py-6 border-t bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 ProblemSolverSheet.com – Analyze, Think, and Fix Smarter</p>
        </div>
      </footer>

      <Button
        onClick={scrollToTop}
        size="icon"
        className={cn(
          "fixed bottom-8 right-8 rounded-full shadow-xl transition-all duration-300",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"
        )}
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Index;
