import React, { Component } from "react";

import type { SliderMedia } from "../../../types/media";
// import { SliderControl } from "./slider-control/sliderControl";
import SliderControl from "./slider-control/sliderControl";
import SliderItem from "./slider-item/sliderItem";

const ANIMATION_MS = 750;

interface SliderProps {
  movies: SliderMedia[];
  imageType?: "poster" | "backdrop";
  size?: "default" | "large" | "extra-large";
  badge?: string;
  showTitle?: boolean;
}

interface SliderState {
  sliderMoving: boolean; // true while the slide animation runs
  movePercentage: number; // amount to offset slider
  lowestVisibleIndex: number; // lowest visible index of slider items
  itemsInRow: number; // number of items displayed across the screen
}

export class Slider extends Component<SliderProps, SliderState> {
  state: SliderState = {
    sliderMoving: false,
    movePercentage: 0,
    lowestVisibleIndex: 0,
    itemsInRow: 5,
  };

  private moveTimeout: ReturnType<typeof setTimeout> | undefined;
  private touchStartX: number | null = null;

  private getItemsInRow(size: "default" | "large" | "extra-large"): number {
    if (size === "extra-large") {
      if (window.innerWidth <= 768) return 1;
      return window.innerWidth <= 1024 ? 2 : 3;
    }

    if (size === "large") {
      if (window.innerWidth <= 425) return 1;
      if (window.innerWidth <= 768) return 2;
      return window.innerWidth <= 1024 ? 3 : 4;
    }

    if (window.innerWidth <= 425) return 2;
    if (window.innerWidth <= 768) return 3;
    if (window.innerWidth <= 1024) return 5;
    return 8;
  }

  componentDidMount(): void {
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
  }

  componentWillUnmount(): void {
    window.removeEventListener("resize", this.handleWindowResize);
    clearTimeout(this.moveTimeout);
  }

  componentDidUpdate(prevProps: SliderProps): void {
    if (prevProps.movies.length === this.props.movies.length) return;

    const maxVisibleIndex = this.getMaxVisibleIndex(this.state.itemsInRow);
    if (
      this.state.sliderMoving ||
      this.state.lowestVisibleIndex > maxVisibleIndex
    ) {
      clearTimeout(this.moveTimeout);
      this.setState({
        lowestVisibleIndex: Math.min(
          this.state.lowestVisibleIndex,
          maxVisibleIndex,
        ),
        sliderMoving: false,
        movePercentage: 0,
      });
    }
  }

  private getMaxVisibleIndex(itemsInRow: number): number {
    const visibleItems = Math.min(itemsInRow, this.props.movies.length);
    return Math.max(0, this.props.movies.length - visibleItems);
  }

  // alter number of items in row on window resize
  handleWindowResize = (): void => {
    const itemsInRow = this.getItemsInRow(this.props.size ?? "default");

    if (itemsInRow === this.state.itemsInRow) return;

    clearTimeout(this.moveTimeout);
    this.setState({
      itemsInRow,
      lowestVisibleIndex: Math.min(
        this.state.lowestVisibleIndex,
        this.getMaxVisibleIndex(itemsInRow),
      ),
      sliderMoving: false,
      movePercentage: 0,
    });
  };

  // render the slider contents
  // renderSliderContent = (): React.ReactElement[] => {
  //   const { movies } = this.props;
  //   const totalItemSlots = Math.max(movies.length, this.state.itemsInRow);
  //   return movies.map((movie) => (
  //     <SliderItem movie={movie} key={movie.id} width={100 / totalItemSlots} />
  //   ));
  // };
  renderSliderContent = (): React.ReactElement[] => {
    const { movies } = this.props;
    const { imageType = "poster" } = this.props;
    const { badge } = this.props;
    const { showTitle } = this.props;
    const { lowestVisibleIndex, itemsInRow } = this.state;
    const totalItemSlots = Math.max(movies.length, itemsInRow);
    const lastVisibleIndex = Math.min(
      lowestVisibleIndex + itemsInRow - 1,
      movies.length - 1,
    );

    return movies.map((movie, index) => (
      <SliderItem
        movie={movie}
        key={movie.id}
        width={100 / totalItemSlots}
        isVisibleFirst={index === lowestVisibleIndex}
        isVisibleLast={index === lastVisibleIndex}
        imageType={imageType}
        badge={badge}
        showTitle={showTitle}
      />
    ));
  };

  // handle previous control
  handlePrev = (): void => {
    const { lowestVisibleIndex, itemsInRow, sliderMoving } = this.state;
    if (sliderMoving || lowestVisibleIndex <= 0) return;

    const newIndex = Math.max(0, lowestVisibleIndex - itemsInRow);
    this.animateTo(newIndex);
  };

  // handle next control
  handleNext = (): void => {
    const { lowestVisibleIndex, itemsInRow, sliderMoving } = this.state;
    const maxVisibleIndex = this.getMaxVisibleIndex(itemsInRow);
    if (sliderMoving || lowestVisibleIndex >= maxVisibleIndex) return;

    const newIndex = Math.min(lowestVisibleIndex + itemsInRow, maxVisibleIndex);

    this.animateTo(newIndex);
  };

  handleTouchStart = (event: React.TouchEvent<HTMLDivElement>): void => {
    this.touchStartX = event.touches[0]?.clientX ?? null;
  };

  handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>): void => {
    if (this.touchStartX === null) return;

    const touchEndX = event.changedTouches[0]?.clientX;
    const swipeDistance =
      touchEndX === undefined ? 0 : touchEndX - this.touchStartX;
    this.touchStartX = null;

    if (Math.abs(swipeDistance) < 40) return;

    if (swipeDistance < 0) {
      this.handleNext();
    } else {
      this.handlePrev();
    }
  };

  // triggers the animation, then updates lowestVisibleIndex and resets in the callback
  private animateTo(newIndex: number): void {
    const boundedIndex = Math.min(
      Math.max(newIndex, 0),
      this.getMaxVisibleIndex(this.state.itemsInRow),
    );
    const totalItemSlots = Math.max(
      this.props.movies.length,
      this.state.itemsInRow,
    );
    const movePercentage =
      ((boundedIndex - this.state.lowestVisibleIndex) / totalItemSlots) * 100;

    this.setState(
      {
        sliderMoving: true,
        movePercentage,
      },
      () => {
        this.moveTimeout = setTimeout(() => {
          this.setState({
            lowestVisibleIndex: boundedIndex,
            sliderMoving: false,
            movePercentage: 0,
          });
        }, ANIMATION_MS);
      },
    );
  }

  render(): React.ReactNode {
    const { itemsInRow, sliderMoving, movePercentage, lowestVisibleIndex } =
      this.state;
    const { movies } = this.props;

    // return null if movies are not loaded
    if (!movies.length) {
      return null;
    }

    const maxVisibleIndex = this.getMaxVisibleIndex(itemsInRow);

    // style object handling animation
    const boundedIndex = Math.min(
      Math.max(lowestVisibleIndex, 0),
      maxVisibleIndex,
    );
    const totalItemSlots = Math.max(movies.length, itemsInRow);
    const currentOffset = (boundedIndex / totalItemSlots) * 100;
    const style: React.CSSProperties = {
      transform: `translateX(-${
        currentOffset + (sliderMoving ? movePercentage : 0)
      }%)`,
      transitionDuration: sliderMoving ? `${ANIMATION_MS}ms` : "0ms",
      width: `${Math.max(movies.length / itemsInRow, 1) * 100}%`,
    };

    return (
      <div
        className={`slider slider--${this.props.imageType ?? "poster"} slider--${this.props.size ?? "default"}`}
      >
        <div
          className="slider-content-viewport"
          onTouchStart={this.handleTouchStart}
          onTouchEnd={this.handleTouchEnd}
          onTouchCancel={() => {
            this.touchStartX = null;
          }}
        >
          {boundedIndex > 0 && (
            <SliderControl arrowDirection="left" onClick={this.handlePrev} />
          )}
          <div className="slider-content" style={style}>
            {this.renderSliderContent()}
          </div>
          {boundedIndex < maxVisibleIndex && (
            <SliderControl arrowDirection="right" onClick={this.handleNext} />
          )}
        </div>
      </div>
    );
  }
}

export default Slider;
