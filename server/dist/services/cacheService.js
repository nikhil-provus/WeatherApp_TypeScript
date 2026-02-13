"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forecastCache = exports.weatherCache = void 0;
class CacheService {
    constructor() {
        this.cache = {};
    }
    set(key, value, ttl) {
        this.cache[key] = value;
        if (ttl) {
            setTimeout(() => delete this.cache[key], ttl * 1000);
        }
    }
    get(key) {
        return this.cache[key];
    }
    has(key) {
        return key in this.cache;
    }
    delete(key) {
        delete this.cache[key];
    }
    clear() {
        this.cache = {};
    }
}
// Separate instances
exports.weatherCache = new CacheService();
exports.forecastCache = new CacheService();
