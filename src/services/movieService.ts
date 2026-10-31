import type { UpcomingMoviesResponse } from "../types/movie";
import type { MediaDetails } from "../types/details";

const API_BASE_URL = import.meta.env.VITE_APP_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function fetchUpcomingMovies(): Promise<UpcomingMoviesResponse> {
  const params = new URLSearchParams({
    api_key: API_KEY,
  });
  const response = await fetch(`${API_BASE_URL}/movie/upcoming?${params}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status}`);
  }

  return response.json() as Promise<UpcomingMoviesResponse>;
}

export async function fetchAllMovies(): Promise<UpcomingMoviesResponse> {
  const params = new URLSearchParams({
    api_key: API_KEY,
    sort_by: "popularity.desc",
  });
  const response = await fetch(`${API_BASE_URL}/discover/movie?${params}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch all movies: ${response.status}`);
  }

  return response.json() as Promise<UpcomingMoviesResponse>;
}

export async function fetchNowPlayingMovies(): Promise<UpcomingMoviesResponse> {
  const params = new URLSearchParams({
    api_key: API_KEY,
  });
  const response = await fetch(`${API_BASE_URL}/movie/now_playing?${params}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch now-playing movies: ${response.status}`);
  }

  return response.json() as Promise<UpcomingMoviesResponse>;
}

export async function fetchMediaDetails(
  mediaType: "movie" | "tv",
  id: string,
): Promise<MediaDetails> {
  const params = new URLSearchParams({
    api_key: API_KEY,
  });
  const response = await fetch(`${API_BASE_URL}/${mediaType}/${id}?${params}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${mediaType} details: ${response.status}`);
  }

  return response.json() as Promise<MediaDetails>;
}
