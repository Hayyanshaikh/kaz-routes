"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/shadcn/components/ui/card";
import { Separator } from "@/shadcn/components/ui/separator";
import { cn } from "@/lib/utils";
import CommonButton from "./CommonButton";
import { Step } from "@/app/types/CommonType";

interface MultiStepFormProps {
  steps: Step[];
  onFinish: () => void;
  showNext?: boolean;
  customAction?: React.ReactNode;
  currentStepExternal?: number; // external control
  setCurrentStepExternal?: (step: number) => void;
}

const CommonMultiStep = ({
  steps,
  onFinish,
  showNext = true,
  customAction,
  currentStepExternal,
  setCurrentStepExternal,
}: MultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Agar external step control hai to sync karo
  useEffect(() => {
    if (currentStepExternal !== undefined) setCurrentStep(currentStepExternal);
  }, [currentStepExternal]);

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep((prev) => {
        const next = prev + 1;
        if (setCurrentStepExternal) setCurrentStepExternal(next);
        return next;
      });
    } else {
      onFinish();
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => {
        const next = prev - 1;
        if (setCurrentStepExternal) setCurrentStepExternal(next);
        return next;
      });
    }
  };

  return (
    <Card className="w-full">
      <div className="hidden md:flex justify-between px-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              "text-sm font-medium flex items-center justify-center gap-1",
              index === currentStep ? "text-primary" : "text-muted-foreground"
            )}
          >
            <span className="h-8 w-8 bg-primary text-white flex items-center justify-center rounded-full mr-2">
              {index + 1}
            </span>
            {step.title}
          </div>
        ))}
      </div>

      <Separator />

      <CardContent className="min-h-[200px]">
        {steps[currentStep]?.content}
      </CardContent>

      <Separator />

      <div className="flex justify-between px-6">
        <CommonButton
          onClick={handleBack}
          label="Back"
          disabled={isFirstStep}
        />

        {showNext && (
          <CommonButton
            disabled={steps[currentStep]?.disabled}
            type="submit"
            onClick={handleNext}
            label={isLastStep ? "Finish" : "Next"}
          />
        )}

        {customAction && customAction}
      </div>
    </Card>
  );
};

export default CommonMultiStep;
