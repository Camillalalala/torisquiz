import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface ColorPreferences {
  neutrals?: boolean;
  earth_tones?: boolean;
  cool_blues?: boolean;
  warm_colors?: boolean;
  vibrant?: boolean;
  monochrome?: boolean;
}

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

const colorSchemes = {
  neutrals: {
    primary: "#E5E5E5",
    secondary: "#D4D4D4",
    accent: "#A3A3A3",
    background: "#F5F5F5",
    text: "#404040"
  },
  earth_tones: {
    primary: "#8B4513",
    secondary: "#A0522D",
    accent: "#D2691E",
    background: "#F5DEB3",
    text: "#3E2723"
  },
  cool_blues: {
    primary: "#1E3A8A",
    secondary: "#2563EB",
    accent: "#60A5FA",
    background: "#EFF6FF",
    text: "#1E3A8A"
  },
  warm_colors: {
    primary: "#DC2626",
    secondary: "#F97316",
    accent: "#FBBF24",
    background: "#FEF3C7",
    text: "#7C2D12"
  },
  vibrant: {
    primary: "#7C3AED",
    secondary: "#EC4899",
    accent: "#10B981",
    background: "#F3F4F6",
    text: "#1F2937"
  },
  monochrome: {
    primary: "#1F2937",
    secondary: "#4B5563",
    accent: "#9CA3AF",
    background: "#F9FAFB",
    text: "#111827"
  }
};

function generatePalette(preferences: ColorPreferences): ColorPalette {
  // Convert preferences to array of selected schemes
  const selectedSchemes = Object.entries(preferences)
    .filter(([_, selected]) => selected)
    .map(([scheme]) => scheme);

  if (selectedSchemes.length === 0) {
    // Default to neutrals if no preferences selected
    return colorSchemes.neutrals;
  }

  // If only one preference is selected, return that scheme
  if (selectedSchemes.length === 1) {
    return colorSchemes[selectedSchemes[0] as keyof typeof colorSchemes];
  }

  // For multiple preferences, create a blended palette
  const primaryColors = selectedSchemes.map(scheme => 
    colorSchemes[scheme as keyof typeof colorSchemes].primary
  );
  const secondaryColors = selectedSchemes.map(scheme => 
    colorSchemes[scheme as keyof typeof colorSchemes].secondary
  );
  const accentColors = selectedSchemes.map(scheme => 
    colorSchemes[scheme as keyof typeof colorSchemes].accent
  );

  // Simple blending function - takes average of RGB values
  function blendColors(colors: string[]): string {
    const rgbValues = colors.map(color => {
      const hex = color.replace('#', '');
      return {
        r: parseInt(hex.substr(0, 2), 16),
        g: parseInt(hex.substr(2, 2), 16),
        b: parseInt(hex.substr(4, 2), 16)
      };
    });

    const blended = rgbValues.reduce((acc, curr) => ({
      r: acc.r + curr.r,
      g: acc.g + curr.g,
      b: acc.b + curr.b
    }), { r: 0, g: 0, b: 0 });

    const count = colors.length;
    return `#${Math.round(blended.r / count).toString(16).padStart(2, '0')}${Math.round(blended.g / count).toString(16).padStart(2, '0')}${Math.round(blended.b / count).toString(16).padStart(2, '0')}`;
  }

  return {
    primary: blendColors(primaryColors),
    secondary: blendColors(secondaryColors),
    accent: blendColors(accentColors),
    background: "#FFFFFF", // Default white background
    text: "#000000" // Default black text
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { preferences } = await req.json();
    
    if (!preferences) {
      return new Response(
        JSON.stringify({ error: "Color preferences are required" }),
        { 
          status: 400, 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json' 
          } 
        }
      );
    }

    const palette = generatePalette(preferences);

    return new Response(
      JSON.stringify({ palette }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to generate color palette" }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
}); 