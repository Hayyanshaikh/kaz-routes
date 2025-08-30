"use client";

import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { Steps, Button } from "antd";
import { Step } from "@/app/types/CommonType";

interface MultiStepFormProps {
  steps: Step[];
  onFinish: () => void;
  showNext?: boolean;
  customAction?: React.ReactNode;
  currentStepExternal?: number;
  setCurrentStepExternal?: (step: number) => void;
}

const CommonMultiStep: React.FC<MultiStepFormProps> = ({
  steps,
  onFinish,
  showNext = true,
  customAction,
  currentStepExternal,
  setCurrentStepExternal,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStepExternal !== undefined) {
      setCurrentStep(currentStepExternal);
    }
  }, [currentStepExternal]);

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (!isLastStep) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (setCurrentStepExternal) setCurrentStepExternal(next);
    } else {
      onFinish();
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      if (setCurrentStepExternal) setCurrentStepExternal(prev);
    }
  };

  return (
    <Card className="w-full">
      {/* Steps Header */}
      <Steps
        current={currentStep}
        items={steps.map((step, index) => ({
          title: step.title,
        }))}
        className="mb-6"
      />

      {/* Step Content */}
      <div className="min-h-[200px] mb-6">{steps[currentStep]?.content}</div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button onClick={handleBack} disabled={isFirstStep}>
          Back
        </Button>

        <div className="flex gap-2">
          {customAction && customAction}
          {showNext && (
            <Button
              type="primary"
              onClick={handleNext}
              disabled={steps[currentStep]?.disabled}
            >
              {isLastStep ? "Finish" : "Next"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CommonMultiStep;
