import { FC } from "react";
import { WeatherResponse } from "../types/weatherTypes";
import { TempUnit } from "../types/temperature";

interface Props {
    cities: WeatherResponse[];
    tempUnit: TempUnit;
    onSelect: (city: WeatherResponse) => void;
    city:string
}

export const VisitedCities: FC<Props> = ({ cities, tempUnit, onSelect }) => {
    if (cities.length === 0) return null;

    return (
        <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-gray-500 font-medium mr-2 whitespace-nowrap">
                
            </span>
            {cities.map((city) => (
                <button
                    key={city.city}
                    onClick={() => onSelect(city)}
                    className="flex items-center gap-2 px-4 py-1 bg-white shadow-sm border border-gray-200 rounded-full text-gray-700 font-medium hover:bg-indigo-50 hover:text-indigo-700 transition text-sm sm:text-base"
                >
                    {city.icon && (
                        <img
                            src={city.icon}
                            alt={city.description}
                            className="w-6 h-6"
                        />
                    )}
                    <span>{city.city}</span>
                    <span className="font-semibold text-gray-900">
                        {tempUnit === "C" ? city.temperature : Math.round(city.temperature * 9 / 5 + 32)}°
                    </span>
                </button>
            ))}
        </div>
    );
};