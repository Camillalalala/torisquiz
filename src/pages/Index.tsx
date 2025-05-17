import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Home, Palette, Layout } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-teal-50 to-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Welcome to <span className="text-teal-600">Toriquiz</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover your perfect living space through our personalized quiz and AI-powered recommendations
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Take the Quiz</h3>
                <p className="text-gray-600">
                  Answer questions about your preferences, triggers, and needs for your ideal living space
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Generate Recommendations</h3>
                <p className="text-gray-600">
                  Our AI analyzes your responses to create personalized mood boards, color palettes, and furniture suggestions
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layout className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Visualize Your Space</h3>
                <p className="text-gray-600">
                  See your results come to life with visual representations of your ideal living environment
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Get Started</h2>
            <p className="text-gray-600 text-center mb-8">
              Please provide your contact information to begin your design journey
            </p>
            <ContactForm />
          </div>
        </section>
      </main>
    </div>
  );
};
export default Index;

