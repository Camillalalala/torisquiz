
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ColorItem = {
  color: string;
  name: string;
  usage?: string;
};

type ColorPaletteProps = {
  colors: ColorItem[];
  loading?: boolean;
};

const ColorPalette = ({ colors, loading = false }: ColorPaletteProps) => {
  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Your Color Palette</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 animate-pulse">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <div className="aspect-square rounded-md bg-gray-200"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Color Palette</CardTitle>
      </CardHeader>
      <CardContent>
        {colors.length > 0 ? (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {colors.map((colorItem, index) => (
              <div key={index} className="text-center space-y-2">
                <div
                  className="aspect-square rounded-md mx-auto"
                  style={{ backgroundColor: colorItem.color }}
                ></div>
                <p className="font-medium text-sm">{colorItem.name}</p>
                {colorItem.usage && (
                  <p className="text-xs text-gray-500">{colorItem.usage}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No color palette generated yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ColorPalette;
