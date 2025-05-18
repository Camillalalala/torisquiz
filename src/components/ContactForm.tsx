import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export const ContactForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save contact information to Supabase
      const { error } = await supabase.from("contacts").insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phoneNumber,
        },
      ]);

      if (error) throw error;

      toast.success("Contact information saved successfully!");
      navigate("/quiz"); // Navigate to quiz after successful submission
    } catch (error) {
      console.error("Error saving contact information:", error);
      toast.error("Failed to save contact information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="First Name"
              className="text-xl md:text-2xl"
            />
          </div>
          <div>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Last Name"
              className="text-xl md:text-2xl"
            />
          </div>
        </div>

        <div>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="text-xl md:text-2xl"
          />
        </div>

        <div>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            placeholder="Phone Number"
            className="text-xl md:text-2xl"
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-[#640A09] hover:bg-gray-600 text-xl md:text-2xl font-organ tracking-widest" disabled={loading}>
        {loading ? "Saving..." : "Begin Quiz"}
      </Button>
    </form>
  );
}; 