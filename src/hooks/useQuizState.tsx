import { useState, createContext, useContext, ReactNode } from "react";

type QuizAnswers = {
  triggers: string[];
  additionalTriggers: string;
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
  setAdditionalTriggers: (triggers: string) => void;
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
  additionalTriggers: "",
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
  const totalSteps = 7;

  const setTriggers = (triggers: string[]) => {
    setAnswers((prev) => ({ ...prev, triggers }));
  };

  const setAdditionalTriggers = (triggers: string) => {
    setAnswers((prev) => ({ ...prev, additionalTriggers: triggers }));
  };

  const setDesiredFeelings = (feelings: string[]) => {
    setAnswers((prev) => ({ ...prev, desiredFeelings: feelings }));
  };

  const setColorPreferences = (colors: string[]) => {
    setAnswers((prev) => ({ ...prev, colorPreferences: colors }));
  };

  const setTexturePreferences = (textures: string[]) => {
    setAnswers((prev) => ({ ...prev, texturePreferences: textures }));
  };

  const setFunctionalNeeds = (needs: string[]) => {
    setAnswers((prev) => ({ ...prev, functionalNeeds: needs }));
  };

  const setLightingPreferences = (lighting: string) => {
    setAnswers((prev) => ({ ...prev, lightingPreferences: lighting }));
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
        setAdditionalTriggers,
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
