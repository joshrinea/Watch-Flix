import type { TvShow } from "../types/media";

const API_BASE_URL = import.meta.env.VITE_APP_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export interface TvShowsResponse {
  results: TvShow[];
  page?: number;
  total_pages?: number;
  total_results?: number;
}

export async function fetchNewEpisodes(): Promise<TvShowsResponse> {
  const params = new URLSearchParams({
    api_key: API_KEY,
  });
  const response = await fetch(`${API_BASE_URL}/tv/on_the_air?${params}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch new episodes: ${response.status}`);
  }

  return response.json() as Promise<TvShowsResponse>;
}

export async function fetchAllTvShows(): Promise<TvShowsResponse> {
  const params = new URLSearchParams({
    api_key: API_KEY,
    sort_by: "popularity.desc",
  });
  const response = await fetch(`${API_BASE_URL}/discover/tv?${params}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch all TV shows: ${response.status}`);
  }

  return response.json() as Promise<TvShowsResponse>;
}
