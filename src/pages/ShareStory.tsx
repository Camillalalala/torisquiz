import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ShareStory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    name: "",
    image: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error("Image size should be less than 5MB");
        e.target.value = ""; // Reset input
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        e.target.value = ""; // Reset input
        return;
      }

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload image to Supabase Storage
      let imageUrl = "";
      if (formData.image) {
        const fileExt = formData.image.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("story-images")
          .upload(fileName, formData.image, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw new Error(`Failed to upload image: ${uploadError.message}`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from("story-images")
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      // Save story to database
      const { error: dbError } = await supabase.from("success_stories").insert([
        {
          title: formData.title,
          description: formData.description,
          name: formData.name,
          image_url: imageUrl,
        },
      ]);

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error(`Failed to save story: ${dbError.message}`);
      }

      toast.success("Story submitted successfully!");
      navigate("/stories");
    } catch (error) {
      console.error("Error submitting story:", error);
      toast.error(error instanceof Error ? error.message : "Failed to submit story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 bg-[#F9F0E3]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-[#640A09]">
              Share Your Story
            </h1>
            <p className="text-xl text-center mb-12 text-[#640A09]">
              Your journey can inspire others. Share your story of finding a home.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Story Title
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Give your story a title"
                  className="text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Story
                </label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Share your journey..."
                  className="text-lg min-h-[200px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Photo (max 5MB)
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="text-lg"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Supported formats: JPG, PNG, GIF
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#640A09] hover:bg-[#640A09]/90 text-lg"
              >
                {loading ? "Submitting..." : "Share Story"}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShareStory; 