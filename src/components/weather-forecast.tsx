import type { ForecastData } from "@/apis/typed";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { formatTemp } from "./current-weather";

interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

const WeatherForcast = ({ data }: WeatherForecastProps) => {
  const dailyForcasts = data.list.reduce((acc, forcast) => {
    const date = format(new Date(forcast.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        temp_min: forcast.main.temp_min,
        temp_max: forcast.main.temp_max,
        humidity: forcast.main.humidity,
        wind: forcast.wind.speed,
        weather: forcast.weather[0],
        date: forcast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forcast.main.temp_min);
      acc[date].temp_max = Math.min(acc[date].temp_max, forcast.main.temp_max);
    }
    return acc;
  }, {} as Record<string, DailyForecast>);

  const nextDays = Object.values(dailyForcasts).slice(0, 6);

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forcast</CardTitle>
      </CardHeader>
      <CardHeader>
        <div className="grid gap-4">
          {nextDays.map((day) => {
            return (
              <div
                key={day.date}
                className="grid grid-cols-3 items-center gap-3 rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">
                    {format(new Date(day.date * 1000), "EEE, MMM d")}
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {day.weather.description}
                  </p>
                </div>

                <div className="flex justify-center gap-4">
                  <span className="flex items-center text-blue-500">
                    <ArrowDown className="mr-1 h-4 w-4" />
                    {formatTemp(day.temp_min)}
                  </span>
                  <span className="flex items-center text-red-500">
                    <ArrowUp className="mr-1 h-4 w-4" />
                    {formatTemp(day.temp_max)}
                  </span>
                </div>
                <div className="flex justify-end gap-4">
                  <span className="flex items-center gap-1">
                    <Droplets className="h-4 w-5 text-blue-500" />
                    <span className="text-sm">{day.humidity}%</span>
                  </span>

                  <span className="flex items-center gap-1">
                    <Wind className="h-4 w-5 text-blue-500" />
                    <span className="text-sm">{day.wind}%</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardHeader>
    </Card>
  );
};

export default WeatherForcast;
