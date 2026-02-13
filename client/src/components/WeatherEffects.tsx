// Optional: WeatherEffects.tsx
// Animated effects for rain, snow, etc.
// Install: npm install framer-motion (if you want to use this component)

import { useEffect, useState } from 'react';

interface WeatherEffectsProps {
  condition: string;
}

export const WeatherEffects = ({ condition }: WeatherEffectsProps) => {
  const [particles, setParticles] = useState<number[]>([]);
  
  useEffect(() => {
    const desc = condition.toLowerCase();
    
    if (desc.includes('rain') || desc.includes('drizzle')) {
      setParticles(Array.from({ length: 50 }, (_, i) => i));
    } else if (desc.includes('snow')) {
      setParticles(Array.from({ length: 30 }, (_, i) => i));
    } else {
      setParticles([]);
    }
  }, [condition]);

  if (particles.length === 0) return null;

  const isSnow = condition.toLowerCase().includes('snow');
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = isSnow ? 8 + Math.random() * 4 : 1 + Math.random() * 1;
        
        return (
          <div
            key={i}
            className={`absolute ${isSnow ? 'w-2 h-2 bg-white rounded-full opacity-70' : 'w-0.5 h-8 bg-blue-300 opacity-50'}`}
            style={{
              left: `${left}%`,
              top: '-5%',
              animation: `fall ${duration}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) ${isSnow ? 'translateX(20px)' : ''};
          }
        }
      `}</style>
    </div>
  );
};

// Usage in Home.tsx:
// Import: import { WeatherEffects } from "../components/WeatherEffects";
// Add before closing div: {weather && <WeatherEffects condition={weather.description} />}