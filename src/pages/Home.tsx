import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">
              Discover Your Perfect Interior Design Style
            </h1>
            <p className="text-gray-600 mb-8">
              Take our personalized quiz to find your ideal color palette, furniture
              recommendations, and design inspiration.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/contact")}
              className="px-8"
            >
              Take the Quiz
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home; 