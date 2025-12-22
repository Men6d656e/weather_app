import type { Coordinates } from "@/apis/typed";
import { weatherAPI } from "@/apis/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
  forcast: (coords: Coordinates) => ["forecast", coords] as const,
  location: (coords: Coordinates) => ["location", coords] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
    enabled: !!coordinates,
  });
}

export function useForecastQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.forcast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? weatherAPI.getForecast(coordinates) : null),
    enabled: !!coordinates,
  });
}

export function useReverseGeoCodeQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherAPI.reverseGeoCode(coordinates) : null,
    enabled: !!coordinates,
  });
}
