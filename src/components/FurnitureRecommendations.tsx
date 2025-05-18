import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FurnitureItem = {
  name: string;
  description: string;
  imageUrl?: string;
  image_url?: string;
};

type FurnitureRecommendationsProps = {
  recommendations: FurnitureItem[];
  loading?: boolean;
};

const FurnitureRecommendations = ({
  recommendations,
  loading = false,
}: FurnitureRecommendationsProps) => {
  if (loading) {
    return (
      <Card className="w-full shadow-md">
        <CardHeader>
          <CardTitle>Furniture Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-video bg-gray-200 rounded-md"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle>Furniture Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                {(item.imageUrl || item.image_url) && (
                  <div 
                    className="aspect-video bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.imageUrl || item.image_url})` }}
                  />
                )}
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No recommendations generated yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FurnitureRecommendations;
