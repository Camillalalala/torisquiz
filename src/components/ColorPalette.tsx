import { useColorPalette } from '@/hooks/useColorPalette';

interface ColorPaletteProps {
  loading?: boolean;
}

const ColorPalette = ({ loading: externalLoading }: ColorPaletteProps) => {
  const { palette, loading: paletteLoading, error } = useColorPalette();
  const isLoading = externalLoading || paletteLoading;

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Color Palette</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="h-3 bg-gray-200 rounded w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Color Palette</h2>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!palette) {
    return null;
  }

  const colors = [
    { color: palette.primary, name: "Primary", usage: "Main elements" },
    { color: palette.secondary, name: "Secondary", usage: "Supporting elements" },
    { color: palette.accent, name: "Accent", usage: "Highlights" },
    { color: palette.background, name: "Background", usage: "Base" },
    { color: palette.text, name: "Text", usage: "Typography" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Your Color Palette</h2>
      <div className="space-y-4">
        {colors.map((color, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div
              className="w-16 h-16 rounded-lg shadow-sm"
              style={{ backgroundColor: color.color }}
            />
            <div>
              <h3 className="font-medium">{color.name}</h3>
              <p className="text-sm text-gray-600">{color.usage}</p>
              <p className="text-sm text-gray-500">{color.color}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
