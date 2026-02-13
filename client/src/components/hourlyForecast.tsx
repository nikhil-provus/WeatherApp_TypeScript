import { useState, useRef, useEffect } from "react";
import { HrForecast as HourType } from "../types/weatherTypes";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  Area,
  AreaChart,
} from "recharts";
import { convertTemp } from "../utils/temperature";
import { TempUnit } from "../types/temperature";
interface Props {
  hourly: HourType[];
  cityTime: Date;
  tempUnit: TempUnit;
  city: string;
}

export const HourlyForecast = ({ hourly,cityTime,tempUnit }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [currentHourIndex, setCurrentHourIndex] = useState<number>(0);
  const chartRef = useRef<HTMLDivElement>(null);


  // Find current hour index
  useEffect(() => {
    const now = new Date();
    const currTime=cityTime.getHours()-1;
    const currentHour = (currTime) ?? new Date().getHours();;
    
    const index = hourly.findIndex((hour) => {
      const hourTime = new Date(hour.time).getHours();
      return hourTime === currentHour;
    });
    
    setCurrentHourIndex(index >= 0 ? index : 0);
    setActiveIndex(index >= 0 ? index : 0);
  }, [hourly]);

  if (!hourly || hourly.length === 0) return null;

  // Prepare data for chart
  const chartData = hourly.slice(0, 24).map((hour, index) => ({
    time: new Date(hour.time).toLocaleTimeString("en-US", {
      hour: "numeric",
    }),
    temp: convertTemp(hour.temp, tempUnit),
    icon: hour.icon,
    condition: hour.condition,
    fullTime: hour.time,
    index: index,
  }));

  const activeData = activeIndex !== null ? chartData[activeIndex] : chartData[currentHourIndex];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return null; // We'll show info in the header instead
    }
    return null;
  };

  // Handle mouse/touch move
  const handleChartHover = (data: any) => {
    if (data && data.activeTooltipIndex !== undefined) {
      setActiveIndex(data.activeTooltipIndex);
    }
  };

  const handleChartLeave = () => {
    setActiveIndex(currentHourIndex);
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
      {/* Header with active hour info */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            Hourly Forecast
          </h2>
          <div className="text-sm text-gray-500">
            {new Date(activeData.fullTime).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Active hour display */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4">
          <div className="flex-shrink-0">
            {activeData.icon && (
              <img
                src={activeData.icon}
                alt={activeData.condition}
                className="w-16 h-16"
              />
            )}
          </div>
          <div className="flex-grow">
            <p className="text-3xl font-bold text-gray-900">
              {activeData.temp}°
            </p>
            <p className="text-sm text-gray-600 capitalize">
              {activeData.condition}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold text-indigo-600">
              {activeData.time}
            </p>
            {activeIndex === currentHourIndex && (
              <p className="text-xs text-indigo-500 font-medium">Now</p>
            )}
          </div>
        </div>
      </div>

      {/* Temperature Graph */}
      <div ref={chartRef} className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            onMouseMove={handleChartHover}
            onMouseLeave={handleChartLeave}
            onTouchMove={handleChartHover}
            onTouchEnd={handleChartLeave}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            
            <XAxis
              dataKey="time"
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            
            <YAxis
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
              tickLine={false}
              domain={['dataMin - 2', 'dataMax + 2']}
            />
            
            <Tooltip content={<CustomTooltip />} cursor={false} />
            
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#6366f1"
              strokeWidth={3}
              fill="url(#tempGradient)"
              animationDuration={500}
            />
            
            {/* Current hour indicator */}
            <ReferenceDot
              x={chartData[currentHourIndex]?.time}
              y={chartData[currentHourIndex]?.temp}
              r={6}
              fill="#10b981"
              stroke="#fff"
              strokeWidth={2}
            />
            
            {/* Active pointer */}
            {activeIndex !== null && activeIndex !== currentHourIndex && (
              <ReferenceDot
                x={chartData[activeIndex]?.time}
                y={chartData[activeIndex]?.temp}
                r={7}
                fill="#6366f1"
                stroke="#fff"
                strokeWidth={2}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
          <span className="text-gray-600">Current Time</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-indigo-500 border-2 border-white"></div>
          <span className="text-gray-600">Selected</span>
        </div>
      </div>

      {/* Quick scroll hourly cards */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {chartData.map((hour, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`flex-shrink-0 rounded-xl px-3 py-2 transition-all ${
                activeIndex === index
                  ? "bg-indigo-500 text-white shadow-md scale-105"
                  : index === currentHourIndex
                  ? "bg-green-100 text-green-700 border-2 border-green-500"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <p className="text-xs font-medium whitespace-nowrap">
                {hour.time}
              </p>
              <p className="text-sm font-bold">{hour.temp}°</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};