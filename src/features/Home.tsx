import { Component } from "react";
import type { Movie, UpcomingMoviesResponse } from "../types/movie";
import type { TvShow } from "../types/media";
import Slider from "../components/common/Slider/Slider";
import Carousel from "../components/common/Carousel/Carousel";
import {
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
} from "../services/movieService";
import { fetchNewEpisodes } from "../services/tvService";

interface HomeState {
  movies: Movie[];
  nowPlaying: Movie[];
  newEpisodes: TvShow[];
}

export class Home extends Component<{}, HomeState> {
  state: HomeState = {
    movies: [],
    nowPlaying: [],
    newEpisodes: [],
  };

  async componentDidMount(): Promise<void> {
    try {
      const data: UpcomingMoviesResponse = await fetchUpcomingMovies();
      this.setState({ movies: data.results });
    } catch (error) {
      console.error("Error fetching movies:", error);
    }

    try {
      const [nowPlaying, newEpisodes] = await Promise.all([
        fetchNowPlayingMovies(),
        fetchNewEpisodes(),
      ]);
      this.setState({
        nowPlaying: nowPlaying.results,
        newEpisodes: newEpisodes.results,
      });
    } catch (error) {
      console.error("Error fetching home sections:", error);
    }
  }

  render(): React.ReactNode {
    const { movies, nowPlaying, newEpisodes } = this.state;

    return (
      <div className="App">
        <Carousel />
        <div className="mb-4">
          <h1 className="px-4 text-lg mb-2 sm:px-9 lg:px-12">Continue watching</h1>
          <Slider movies={movies} />
        </div>
        <div className="mb-4">
          <h1 className="px-4 text-lg mb-2 sm:px-9 lg:px-12">Newly added</h1>
          <Slider movies={movies} />
        </div>
        <div className="mb-4">
          <h1 className="px-4 text-lg mb-2 sm:px-9 lg:px-12">Now playing</h1>
          <Slider movies={nowPlaying} imageType="backdrop" size="large" />
        </div>
        <div className="mb-4">
          <h1 className="px-4 text-lg mb-2 sm:px-9 lg:px-12">New episodes</h1>
          <Slider
            movies={newEpisodes}
            imageType="backdrop"
            size="extra-large"
            badge="NEW EPISODE"
            showTitle
          />
        </div>
      </div>
    );
  }
}
