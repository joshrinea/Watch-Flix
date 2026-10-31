export type TrendingTimeWindow = "day" | "week";

export interface TrendingMovie {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  media_type: "movie";
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TrendingTv {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  media_type: "tv";
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  origin_country: string[];
  vote_average: number;
  vote_count: number;
}

export type TrendingMedia = TrendingMovie | TrendingTv;

export interface TrendingResponse {
  page: number;
  results: TrendingMedia[];
  total_pages: number;
  total_results: number;
}
