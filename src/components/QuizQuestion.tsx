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
        <CardTitle className="text-2xl text-center">{title}</CardTitle>
        {description && (
          <CardDescription className="text-center text-black">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((option) => (
            <div
              key={option.value}
              className={`
                p-4 border rounded-md cursor-pointer transition-all
                ${
                  selected.includes(option.value)
                    ? "border-teal-500 bg-teal-100"
                    : "border-gray-600 hover:border-[#640A09] bg-white"
                }
              `}
              onClick={() => handleOptionClick(option.value)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option.label}</span>
                {selected.includes(option.value) && (
                  <CheckIcon className="h-5 w-5 text-teal-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {onBack ? (
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
        ) : (
          <div></div>
        )}
        <Button 
          onClick={handleNext}
          disabled={selected.length === 0}
        >
          {isLastQuestion ? "See Results" : "Next Question"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizQuestion;
