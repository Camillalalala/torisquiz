import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Clock, SkipForward, Home, Palette, Layout, Heart } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import whattoexpectBG from "@/assets/shapes/whattoexpectBG.svg";
import yourprivacymattersBG from "@/assets/shapes/yourprivacymattersBG.svg";
import pinkRectangle from "@/assets/shapes/pinkRectangle.svg";
import toriLogo from "@/assets/shapes/toriLogo.svg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col main-page">
      <Header />
      <main className="flex-grow">
      <section className="bg-[#F9F0E3] py-16 md:py-24 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
            {/* Left Column: Logo */}
            <div className="flex justify-center">
              <img 
                src={toriLogo} 
                alt="Tori Logo" 
                className="w-64 md:w-80 object-contain"
              />
            </div>
            
            {/* Right Column: Welcome Text */}
            <div className="bg-[#E1C2CF] p-8 md:p-12 rounded-3xl text-[#640A09] shadow-lg w-full max-w-xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                WELCOME TO TORIQUIZ!
              </h1>
              <p className="text-lg md:text-xl mb-4 text-center">
                We’re so glad you’re here. This quiz was created to help us design a home that feels safe, calming, and truly yours.
              </p>
              <p className="text-lg md:text-xl text-center">
                This tool will help us get to know your preferences, needs, and what feels comforting so we can create a personalized, grounded environment for you.
              </p>
            </div>
          </div>
      </section>

      <section className="py-16 bg-[#DDECE2] relative overflow-hidden">
        {/*<img 
          src={whattoexpectBG} 
          alt="" 
          className="absolute top-0 left-0 w-full h-screen object-scale-down"
        />*/}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#640A09] font-serif">What To Expect?</h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4 max-w-3xl mx-auto">
              <Clock className="w-8 h-8 text-[#640A09] flex-shrink-0 mt-1" />
              <p className="text-xl md:text-2xl text-[#640A09]">
                This quiz will take about <b>10-15</b> minutes. You can take your time — there's no rush.
              </p>
            </div>
            
            <div className="flex items-start gap-4 max-w-3xl mx-auto">
              <SkipForward className="w-8 h-8 text-[#640A09] flex-shrink-0 mt-1" />
              <p className="text-xl md:text-2xl text-[#640A09]">
                You can skip any question. Only share what feels comfortable for you.
              </p>
            </div>
            
            <div className="flex items-start gap-4 max-w-3xl mx-auto">
              <Home className="w-8 h-8 text-[#640A09] flex-shrink-0 mt-1" />
              <p className="text-xl md:text-2xl text-[#640A09]">
                This is your space — your answers help us design a home around your needs and comforts.
              </p>
            </div>
            
            <div className="flex items-start gap-4 max-w-3xl mx-auto">
              <Heart className="w-8 h-8 text-[#640A09] flex-shrink-0 mt-1" />
              <p className="text-xl md:text-2xl text-[#640A09]">
                <b>We're here to listen.</b> If anything comes up, you're always welcome to let us know.
              </p>
            </div>
          </div>
        </div>
      </section>

        <section className="py-16 bg-[#F9F0E3]">
          <div className="flex justify-center items-center">
            <div className="bg-[#E1C2CF] p-8 md:p-12 rounded-3xl text-[#640A09] shadow-lg w-full max-w-xl">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-8">Let's Get Started</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 relative overflow-hidden bg-[#E1C2CF]">
          {/*<img 
            src={yourprivacymattersBG} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover"
          />*/}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl font-bold text-center mb-12">Your Privacy Matters.</h2>
            <p className="text-xl md:text-2xl text-[#640A09] max-w-3xl mx-auto mb-8">
            This information you share in this quiz is <b>confidential</b> and only used by our team to help personalize your home design.
            </p>
            <p className="text-xl md:text-2xl text-[#640A09] max-w-3xl mx-auto mb-8">
            <b>We will never share your responses without permission.</b>
            </p>
          </div>
        </section>        
      </main>
    </div>
  );
};
export default Index;

