import type { WeatherData } from "@/apis/typed";
import { useFavorite } from "@/hooks/use-favorite";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface FavoriteButtonProps {
  data: WeatherData;
}
const FavoriteButon = ({ data }: FavoriteButtonProps) => {
  const { addFavorite, isFavorite, removeFavorite } = useFavorite();

  const isCurrentlyFavoriates = isFavorite(data.coord.lat, data.coord.lon);

  const handleToogleFavorite = () => {
    if (isCurrentlyFavoriates) {
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from Favorites`);
    } else {
      addFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to Favorites`);
    }
  };

  return (
    <Button
      variant={isCurrentlyFavoriates ? "default" : "outline"}
      size={"icon"}
      onClick={handleToogleFavorite}
      className={
        isCurrentlyFavoriates ? "bg-yellow-500 hover:bg-yellow-600" : ""
      }
    >
      <Star
        className={`h-4 w-4 ${isCurrentlyFavoriates ? "fill-current" : ""}`}
      />
    </Button>
  );
};

export default FavoriteButon;
