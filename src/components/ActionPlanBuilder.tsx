import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Action } from "@/types/problemSolver";
import { Plus, X, ArrowUpDown } from "lucide-react";
import { useState } from "react";

interface ActionPlanBuilderProps {
  actions: Action[];
  onChange: (actions: Action[]) => void;
}

export function ActionPlanBuilder({ actions, onChange }: ActionPlanBuilderProps) {
  const [sortBy, setSortBy] = useState<"deadline" | "status">("deadline");

  const addAction = () => {
    onChange([
      ...actions,
      {
        id: crypto.randomUUID(),
        step: "",
        responsible: "",
        deadline: "",
        status: "not-started",
      },
    ]);
  };

  const removeAction = (id: string) => {
    onChange(actions.filter((a) => a.id !== id));
  };

  const updateAction = (id: string, field: keyof Action, value: any) => {
    onChange(actions.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const sortedActions = [...actions].sort((a, b) => {
    if (sortBy === "deadline") {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    const statusOrder = { "not-started": 0, "in-progress": 1, "done": 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "done":
        return "bg-success text-success-foreground";
      case "in-progress":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <span className="text-3xl">🧭</span>
              Action Plan
            </CardTitle>
            <CardDescription>
              Create concrete steps to implement your solutions
            </CardDescription>
          </div>
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-[180px]">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="deadline">Sort by Deadline</SelectItem>
              <SelectItem value="status">Sort by Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="overflow-x-auto">
          <div className="min-w-full space-y-3">
            {sortedActions.map((action) => (
              <div
                key={action.id}
                className="grid md:grid-cols-[2fr,1fr,1fr,1fr,auto] gap-3 p-4 rounded-lg border bg-card"
              >
                <Input
                  placeholder="Action step..."
                  value={action.step}
                  onChange={(e) => updateAction(action.id, "step", e.target.value)}
                />
                <Input
                  placeholder="Who's responsible?"
                  value={action.responsible}
                  onChange={(e) => updateAction(action.id, "responsible", e.target.value)}
                />
                <Input
                  type="date"
                  value={action.deadline}
                  onChange={(e) => updateAction(action.id, "deadline", e.target.value)}
                />
                <Select
                  value={action.status}
                  onValueChange={(value) => updateAction(action.id, "status", value)}
                >
                  <SelectTrigger className={getStatusColor(action.status)}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAction(action.id)}
                  className="shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={addAction} variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Action Step
        </Button>
      </CardContent>
    </Card>
  );
}
