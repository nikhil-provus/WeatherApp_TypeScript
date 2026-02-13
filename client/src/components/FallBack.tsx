// src/components/Fallback.tsx
import React from "react";

interface Props {
  message?: string;
  onRetry?: () => void;
}

export const Fallback: React.FC<Props> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">⚠️ Something went wrong</h1>
      <p className="text-gray-700 mb-6">
        {message || "We are unable to fetch weather data at the moment. Please try again later."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Retry
        </button>
      )}
    </div>
  );
};