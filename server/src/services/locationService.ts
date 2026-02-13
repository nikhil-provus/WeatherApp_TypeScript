// services/locationService.ts
import axios from "axios";
import { AppError } from "../utils/appError";
import dotenv from "dotenv";
import { GeoDBResponse,CitySuggestion } from "../types/citySuggestionTypes";
import { Location } from "../types/citySuggestionTypes";
dotenv.config();



export const searchLocations = async (query: string): Promise<Location[]> => {
  const API_KEY = process.env.RAPID_API_KEY;
  const API_HOST = "wft-geo-db.p.rapidapi.com";
  if (!API_KEY) throw new AppError("Rapid API key not configured", 500);
  if (!query || query.length < 3) return [];
  if (!query || query.trim() === "") throw new AppError("Query cannot be empty", 400);
  try {
    const response = await axios.get<GeoDBResponse>("https://wft-geo-db.p.rapidapi.com/v1/geo/cities", {
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
      params: {
        namePrefix: query,
        limit: 10,
        sort: "-population", 
        languageCode: "en",
        types: "CITY" 
      },
    });

    console.log(response);

    const rawCities= response.data.data;


    const suggestions: CitySuggestion[] = rawCities
      // Optional: Filter out places with 0 population if you want strict relevance
      .filter((city) => city.type === 'CITY' && city.population > 0) 
      .map((city) => ({
        id: city.id,
        name: city.name,
        region: city.region,
        country: city.country,
        lat: city.latitude,
        lon: city.longitude,
        // Helper string for the frontend dropdown
        label: `${city.name}, ${city.region}, ${city.country}`
      }));

    return suggestions;

  } catch (error:unknown) {
    if(error instanceof Error){
        console.error("GeoDB Service Error:", error.message);
    }
    
    return []; 
  }
};