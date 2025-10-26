import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RootCause } from "@/types/problemSolver";
import { RotateCcw, ArrowDown } from "lucide-react";

interface RootCauseAnalysisProps {
  causes: RootCause[];
  onChange: (causes: RootCause[]) => void;
}

export function RootCauseAnalysis({ causes, onChange }: RootCauseAnalysisProps) {
  const handleCauseChange = (index: number, value: string) => {
    const newCauses = [...causes];
    newCauses[index] = { why: value };
    onChange(newCauses);
  };

  const handleReset = () => {
    onChange([{ why: "" }, { why: "" }, { why: "" }, { why: "" }, { why: "" }]);
  };

  const visibleCount = causes.findIndex((c) => !c.why) === -1 ? 5 : causes.findIndex((c) => !c.why) + 1;

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <span className="text-3xl">🔍</span>
              Root Cause Analysis
            </CardTitle>
            <CardDescription>
              Use the "5 Whys" technique to dig deeper into the problem
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {causes.slice(0, visibleCount).map((cause, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2">
              {index > 0 && <ArrowDown className="w-4 h-4 text-primary" />}
              <Label htmlFor={`why-${index + 1}`} className="font-semibold">
                Why #{index + 1}
              </Label>
            </div>
            <Textarea
              id={`why-${index + 1}`}
              placeholder={`Why does this happen? ${index === 0 ? "(Start here)" : ""}`}
              value={cause.why}
              onChange={(e) => handleCauseChange(index, e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>
        ))}

        {visibleCount === 5 && causes.every((c) => c.why) && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-xl">💡</span>
              Root Cause Chain
            </h4>
            <div className="space-y-2 text-sm">
              {causes.map((cause, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="font-medium text-primary">Why #{index + 1}:</span>
                  <span className="text-muted-foreground">{cause.why}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
