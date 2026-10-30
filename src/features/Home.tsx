import { Component } from "react";
import type { Movie, UpcomingMoviesResponse } from "../types/movie";
import Slider from "../components/common/Slider/Slider";
import Carousel from "../components/common/Carousel/Carousel";

interface HomeState {
  movies: Movie[];
}

export class Home extends Component<{}, HomeState> {
  state: HomeState = {
    movies: [],
  };

  API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  async componentDidMount(): Promise<void> {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.API_KEY}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.status}`);
      }

      const data: UpcomingMoviesResponse = await response.json();
      this.setState({ movies: data.results });
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  render(): React.ReactNode {
    const { movies } = this.state;

    return (
      <div className="App">
        <Carousel />
        <div className="mb-4">
          <h1 className="text-lg ps-12 mb-2">Continue watching</h1>
          <Slider movies={movies} />
        </div>
        <div className="mb-4">
          <h1 className="text-lg ps-12 mb-2">Newly added</h1>
          <Slider movies={movies} />
        </div>
      </div>
    );
  }
}
