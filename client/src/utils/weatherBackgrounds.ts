// weatherBackgrounds.ts
// Utility for dynamic weather-based backgrounds

export interface WeatherBackground {
  gradient: string;
  overlayTop: string;
  overlayBottom: string;
}

export const getWeatherBackground = (
  description: string,
  isNight: boolean = false
): WeatherBackground => {
  const desc = description.toLowerCase();

  // Night backgrounds
  if (isNight) {
    if (desc.includes('clear')) {
      return {
        gradient: 'from-indigo-900 via-purple-900 to-blue-900',
        overlayTop: 'from-purple-400/20',
        overlayBottom: 'from-indigo-400/20'
      };
    }
    if (desc.includes('cloud')) {
      return {
        gradient: 'from-slate-800 via-gray-800 to-slate-900',
        overlayTop: 'from-slate-500/20',
        overlayBottom: 'from-gray-600/20'
      };
    }
    if (desc.includes('rain') || desc.includes('drizzle')) {
      return {
        gradient: 'from-slate-700 via-blue-900 to-indigo-900',
        overlayTop: 'from-blue-500/20',
        overlayBottom: 'from-slate-600/20'
      };
    }
    if (desc.includes('storm') || desc.includes('thunder')) {
      return {
        gradient: 'from-gray-900 via-slate-800 to-purple-900',
        overlayTop: 'from-purple-600/30',
        overlayBottom: 'from-gray-700/30'
      };
    }
  }

  // Day backgrounds
  if (desc.includes('clear') || desc.includes('sunny')) {
    return {
      gradient: 'from-sky-400 via-blue-300 to-cyan-200',
      overlayTop: 'from-yellow-200/30',
      overlayBottom: 'from-blue-300/20'
    };
  }

  if (desc.includes('cloud') && !desc.includes('rain')) {
    return {
      gradient: 'from-gray-300 via-slate-200 to-blue-200',
      overlayTop: 'from-slate-300/30',
      overlayBottom: 'from-gray-400/20'
    };
  }

  if (desc.includes('rain') || desc.includes('drizzle')) {
    return {
      gradient: 'from-slate-500 via-blue-400 to-indigo-400',
      overlayTop: 'from-blue-400/30',
      overlayBottom: 'from-slate-500/25'
    };
  }

  if (desc.includes('storm') || desc.includes('thunder')) {
    return {
      gradient: 'from-gray-700 via-slate-600 to-purple-700',
      overlayTop: 'from-purple-500/40',
      overlayBottom: 'from-gray-600/30'
    };
  }

  if (desc.includes('snow')) {
    return {
      gradient: 'from-blue-100 via-slate-100 to-gray-200',
      overlayTop: 'from-blue-200/30',
      overlayBottom: 'from-slate-200/25'
    };
  }

  if (desc.includes('mist') || desc.includes('fog') || desc.includes('haze')) {
    return {
      gradient: 'from-gray-200 via-slate-300 to-blue-200',
      overlayTop: 'from-slate-300/40',
      overlayBottom: 'from-gray-300/30'
    };
  }

  // Default fallback
  return {
    gradient: 'from-slate-50 via-blue-50 to-indigo-100',
    overlayTop: 'from-blue-200',
    overlayBottom: 'from-indigo-200'
  };
};

// Helper to determine if it's nighttime based on current hour
export const isNightTime = (): boolean => {
  const hour = new Date().getHours();
  return hour < 6 || hour >= 19;
};