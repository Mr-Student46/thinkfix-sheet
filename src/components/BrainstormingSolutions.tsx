import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Solution } from "@/types/problemSolver";
import { Plus, X } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface BrainstormingSolutionsProps {
  solutions: Solution[];
  onChange: (solutions: Solution[]) => void;
}

export function BrainstormingSolutions({ solutions, onChange }: BrainstormingSolutionsProps) {
  const addSolution = () => {
    onChange([...solutions, { idea: "", effort: 3, impact: 3, score: 1 }]);
  };

  const removeSolution = (index: number) => {
    onChange(solutions.filter((_, i) => i !== index));
  };

  const updateSolution = (index: number, field: keyof Solution, value: any) => {
    const newSolutions = [...solutions];
    newSolutions[index] = { ...newSolutions[index], [field]: value };
    
    if (field === "effort" || field === "impact") {
      newSolutions[index].score = newSolutions[index].effort > 0 
        ? newSolutions[index].impact / newSolutions[index].effort 
        : 0;
    }
    
    onChange(newSolutions);
  };

  const chartData = solutions
    .filter((s) => s.idea)
    .map((s, i) => ({
      name: `Idea ${i + 1}`,
      score: Number(s.score.toFixed(2)),
    }));

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <span className="text-3xl">💡</span>
          Brainstorm Solutions
        </CardTitle>
        <CardDescription>
          List potential solutions and rate their effort vs. impact
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {solutions.map((solution, index) => (
          <div key={index} className="p-4 rounded-lg border bg-card space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Solution idea..."
                value={solution.idea}
                onChange={(e) => updateSolution(index, "idea", e.target.value)}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSolution(index)}
                className="shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Effort (1-5)</Label>
                <Slider
                  value={[solution.effort]}
                  onValueChange={([value]) => updateSolution(index, "effort", value)}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <p className="text-sm text-center font-medium">{solution.effort}</p>
              </div>

              <div className="space-y-2">
                <Label>Impact (1-5)</Label>
                <Slider
                  value={[solution.impact]}
                  onValueChange={([value]) => updateSolution(index, "impact", value)}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <p className="text-sm text-center font-medium">{solution.impact}</p>
              </div>

              <div className="space-y-2">
                <Label>Priority Score</Label>
                <div className="flex items-center justify-center h-10 rounded-md bg-primary text-primary-foreground font-bold">
                  {solution.score.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        ))}

        <Button onClick={addSolution} variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add New Idea
        </Button>

        {chartData.length > 0 && (
          <div className="mt-8 p-4 rounded-lg bg-muted">
            <h4 className="font-semibold mb-4">Priority Score Comparison</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
