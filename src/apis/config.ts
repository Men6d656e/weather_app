export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_BASE_URL,
  GEO: import.meta.env.VITE_GEO_URL,
  API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY,
  DEFAULT_PARAMS: {
    units: "metric",
    appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
  },
};
