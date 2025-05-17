import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import MoodBoard from "@/components/MoodBoard";
import FurnitureRecommendations from "@/components/FurnitureRecommendations";
import ColorPalette from "@/components/ColorPalette";
import { useQuizState } from "@/hooks/useQuizState";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import type { QuizResult } from "@/lib/supabase";

const placeholderMoodBoardImages = [
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80",
  "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=500&q=80",
  "https://images.unsplash.com/photo-1616593969747-4797dc75033e?w=500&q=80",
  "https://images.unsplash.com/photo-1616593969747-4797dc75033e?w=500&q=80",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&q=80",
];

const placeholderFurniture = [
  {
    name: "Comfortable Sectional Sofa",
    description: "A soft, modular sofa with washable covers, perfect for creating a cozy relaxation area.",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
  },
  {
    name: "Adjustable Height Desk",
    description: "Versatile desk solution that supports both sitting and standing work positions.",
    imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&q=80",
  },
  {
    name: "Multi-functional Storage Cabinet",
    description: "Spacious storage solution with adjustable shelves to help keep your space organized.",
    imageUrl: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&q=80",
  },
];

const placeholderColors = [
  { color: "#E8F3F1", name: "Soft Mint", usage: "Walls" },
  { color: "#FFFFFF", name: "Pure White", usage: "Trim" },
  { color: "#D9E6EA", name: "Pale Sky", usage: "Accent" },
  { color: "#7FB9B2", name: "Seafoam", usage: "Accents" },
  { color: "#34747A", name: "Deep Teal", usage: "Accent" },
];

const ResultsContent = () => {
  const navigate = useNavigate();
  const { answers, resetAnswers } = useQuizState();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<QuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const saveAndFetchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        const dataToSend = {
          triggers: Array.isArray(answers.triggers) ? answers.triggers : [],
          additional_triggers: answers.additionalTriggers || '',
          desired_feelings: Array.isArray(answers.desiredFeelings) ? answers.desiredFeelings : [],
          color_preferences: Array.isArray(answers.colorPreferences) ? answers.colorPreferences : [],
          functional_needs: Array.isArray(answers.functionalNeeds) ? answers.functionalNeeds : [],
          lighting_preferences: typeof answers.lightingPreferences === 'string' ? answers.lightingPreferences : '',
          mood_board_images: placeholderMoodBoardImages,
          furniture_recommendations: placeholderFurniture.map(item => ({
            name: item.name,
            description: item.description,
            image_url: item.imageUrl
          })),
          color_palette: placeholderColors,
        };

        // Log the data being sent to verify triggers
        console.log('Saving quiz results:', {
          triggers: dataToSend.triggers,
          additional_triggers: dataToSend.additional_triggers
        });

        const { data: savedResult, error: saveError } = await supabase
          .from('quiz_results')
          .insert([dataToSend])
          .select()
          .single();

        if (saveError) {
          console.error('Supabase save error details:', saveError);
          throw new Error(`Failed to save results: ${saveError.message}`);
        }

        setResults(savedResult);
      } catch (error) {
        console.error('Error saving results:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        setError(errorMessage);
        toast.error(`Failed to save quiz results: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    saveAndFetchResults();
  }, [answers]);

  const handleStartOver = () => {
    resetAnswers();
    navigate("/quiz");
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={handleStartOver}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Your Personalized Results</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Based on your preferences, we've created recommendations for your ideal living space
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <MoodBoard 
            images={results?.mood_board_images || placeholderMoodBoardImages} 
            loading={loading} 
          />
        </div>
        <div>
          <ColorPalette loading={loading} />
        </div>
      </div>

      <div className="mb-12">
        <FurnitureRecommendations 
          recommendations={results?.furniture_recommendations || placeholderFurniture} 
          loading={loading} 
        />
      </div>

      <div className="flex justify-center space-x-4">
        <Button variant="outline" onClick={handleStartOver}>
          Start Over
        </Button>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          Your quiz results have been saved.
        </p>
      </div>
    </div>
  );
};

const Results = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <ResultsContent />
      </main>
    </div>
  );
};

export default Results;
