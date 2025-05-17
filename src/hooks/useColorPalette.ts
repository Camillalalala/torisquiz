import { useState, useEffect } from 'react';
import { useQuizState } from './useQuizState';

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export const useColorPalette = () => {
  const [palette, setPalette] = useState<ColorPalette | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { answers } = useQuizState();
  const colorPreferences = answers.colorPreferences;

  useEffect(() => {
    const generatePalette = async () => {
      if (!colorPreferences || colorPreferences.length === 0) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const requestBody = {
          preferences: {
            neutrals: colorPreferences.includes('neutrals'),
            earth_tones: colorPreferences.includes('earth-tones'),
            cool_blues: colorPreferences.includes('cool-blues'),
            warm_colors: colorPreferences.includes('warm-colors'),
            vibrant: colorPreferences.includes('vibrant'),
            monochrome: colorPreferences.includes('monochrome'),
          },
        };

        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-color-palette`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to generate color palette');
        }

        const data = await response.json();
        setPalette(data.palette);
      } catch (err) {
        console.error('Error generating palette:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    generatePalette();
  }, [colorPreferences]);

  return { palette, loading, error };
}; 