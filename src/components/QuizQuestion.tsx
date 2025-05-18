import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";

type QuizQuestionProps = {
  title: string;
  description?: string;
  options: { value: string; label: string }[];
  multiple?: boolean;
  onNext: (selected: string[]) => void;
  onBack?: () => void;
  isLastQuestion?: boolean;
};

const QuizQuestion = ({
  title,
  description,
  options,
  multiple = false,
  onNext,
  onBack,
  isLastQuestion = false,
}: QuizQuestionProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected([]);
  }, [title]);

  const handleOptionClick = (value: string) => {
    if (multiple) {
      const newSelected = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value];
      setSelected(newSelected);
    } else {
      setSelected([value]);
    }
  };

  const handleNext = () => {
    onNext(selected);
  };

  return (
    //Return here to change background color of the card
    <Card className="w-full max-w-3xl mx-auto border-gray-600 bg-[#E1C2CF]">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl lg:text-3xl text-center">{title}</CardTitle>
        {description && (
          <CardDescription className="text-center text-black text-sm md:text-base">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {options.map((option) => (
            <div
              key={option.value}
              className={`
                p-3 md:p-4 border rounded-md cursor-pointer transition-all
                ${
                  selected.includes(option.value)
                    ? "border-teal-500 bg-teal-100"
                    : "border-gray-600 hover:border-[#640A09] bg-white"
                }
              `}
              onClick={() => handleOptionClick(option.value)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm md:text-base">{option.label}</span>
                {selected.includes(option.value) && (
                  <CheckIcon className="h-4 w-4 md:h-5 md:w-5 text-teal-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {onBack ? (
          <Button variant="outline" onClick={onBack} className="text-sm md:text-base">
            Back
          </Button>
        ) : (
          <div></div>
        )}
        <Button 
          onClick={handleNext}
          disabled={selected.length === 0}
          className="text-sm md:text-base"
        >
          {isLastQuestion ? "See Results" : "Next Question"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizQuestion;
