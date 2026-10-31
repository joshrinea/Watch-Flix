import { Component } from "react";
import type { TvShow } from "../types/media";
import Carousel from "../components/common/Carousel/Carousel";
import Slider from "../components/common/Slider/Slider";
import {
  fetchAllTvShows,
  fetchNewEpisodes,
} from "../services/tvService";

interface TvState {
  allShows: TvShow[];
  newEpisodes: TvShow[];
}

export class Tv extends Component<{}, TvState> {
  state: TvState = {
    allShows: [],
    newEpisodes: [],
  };

  async componentDidMount(): Promise<void> {
    try {
      const [allShows, newEpisodes] = await Promise.all([
        fetchAllTvShows(),
        fetchNewEpisodes(),
      ]);
      this.setState({
        allShows: allShows.results,
        newEpisodes: newEpisodes.results,
      });
    } catch (error) {
      console.error("Error fetching TV page:", error);
    }
  }

  render(): React.ReactNode {
    const { allShows, newEpisodes } = this.state;

    return (
      <div className="App">
        <Carousel />
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
        <div className="mb-4">
          <h1 className="px-4 text-lg mb-2 sm:px-9 lg:px-12">All series</h1>
          <Slider movies={allShows} />
        </div>
      </div>
    );
  }
}
