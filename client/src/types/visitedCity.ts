import { WeatherResponse } from "../types/weatherTypes";
import { TempUnit } from "../types/temperature";

export interface Props {
    cities: WeatherResponse[];
    tempUnit: TempUnit;
    onSelect: (city: WeatherResponse) => void;
    city:string
}