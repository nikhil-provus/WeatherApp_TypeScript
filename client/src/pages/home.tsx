import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { WeatherCard } from "../components/WeatherCard";
import { SearchBar } from "../components/SearchBar";
import { VisitedCities } from "../components/VisitedCities";
import {
    WeatherResponse,
    WeatherApiResponse,
    ForecastDay,
    HrForecast,
} from "../types/weatherTypes";
import { CitySuggestion, CitySuggestionResponse } from "../types/locationTypes";
import { Forecast } from "../components/Forecast";
import { HourlyForecast } from "../components/HourlyForecast";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import { getWeatherBackground, isNightTime } from "../utils/weatherBackgrounds";
import { WeatherEffects } from "../components/WeatherEffects";
import { Loader } from "../components/Loader";
import { Fallback } from "../components/FallBack";
import { CalendarIcon } from "../utils/icons";
import { TempUnit } from "../types/temperature";
import { TempUnitToggle } from "../components/TempUnitToggle";



export const Home = () => {
    const [weather, setWeather] = useState<WeatherResponse | null>(null);
    const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
    const [forecast, setForecast] = useState<ForecastDay[]>([]);
    const [hourly, setHourly] = useState<HrForecast[]>([]);
    const [loading, setLoading] = useState(false);
    const [visitedCities, setVisitedCities] = useState<WeatherResponse[]>([]);
    const [currentTime, setCurrentTime] = useState<Date | string>();
    const [serverDown, setServerDown] = useState(false);

    const [tempUnit, setTempUnit] = useState<TempUnit>(TempUnit.Celsius);
    const [city, setCity] = useState<string>('')

    const toggleUnit = () => {
        setTempUnit((prev) =>
            prev === TempUnit.Celsius ? TempUnit.Fahrenheit : TempUnit.Celsius
        );
    };


    const fetchWeatherByCity = async (city: string) => {
        try {
            setLoading(true);
            setServerDown(false);
            const res = await axios.get<WeatherApiResponse>(`http://localhost:4000/api/weather/${city}`);
            const data = res.data.data || res.data;

            setCurrentTime(data.last_updated);

            if (!data) {
                toast.error("Weather data unavailable");
                return;
            }

            setWeather(data);
            toast.success(`Weather updated for ${city}`);

            setVisitedCities((prev) => {
                const newList = [data, ...prev.filter((c) => c.city !== data.city)];
                return newList.slice(0, 5); // keep only last 5
            });
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (!error.response) {
                    setServerDown(true);
                }
                if (error.response) toast.error(error.response.data?.message || "City not found");
                else if (error.request) toast.error("Server not responding");
            }
            else{
                toast.error("Something went wrong");
            }
            
        } finally {
            setLoading(false);
        }
    };

    // Fetch Forecast
    const fetchForecast = async (city: string) => {
        try {
            const res = await axios.get(`http://localhost:4000/api/forecast/${city}?days=5`);
            const data = res.data.data;
            if (!data?.daily?.length) {
                toast.error("Forecast data unavailable");
                return;
            }

            setForecast(data.daily);
            setHourly(data.daily[0]?.hours || []);
        } catch {
            toast.error("Failed to fetch forecast");
        }
    };


    // Visited City Click

    const handleVisitedCityClick = async (cityWeather: WeatherResponse) => {
        setWeather(cityWeather);
        setCity(cityWeather.city);
        await fetchForecast(cityWeather.city);
    };


    // Search Handlers

    const handleSearchChange = async (query: string) => {
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }
        try {
            const res = await axios.get<CitySuggestionResponse>(`http://localhost:4000/api/location/search?q=${query}`);
            setSuggestions(res.data.data || []);
        } catch {
            toast.error("Failed to load suggestions");
        }
    };

    const handleSelectLocation = async (location: CitySuggestion) => {
        await fetchWeatherByCity(location.name);
        await fetchForecast(location.name);
        setSuggestions([]);
    };

    // Auto-location / Default city
    useEffect(() => {
        const loadDefaultCity = async () => {
            const defaultCity = "Pune";
            await fetchWeatherByCity(defaultCity);
            await fetchForecast(defaultCity);
            toast("Showing weather for Pune. You can search your city above.");
        };

        if (!navigator.geolocation) {
            toast.error("Geolocation not supported");
            loadDefaultCity();
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                    );
                    const data = await response.json();
                    const city = data.address?.city || data.address?.town || data.address?.village;
                    if (!city) {
                        toast.error("Unable to detect city");
                        loadDefaultCity();
                        return;
                    }
                    await fetchWeatherByCity(city);
                    await fetchForecast(city);
                } catch {
                    toast.error("Failed to fetch location weather");
                    loadDefaultCity();
                }
            },
            () => {
                toast.error("Location permission denied");
                loadDefaultCity();
            }
        );
    }, []);


    const cityLocalTime: Date = currentTime
        ? new Date(currentTime.toString().replace(" ", "T"))
        : new Date();


    // Dynamic Background

    const background = weather
        ? getWeatherBackground(weather.description, isNightTime())
        : { gradient: "from-slate-50 via-blue-50 to-indigo-100", overlayTop: "from-blue-200", overlayBottom: "from-indigo-200" };
    // Show server-down page if server is unreachable

    if (serverDown) {
        return <Fallback onRetry={async () => {
            setServerDown(false);
            await fetchWeatherByCity("Pune");
            await fetchForecast("Pune");
        }} />;
    }
    return (
        <div className={`min-h-screen bg-gradient-to-br ${background.gradient} transition-all duration-1000`}>
            {loading && <Loader fullScreen />}
            <TempUnitToggle tempUnit={tempUnit} onToggle={toggleUnit} />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6 sm:space-y-8">

                {/* Visited Cities */}
                <VisitedCities
                    cities={visitedCities}
                    tempUnit={tempUnit}
                    onSelect={handleVisitedCityClick}
                    city={city}
                />

                {/* Search */}
                <div className="mb-6">
                    <SearchBar
                        suggestions={suggestions}
                        onSelect={handleSelectLocation}
                        onChange={handleSearchChange}
                        onSubmit={async (city) => {
                            await fetchWeatherByCity(city);
                            await fetchForecast(city);
                            setSuggestions([]);
                        }}
                        disabled={loading}
                    />
                </div>

                {/* Weather Card */}
                {weather && (
                    <div className="mb-6">
                        <WeatherCard weather={weather} tempUnit={tempUnit} />
                    </div>
                )}

                {/* Hourly Forecast */}
                {hourly.length > 0 && (
                    <div className="mb-6">
                        <HourlyForecast hourly={hourly} cityTime={cityLocalTime} tempUnit={tempUnit} city={city} />
                    </div>
                )}

                {/* 5-Day Forecast */}
                {forecast.length > 0 && (
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle icon={<CalendarIcon />}>5-Day Forecast</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Forecast forecast={forecast} tempUnit={tempUnit} />
                        </CardContent>
                    </Card>
                )}
            </div>

            {weather && <WeatherEffects condition={weather.description} />}
        </div>
    );
};