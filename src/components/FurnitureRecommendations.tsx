
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FurnitureItem = {
  name: string;
  description: string;
  imageUrl?: string;
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
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Furniture Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex space-x-4">
                <div className="w-16 h-16 rounded-md bg-gray-200"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
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
        <CardTitle>Furniture Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        {recommendations.length > 0 ? (
          <div className="space-y-6">
            {recommendations.map((item, index) => (
              <div key={index} className="flex space-x-4">
                {item.imageUrl && (
                  <div 
                    className="w-20 h-20 bg-cover bg-center rounded-md flex-shrink-0"
                    style={{ backgroundImage: `url(${item.imageUrl})` }}
                  ></div>
                )}
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
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
