import { WeatherResponse } from "../types/weatherTypes";
import { TempUnit } from "../types/temperature";
import { convertTemp } from "../utils/temperature";
interface Props {
  weather: WeatherResponse;
  tempUnit: TempUnit;
}

export const WeatherCard = ({ weather,tempUnit }: Props) => {
  return (
    <div className="relative">

      {/* Glass Card */}
      <div className="backdrop-blur-2xl bg-gradient-to-br from-black/30 to-black/10 border border-white/30 rounded-[2.5rem] shadow-2xl p-8 sm:p-10 transition-all duration-300 hover:shadow-3xl">

        {/* Shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-[2.5rem] animate-shimmer" />

        <div className="relative z-10 space-y-6">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
            <div>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
                Weather Now
              </p>
              <h2 className="text-white text-3xl font-bold drop-shadow-lg">
                {weather.city}
              </h2>
            </div>

            {weather.icon && (
              <img
                src={weather.icon}
                alt={weather.description}
                className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-lg"
              />
            )}
          </div>

          {/* Temperature & Description */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 sm:gap-8">
            <div className="flex items-baseline gap-2">
              <h1 className="text-7xl sm:text-9xl font-extralight text-white leading-none drop-shadow-2xl">
                {convertTemp(weather.temperature, tempUnit)}
              </h1>
              <span className="text-4xl sm:text-5xl text-white/90 font-light drop-shadow-lg">°{tempUnit}</span>
            </div>
            <p className="text-white text-xl sm:text-2xl font-medium mt-2 sm:mt-0 capitalize drop-shadow-md">
              {weather.description}
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 pt-6 border-t border-white/30">

            {/* Humidity */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/30 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <svg className="w-6 h-6 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-white text-lg font-bold drop-shadow-md">{weather.humidity}%</p>
                <p className="text-white/80 text-sm drop-shadow-sm">Humidity</p>
              </div>
            </div>

            {/* Wind Speed */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-cyan-500/30 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <svg className="w-6 h-6 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-lg font-bold drop-shadow-md">{weather.windSpeed}</p>
                <p className="text-white/80 text-sm drop-shadow-sm">km/h</p>
              </div>
            </div>

            {/* UV Index */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-yellow-400/30 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <svg className="w-6 h-6 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zM4.22 4.22a1 1 0 011.42 0l1.42 1.42a1 1 0 11-1.42 1.42L4.22 5.64a1 1 0 010-1.42zM2 12a1 1 0 011-1h2a1 1 0 110 2H3a1 1 0 01-1-1zm8 8a1 1 0 011-1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm7.78-2.22a1 1 0 010 1.42l-1.42 1.42a1 1 0 11-1.42-1.42l1.42-1.42a1 1 0 011.42 0zM19 12a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm-7-7a1 1 0 011-1v2a1 1 0 11-2 0V4a1 1 0 011-1z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-lg font-bold drop-shadow-md">{weather.uv}</p>
                <p className="text-white/80 text-sm drop-shadow-sm">UV Index</p>
              </div>
            </div>

            {/* Feels Like */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-pink-500/30 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <svg className="w-6 h-6 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a5 5 0 015 5c0 2.5-5 9-5 9s-5-6.5-5-9a5 5 0 015-5z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-lg font-bold drop-shadow-md">{convertTemp(weather.feelslike, tempUnit)}°{tempUnit}</p>
                <p className="text-white/80 text-sm drop-shadow-sm">Feels Like</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </div>
  );
};