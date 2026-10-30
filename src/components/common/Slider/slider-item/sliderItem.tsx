import type { Movie } from "../../../../types/movie";

interface SliderItemProps {
  movie: Movie;
  width: number;
  isVisibleFirst: boolean;
  isVisibleLast: boolean;
}

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w780";

const SliderItem = ({
  movie,
  width,
  isVisibleFirst,
  isVisibleLast,
}: SliderItemProps) => {
  const posterPath = movie.poster_path || "";
  const backdropPath = movie.backdrop_path || "";

  const itemClassName = [
    "slider-item",
    isVisibleFirst && "slider-item--first-visible",
    isVisibleLast && "slider-item--last-visible",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={itemClassName}
      style={{ width: `${width}%` }}
      tabIndex={0}
      role="group"
      aria-label={movie.title}
    >
      <div className="slider-frame">
        {posterPath ? (
          <img
            className="slider-image slider-poster"
            src={`${POSTER_BASE_URL}${posterPath}`}
            alt={`${movie.title} poster`}
          />
        ) : (
          <div
            className="slider-image slider-image-placeholder"
            role="img"
            aria-label={`${movie.title} poster unavailable`}
          />
        )}

        {backdropPath && (
          <img
            className="slider-image slider-backdrop"
            src={`${BACKDROP_BASE_URL}${backdropPath}`}
            alt=""
            aria-hidden="true"
          />
        )}
        <div className="slider-info">
          <button
            className="slider-bookmark"
            type="button"
            // aria-label={
            //   isBookmarked ? "Remove bookmark" : "Add bookmark"
            // }
            // aria-pressed={isBookmarked}
            // onClick={() => setIsBookmarked((current) => !current)}
          >
            {/* {isBookmarked ? <FaBookmark /> : <FaRegBookmark />} */}
          </button>

          <div className="slider-info-copy">
            <h3>{movie.title}</h3>
            <p title={movie.overview}>{movie.overview || "No overview available."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderItem;
