import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import QuizQuestion from "@/components/QuizQuestion";
import { useQuizState } from "@/hooks/useQuizState";
import { Progress } from "@/components/ui/progress";
import { useEffect, useRef } from "react";

// Quiz content wrapper that provides the context
const QuizContent = () => {
  const navigate = useNavigate();
  const {
    currentStep,
    setCurrentStep,
    totalSteps,
    setTriggers,
    setDesiredFeelings,
    setColorPreferences,
    setFunctionalNeeds,
    setLightingPreferences,
    resetAnswers,
  } = useQuizState();

  // Use a ref to track if this is the first mount
  const isFirstMount = useRef(true);

  // Reset quiz state only on first mount
  useEffect(() => {
    if (isFirstMount.current) {
      resetAnswers();
      isFirstMount.current = false;
    }
  }, [resetAnswers]);

  const handleNext = (selected: string[]) => {
    // Save the answers based on the current step
    switch (currentStep) {
      case 1:
        setTriggers(selected);
        break;
      case 2:
        setDesiredFeelings(selected);
        break;
      case 3:
        setColorPreferences(selected);
        break;
      case 4:
        setFunctionalNeeds(selected);
        break;
      case 5:
        setLightingPreferences(selected[0]);
        // Navigate to results after last question
        navigate("/results");
        return;
    }

    // Move to next question
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Define questions for each step
  const renderCurrentQuestion = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuizQuestion
            title="What environmental factors trigger discomfort for you?"
            description="Select any that apply to you"
            options={[
              { value: "loud-noises", label: "Loud noises" },
              { value: "bright-lights", label: "Bright lights" },
              { value: "crowded-spaces", label: "Crowded spaces" },
              { value: "temperature", label: "Temperature extremes" },
              { value: "strong-smells", label: "Strong smells" },
              { value: "clutter", label: "Clutter or disorganization" },
            ]}
            multiple={true}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <QuizQuestion
            title="How do you want to feel when you walk into your space?"
            description="Select up to 3 feelings"
            options={[
              { value: "calm", label: "Calm and peaceful" },
              { value: "energized", label: "Energized and motivated" },
              { value: "cozy", label: "Cozy and comfortable" },
              { value: "focused", label: "Focused and productive" },
              { value: "safe", label: "Safe and secure" },
              { value: "inspired", label: "Creative and inspired" },
            ]}
            multiple={true}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <QuizQuestion
            title="What colors do you prefer in your living space?"
            description="Select all that appeal to you"
            options={[
              { value: "neutrals", label: "Neutrals (beige, cream, gray)" },
              { value: "earth-tones", label: "Earth tones (brown, terracotta)" },
              { value: "cool-blues", label: "Cool blues and greens" },
              { value: "warm-colors", label: "Warm colors (orange, yellow)" },
              { value: "vibrant", label: "Vibrant and colorful" },
              { value: "monochrome", label: "Minimal and monochromatic" },
            ]}
            multiple={true}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <QuizQuestion
            title="What are your most important functional needs?"
            description="Select your top priorities"
            options={[
              { value: "storage", label: "Ample storage solutions" },
              { value: "accessibility", label: "Accessibility features" },
              { value: "work-space", label: "Work/study area" },
              { value: "relaxation", label: "Relaxation space" },
              { value: "cooking", label: "Cooking facilities" },
              { value: "privacy", label: "Privacy and personal space" },
            ]}
            multiple={true}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <QuizQuestion
            title="What type of lighting do you prefer?"
            options={[
              { value: "bright", label: "Bright and airy" },
              { value: "warm", label: "Warm and soft" },
              { value: "natural", label: "Natural daylight" },
              { value: "adjustable", label: "Adjustable/dimmable" },
            ]}
            onNext={handleNext}
            onBack={handleBack}
            isLastQuestion={true}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span>Question {currentStep} of {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
      </div>
      {renderCurrentQuestion()}
    </div>
  );
};

const Quiz = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 bg-gray-50">
        <QuizContent />
      </main>
    </div>
  );
};

export default Quiz;
