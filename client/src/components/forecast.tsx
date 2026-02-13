import { ForecastDay,ForecastProps,ForecastCardProps } from "../types/weatherTypes";
import { TempUnit } from "../types/temperature";
import { convertTemp } from "../utils/temperature";


const ForecastCard = ({ day, index ,tempUnit}: ForecastCardProps) => {
  const getDayLabel = (dateString: string, idx: number) => {
    if (idx === 0) return "Today";
    if (idx === 1) return "Tomorrow";
    return new Date(dateString).toLocaleDateString("en-US", { weekday: "long" });
  };

  return (
    <div className="group bg-gradient-to-br from-white to-blue-50/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100/50 hover:border-indigo-200">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">

        {/* Day Info */}
        <div className="flex-shrink-0 sm:w-32">
          <h3 className="text-lg font-bold text-gray-800">
            {getDayLabel(day.date, index)}
          </h3>
          <p className="text-sm text-gray-500">
            {new Date(day.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Weather Icon */}
        <div className="flex-shrink-0 w-24 flex justify-center">
          {day.icon && (
            <img
              src={day.icon}
              alt={day.condition}
              className="w-16 h-16 sm:w-20 sm:h-20 group-hover:scale-110 transition-transform"
            />
          )}
        </div>

        {/* Condition */}
        <div className="flex-grow min-w-0 text-center sm:text-left">
          <p className="text-sm sm:text-base text-gray-600 capitalize truncate">
            {day.condition}
          </p>
        </div>

        {/* Temperature */}
        <div className="flex items-baseline gap-1 flex-shrink-0 w-24 justify-center sm:justify-end mt-2 sm:mt-0">
          <span className="text-2xl font-bold text-gray-900">{convertTemp(day.maxTemp, tempUnit)}°</span>
          <span className="text-lg text-gray-400">/</span>
          <span className="text-lg font-semibold text-gray-500">{convertTemp(day.minTemp, tempUnit)}°{tempUnit}</span>
        </div>

      </div>
    </div>
  );
};

export const Forecast = ({ forecast,tempUnit }: ForecastProps) => {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="space-y-3">
      {forecast.map((day, index) => (
        <ForecastCard key={index} day={day} index={index} tempUnit={tempUnit} />
      ))}
    </div>
  );
};