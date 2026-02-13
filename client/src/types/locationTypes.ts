export interface CitySuggestion {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  label?: string; // optional if you add it manually
}

export interface CitySuggestionResponse {
  data: CitySuggestion[];
  results: number;
  status: string;
}