import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProblemData } from "@/types/problemSolver";
import { useState, useEffect } from "react";

interface ProblemDefinitionProps {
  data: ProblemData;
  onChange: (data: ProblemData) => void;
}

export function ProblemDefinition({ data, onChange }: ProblemDefinitionProps) {
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    setWordCount(data.description.trim().split(/\s+/).filter(Boolean).length);
  }, [data.description]);

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <span className="text-3xl">🧩</span>
          Define Your Problem
        </CardTitle>
        <CardDescription>
          Clearly articulate the problem you're trying to solve
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Problem Title</Label>
          <Input
            id="title"
            placeholder="e.g., Low productivity in the morning"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            className="text-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the problem in detail..."
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            className="min-h-[120px] resize-none"
          />
          <p className="text-xs text-muted-foreground text-right">
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={data.category} onValueChange={(value) => onChange({ ...data, category: value })}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="study">Study</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="importance">Why is this important?</Label>
          <Textarea
            id="importance"
            placeholder="Explain why solving this matters to you..."
            value={data.importance}
            onChange={(e) => onChange({ ...data, importance: e.target.value })}
            className="min-h-[80px] resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="impact">Impact if not solved</Label>
          <Textarea
            id="impact"
            placeholder="What happens if this problem continues..."
            value={data.impact}
            onChange={(e) => onChange({ ...data, impact: e.target.value })}
            className="min-h-[80px] resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
}
