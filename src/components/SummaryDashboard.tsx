import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProblemSolverState } from "@/types/problemSolver";
import { FileDown, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface SummaryDashboardProps {
  state: ProblemSolverState;
  onReset: () => void;
}

export function SummaryDashboard({ state, onReset }: SummaryDashboardProps) {
  const topSolutions = [...state.solutions]
    .filter((s) => s.idea)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const nextActions = [...state.actions]
    .filter((a) => a.step && a.deadline)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3);

  const generateSummaryText = () => {
    return `PROBLEM SOLVER SHEET SUMMARY
Generated: ${new Date().toLocaleString()}

═══════════════════════════════════════
📋 PROBLEM OVERVIEW
═══════════════════════════════════════
Title: ${state.problem.title}
Category: ${state.problem.category}

Description:
${state.problem.description}

Why Important:
${state.problem.importance}

Impact if Not Solved:
${state.problem.impact}

═══════════════════════════════════════
🔍 ROOT CAUSE CHAIN
═══════════════════════════════════════
${state.rootCauses
  .filter((c) => c.why)
  .map((c, i) => `Why #${i + 1}: ${c.why}`)
  .join("\n")}

═══════════════════════════════════════
💡 TOP SOLUTIONS
═══════════════════════════════════════
${topSolutions
  .map(
    (s, i) =>
      `${i + 1}. ${s.idea}
   Effort: ${s.effort}/5 | Impact: ${s.impact}/5 | Priority Score: ${s.score.toFixed(2)}`
  )
  .join("\n\n")}

═══════════════════════════════════════
🧭 NEXT ACTIONS
═══════════════════════════════════════
${nextActions
  .map(
    (a, i) =>
      `${i + 1}. ${a.step}
   Responsible: ${a.responsible}
   Deadline: ${new Date(a.deadline).toLocaleDateString()}
   Status: ${a.status.replace("-", " ").toUpperCase()}`
  )
  .join("\n\n")}

═══════════════════════════════════════
Created with Problem Solver Sheet
© 2025 ThinkFix.io – Analyze, Think, and Fix Smarter`;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generateSummaryText());
    toast.success("Summary copied to clipboard!");
  };

  const handleExportPDF = () => {
    const text = generateSummaryText();
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `problem-solver-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Report downloaded!");
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to start a new sheet? All current data will be cleared.")) {
      onReset();
      toast.success("Started new problem sheet!");
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <span className="text-3xl">📊</span>
          Summary Dashboard
        </CardTitle>
        <CardDescription>
          Your complete problem-solving analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Problem Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Title</p>
                <p className="font-medium">{state.problem.title || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium capitalize">{state.problem.category || "Not specified"}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Root Cause</CardTitle>
            </CardHeader>
            <CardContent>
              {state.rootCauses.filter((c) => c.why).length > 0 ? (
                <div className="space-y-1">
                  {state.rootCauses
                    .filter((c) => c.why)
                    .map((c, i) => (
                      <p key={i} className="text-sm">
                        <span className="font-medium text-primary">Why #{i + 1}:</span>{" "}
                        <span className="text-muted-foreground">{c.why}</span>
                      </p>
                    ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No root causes defined</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-lg">Top 3 Solutions</CardTitle>
          </CardHeader>
          <CardContent>
            {topSolutions.length > 0 ? (
              <ol className="space-y-3">
                {topSolutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-foreground text-primary font-bold shrink-0">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium">{solution.idea}</p>
                      <p className="text-sm opacity-90">
                        Priority Score: {solution.score.toFixed(2)} (Impact: {solution.impact}/5, Effort:{" "}
                        {solution.effort}/5)
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm opacity-90">No solutions brainstormed yet</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Next 3 Actions</CardTitle>
          </CardHeader>
          <CardContent>
            {nextActions.length > 0 ? (
              <div className="space-y-3">
                {nextActions.map((action, index) => (
                  <div key={action.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium">{action.step}</p>
                      <p className="text-sm text-muted-foreground">
                        {action.responsible} • {new Date(action.deadline).toLocaleDateString()} •{" "}
                        <span className="capitalize">{action.status.replace("-", " ")}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No actions planned yet</p>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleExportPDF} className="flex-1 min-w-[200px]">
            <FileDown className="w-4 h-4 mr-2" />
            Download Report
          </Button>
          <Button onClick={handleCopyText} variant="outline" className="flex-1 min-w-[200px]">
            <Copy className="w-4 h-4 mr-2" />
            Copy Summary
          </Button>
          <Button onClick={handleReset} variant="destructive" className="flex-1 min-w-[200px]">
            <RotateCcw className="w-4 h-4 mr-2" />
            Start New Sheet
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
