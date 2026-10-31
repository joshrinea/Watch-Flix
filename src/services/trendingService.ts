import type {
  TrendingResponse,
  TrendingTimeWindow,
} from "../types/trending";

const API_BASE_URL = import.meta.env.VITE_APP_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function fetchTrendingMedia(
  timeWindow: TrendingTimeWindow = "week",
): Promise<TrendingResponse> {
  const params = new URLSearchParams({
    api_key: API_KEY,
  });
  const response = await fetch(
    `${API_BASE_URL}/trending/all/${timeWindow}?${params}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch trending titles: ${response.status}`);
  }

  return response.json() as Promise<TrendingResponse>;
}
