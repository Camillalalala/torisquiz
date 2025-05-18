import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type MoodBoardProps = {
  images: string[];
  loading?: boolean;
};

const MoodBoard = ({ images, loading = false }: MoodBoardProps) => {
  if (loading) {
    return (
      <Card className="w-full shadow-md">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl lg:text-3xl">Your Mood Board</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 rounded-md"
              ></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl lg:text-3xl">Your Mood Board</CardTitle>
      </CardHeader>
      <CardContent>
        {images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="aspect-square bg-cover bg-center rounded-md overflow-hidden hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm md:text-base">No mood board generated yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodBoard;
