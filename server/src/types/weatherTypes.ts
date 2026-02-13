
export interface WeatherResponse {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon:string;
  uv:string;
  feelslike:number;
  last_updated:string
}

export interface HourlyForecast {
  time: string;
  temp: number;
  condition: string;
  windSpeed: number;
  humidity: number;
  icon?:string
}

export interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  avgTemp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon?:string;
  hours: HourlyForecast[];
}

export interface ForecastResponse {
  city: string;
  daily: DailyForecast[];
}