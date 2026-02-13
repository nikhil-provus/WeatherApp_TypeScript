// src/services/cacheService.ts
import { WeatherResponse } from "../types/weatherTypes";
import { ForecastResponse } from "../types/weatherTypes";
class CacheService<T> {
  private cache: Record<string, T> = {};

  set(key: string, value: T, ttl?: number) {
    this.cache[key] = value;
    if (ttl) {
      setTimeout(() => delete this.cache[key], ttl * 1000);
    }
  }

  get(key: string): T | undefined {
    return this.cache[key];
  }

  has(key: string): boolean {
    return key in this.cache;
  }

  delete(key: string) {
    delete this.cache[key];
  }

  clear() {
    this.cache = {};
  }
}

// Separate instances
export const weatherCache = new CacheService<WeatherResponse>();
export const forecastCache = new CacheService<ForecastResponse>();