import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import QuizQuestion from "@/components/QuizQuestion";
import { useQuizState } from "@/hooks/useQuizState";
import { Progress } from "@/components/ui/progress";
import { useEffect, useRef, useState } from "react";
import flowerLeft from "@/assets/shapes/flowerLeft.svg";
import flowerRight from "@/assets/shapes/flowerRight.svg";

// Quiz content wrapper that provides the context
const QuizContent = () => {
  const navigate = useNavigate();
  const {
    currentStep,
    setCurrentStep,
    totalSteps,
    setTriggers,
    setAdditionalTriggers,
    setDesiredFeelings,
    setColorPreferences,
    setFunctionalNeeds,
    setLightingPreferences,
    resetAnswers,
  } = useQuizState();

  const [additionalTriggers, setAdditionalTriggersLocal] = useState("");

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
    // If "Prefer not to answer" is selected, skip to next question
    if (selected.includes("prefer-not-to-answer")) {
      setCurrentStep(currentStep + 1);
      return;
    }

    let filteredTriggers: string[] = [];
    
    // Save the answers based on the current step
    switch (currentStep) {
      case 1:
        // Trigger awareness intro page - just move to next
        setCurrentStep(currentStep + 1);
        return;
      case 2:
        // Save selected triggers, excluding "prefer-not-to-answer" if it exists
        filteredTriggers = selected.filter(trigger => trigger !== "prefer-not-to-answer");
        setTriggers(filteredTriggers);
        break;
      case 3:
        // Save additional triggers and move to main quiz
        setAdditionalTriggers(additionalTriggers);
        setCurrentStep(4); // Skip to first main question
        return;
      case 4:
        setDesiredFeelings(selected);
        break;
      case 5:
        setColorPreferences(selected);
        break;
      case 6:
        setFunctionalNeeds(selected);
        break;
      case 7:
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
    const preferNotToAnswer = { value: "prefer-not-to-answer", label: "Prefer not to answer" };

    switch (currentStep) {
      case 1:
        return (
          <div className="bg-[#E1C2CF] rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4 text-center font-organ">Your Comfort Comes First</h2>
            <p className="text-black mb-6">
            We understand that certain sights, sounds, textures, or experiences may feel overwhelming or unsafe.
            </p>
            <p className="text-black mb-6">
            The next few questions helps us know what to avoid in your home design — so we don't include anything that might feel upsetting or triggering.
            </p>
            <p className="text-black mb-6">
              You're welcome to skip any question. Your well-being and comfort are our top priorities.
            </p>
            <button
              onClick={() => handleNext([])}
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
            >
              Continue
            </button>
          </div>
        );
      case 2:
        return (
          <QuizQuestion
            title="Which of these triggers might affect you in your living space?"
            description="Select all that apply to you"
            options={[
              { value: "bright-lights", label: "Bright or flashing lights" },
              { value: "darkness", label: "Darkness or poorly lit areas" },
              { value: "colors", label: "Certain colors" },
              { value: "strong-smells", label: "Strong or chemical smells" },
              { value: "clutter", label: "Clutter or disorganization" },
              { value: "materials", label: "Certain materials" },
              { value: "enclosed-spaces", label: "Small, enclosed spaces" },
              preferNotToAnswer,
            ]}
            multiple={true}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <div className="bg-[#E1C2CF] rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4">Additional Triggers</h2>
            <p className="text-black mb-6">
              Are there any other things — big or small — that make you feel unsettled or unsafe in a space?
              (This is optional, but sharing can help us better understand your needs.)
            </p>
            <textarea
              value={additionalTriggers}
              onChange={(e) => setAdditionalTriggersLocal(e.target.value)}
              placeholder="Share any additional triggers or concerns..."
              className="w-full p-3 border rounded-md mb-6 min-h-[100px]"
            />
            <button
              onClick={() => handleNext([])}
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
            >
              Continue to Quiz
            </button>
          </div>
        );
      case 4:
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
              preferNotToAnswer,
            ]}
            multiple={true}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
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
              preferNotToAnswer,
            ]}
            multiple={true}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 6:
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
              preferNotToAnswer,
            ]}
            multiple={true}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 7:
        return (
          <QuizQuestion
            title="What type of lighting do you prefer?"
            options={[
              { value: "bright", label: "Bright and airy" },
              { value: "warm", label: "Warm and soft" },
              { value: "natural", label: "Natural daylight" },
              { value: "adjustable", label: "Adjustable/dimmable" },
              preferNotToAnswer,
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
        <Progress value={(currentStep / totalSteps) * 100} className="h-2 bg-white border border-gray-600 rounded-full" />
      </div>
      {/*<div className="bg-[#E1C2CF] p-8 rounded-3xl shadow-lg">*/}
        {renderCurrentQuestion()}
      {/*</div>*/}
    </div>
  );
};

const Quiz = () => {
  return (
    <div className="min-h-screen flex flex-col quiz-page">
      <Header />
      <main className="flex-grow py-8 bg-[#F9F0E3] relative">
        <img 
          src={flowerLeft} 
          alt="" 
          className="absolute left-0 top-1/2 -translate-y-1/2 w-56 md:w-64 opacity-70"
        />
        <img 
          src={flowerRight} 
          alt="" 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-56 md:w-64 opacity-70"
        />
        <div className="relative z-10">
          <QuizContent />
        </div>
      </main>
    </div>
  );
};

export default Quiz;
