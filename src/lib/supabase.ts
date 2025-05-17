import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type QuizResult = {
  id: string;
  created_at: string;
  triggers: string[];
  desired_feelings: string[];
  color_preferences: string[];
  functional_needs: string[];
  lighting_preferences: string;
  mood_board_images: string[];
  furniture_recommendations: {
    name: string;
    description: string;
    image_url: string;
  }[];
  color_palette: {
    color: string;
    name: string;
    usage: string;
  }[];
}; 