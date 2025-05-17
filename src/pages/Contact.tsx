import { ContactForm } from "@/components/ContactForm";
import Header from "@/components/Header";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2">
              Let's Get Started
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Please provide your contact information to begin the quiz
            </p>
            <ContactForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact; 