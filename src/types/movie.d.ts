export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview?: string;
  popularity: number;
  poster_path?: string | null;
  release_date?: string;
  softcore: boolean;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface UpcomingMoviesResponse {
  results: Movie[];
  page?: number;
  total_pages?: number;
  total_results?: number;
}

export type SliderDirection = "left" | "right";