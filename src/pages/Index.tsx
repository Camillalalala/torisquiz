import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Clock, SkipForward, Home, Palette, Layout, Heart } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import whattoexpectBG from "@/assets/shapes/whattoexpectBG.svg";
import yourprivacymattersBG from "@/assets/shapes/yourprivacymattersBG.svg";
import pinkRectangle from "@/assets/shapes/pinkRectangle.svg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col main-page">
      <Header />
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-teal-50 to-white py-16 md:py-24">
           {/*<img 
            src={pinkRectangle} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover"
          />*/}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Welcome to <span className="text-teal-600">Toriquiz</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            We're so glad you're here. This quiz was created to help us design a home that feels safe, calming, and truly yours.
            </p>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            This tool will help us get to know your preferences, needs, and what feels comforting so we can create a personalized, grounded environment for you.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white relative overflow-hidden">
          {/*<img 
            src={whattoexpectBG} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover"
          />*/}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-12">What To Expect?</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4 max-w-3xl mx-auto">
                <Clock className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                <p className="text-xl md:text-2xl text-gray-600">
                  This quiz will take about <b>10-15</b> minutes. You can take your time — there's no rush.
                </p>
              </div>
              
              <div className="flex items-start gap-4 max-w-3xl mx-auto">
                <SkipForward className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                <p className="text-xl md:text-2xl text-gray-600">
                  You can skip any question. Only share what feels comfortable for you.
                </p>
              </div>
              
              <div className="flex items-start gap-4 max-w-3xl mx-auto">
                <Home className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                <p className="text-xl md:text-2xl text-gray-600">
                  This is your space — your answers help us design a home around your needs and comforts.
                </p>
              </div>
              
              <div className="flex items-start gap-4 max-w-3xl mx-auto">
                <Heart className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                <p className="text-xl md:text-2xl text-gray-600">
                  <b>We're here to listen.</b> If anything comes up, you're always welcome to let us know.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 relative overflow-hidden">
          {/*<img 
            src={yourprivacymattersBG} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover"
          />*/}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl font-bold text-center mb-12">Your Privacy Matters.</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            This information you share in this quiz is <b>confidential</b> and only used by our team to help personalize your home design.
            </p>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            <b>We will never share your responses without permission.</b>
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Get Started</h2>
            <p className="text-xl md:text-2xl text-gray-600 text-center max-w-3xl mx-auto mb-8">
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

