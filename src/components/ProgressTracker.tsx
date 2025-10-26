import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  name: string;
  icon: string;
}

interface ProgressTrackerProps {
  currentStep: number;
  steps: Step[];
}

export function ProgressTracker({ currentStep, steps }: ProgressTrackerProps) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-between gap-2 md:gap-4">
        {steps.map((step, index) => (
          <li key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all duration-300",
                  currentStep > index
                    ? "bg-primary border-primary"
                    : currentStep === index
                    ? "bg-card border-primary shadow-md scale-110"
                    : "bg-muted border-border"
                )}
              >
                {currentStep > index ? (
                  <Check className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                ) : (
                  <span className="text-xl md:text-2xl">{step.icon}</span>
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs md:text-sm font-medium text-center transition-colors",
                  currentStep >= index ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-[2px] flex-1 mx-2 transition-all duration-300",
                  currentStep > index ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
