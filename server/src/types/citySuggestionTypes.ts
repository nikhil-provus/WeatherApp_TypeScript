
export interface CitySuggestion {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  
  label: string; 
}
 export interface GeoDBResponse {
  data: Array<{
    id: number;
    name: string;
    city: string;
    region: string;
    country: string;
    latitude: number;
    longitude: number;
    population: number;
    type: string;
  }>;
}
export interface Location {
  name: string;
  region: string;
  country: string;
}