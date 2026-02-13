import { TempUnit } from "../types/temperature";
import { convertTemp } from "../utils/temperature";

export interface ForecastProps {
  forecast: ForecastDay[];
  tempUnit: TempUnit;
}

export interface ForecastCardProps {
  day: ForecastDay;
  index: number;
  tempUnit: TempUnit;
}
export interface WeatherResponse {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  uv: number;
  feelslike: number;
  last_updated: string;
}


export interface LocationSuggestion {
  label: string;
  lat: number;
  lon: number;
}

export interface WeatherApiResponse {
  data: WeatherResponse;
  source: string;
}
export interface CitySuggestion {
  data: {
    id: string;
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    label: string;
  }

}

export interface ForecastDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  avgTemp: number;
  condition: string;
  icon: string;
}

export interface HrForecast {
  time: string;        // "2026-02-12 14:00"
  temp: number;
  condition: string;
  icon?: string;
}

export interface WeatherEffectsProps {
  condition: string;
}

