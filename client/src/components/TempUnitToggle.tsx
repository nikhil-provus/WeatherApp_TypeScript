// TempUnitToggle.tsx
import { TempUnit } from "../types/temperature";

interface TempUnitToggleProps {
  tempUnit: TempUnit;
  onToggle: () => void;
}

export const TempUnitToggle = ({ tempUnit, onToggle }: TempUnitToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="group fixed top-6 right-6 z-50 backdrop-blur-xl bg-white/20 border border-white/40 rounded-full p-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      <div className="flex items-center gap-1">
        {/* Celsius Option */}
        <div
          className={`
            px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300
            ${tempUnit === TempUnit.Celsius
              ? 'bg-white text-indigo-600 shadow-md'
              : 'text-white/70 hover:text-white'
            }
          `}
        >
          °C
        </div>

        {/* Fahrenheit Option */}
        <div
          className={`
            px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300
            ${tempUnit === TempUnit.Fahrenheit
              ? 'bg-white text-indigo-600 shadow-md'
              : 'text-white/70 hover:text-white'
            }
          `}
        >
          °F
        </div>
      </div>
    </button>
  );
};