import { Component } from "react";
import type { Movie } from "../types/movie";
import Carousel from "../components/common/Carousel/Carousel";
import Slider from "../components/common/Slider/Slider";
import { fetchAllMovies, fetchUpcomingMovies } from "../services/movieService";

interface MoviesState {
  allMovies: Movie[];
  newMovies: Movie[];
}

export class Movies extends Component<{}, MoviesState> {
  state: MoviesState = {
    allMovies: [],
    newMovies: [],
  };

  async componentDidMount(): Promise<void> {
    try {
      const [allMovies, newMovies] = await Promise.all([
        fetchAllMovies(),
        fetchUpcomingMovies(),
      ]);
      this.setState({
        allMovies: allMovies.results,
        newMovies: newMovies.results,
      });
    } catch (error) {
      console.error("Error fetching movies page:", error);
    }
  }

  render(): React.ReactNode {
    const { allMovies, newMovies } = this.state;

    return (
      <div className="App">
        <Carousel />
        <div className="mb-4">
          <h1 className="px-4 text-lg mb-2 sm:px-9 lg:px-12">New movies</h1>
          <Slider movies={newMovies} />
        </div>
        <div className="mb-4">
          <h1 className="px-4 text-lg mb-2 sm:px-9 lg:px-12">All movies</h1>
          <Slider movies={allMovies} />
        </div>
      </div>
    );
  }
}
