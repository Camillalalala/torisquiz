import { useState, createContext, useContext, ReactNode } from "react";

type QuizAnswers = {
  triggers: string[];
  desiredFeelings: string[];
  colorPreferences: string[];
  texturePreferences: string[];
  functionalNeeds: string[];
  lightingPreferences: string;
  spacePreferences: string;
};

type QuizContextType = {
  answers: QuizAnswers;
  setTriggers: (triggers: string[]) => void;
  setDesiredFeelings: (feelings: string[]) => void;
  setColorPreferences: (colors: string[]) => void;
  setTexturePreferences: (textures: string[]) => void;
  setFunctionalNeeds: (needs: string[]) => void;
  setLightingPreferences: (lighting: string) => void;
  setSpacePreferences: (space: string) => void;
  resetAnswers: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
};

const initialAnswers: QuizAnswers = {
  triggers: [],
  desiredFeelings: [],
  colorPreferences: [],
  texturePreferences: [],
  functionalNeeds: [],
  lightingPreferences: "",
  spacePreferences: "",
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const setTriggers = (triggers: string[]) => {
    console.log('Setting triggers in QuizState:', triggers);
    setAnswers((prev) => {
      const newAnswers = { ...prev, triggers };
      console.log('New QuizState after setting triggers:', newAnswers);
      return newAnswers;
    });
  };

  const setDesiredFeelings = (feelings: string[]) => {
    console.log('Setting desired feelings in QuizState:', feelings);
    setAnswers((prev) => {
      const newAnswers = { ...prev, desiredFeelings: feelings };
      console.log('New QuizState after setting desired feelings:', newAnswers);
      return newAnswers;
    });
  };

  const setColorPreferences = (colors: string[]) => {
    console.log('Setting color preferences in QuizState:', colors);
    setAnswers((prev) => {
      const newAnswers = { ...prev, colorPreferences: colors };
      console.log('New QuizState after setting color preferences:', newAnswers);
      return newAnswers;
    });
  };

  const setTexturePreferences = (textures: string[]) => {
    setAnswers((prev) => ({ ...prev, texturePreferences: textures }));
  };

  const setFunctionalNeeds = (needs: string[]) => {
    console.log('Setting functional needs in QuizState:', needs);
    setAnswers((prev) => {
      const newAnswers = { ...prev, functionalNeeds: needs };
      console.log('New QuizState after setting functional needs:', newAnswers);
      return newAnswers;
    });
  };

  const setLightingPreferences = (lighting: string) => {
    console.log('Setting lighting preferences in QuizState:', lighting);
    setAnswers((prev) => {
      const newAnswers = { ...prev, lightingPreferences: lighting };
      console.log('New QuizState after setting lighting preferences:', newAnswers);
      return newAnswers;
    });
  };

  const setSpacePreferences = (space: string) => {
    setAnswers((prev) => ({ ...prev, spacePreferences: space }));
  };

  const resetAnswers = () => {
    setAnswers(initialAnswers);
    setCurrentStep(1);
  };

  return (
    <QuizContext.Provider
      value={{
        answers,
        setTriggers,
        setDesiredFeelings,
        setColorPreferences,
        setTexturePreferences,
        setFunctionalNeeds,
        setLightingPreferences,
        setSpacePreferences,
        resetAnswers,
        currentStep,
        setCurrentStep,
        totalSteps,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizState = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuizState must be used within a QuizProvider");
  }
  return context;
};

export default useQuizState;
