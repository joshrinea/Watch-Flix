import type { SliderMedia } from "../../../../types/media";
import { useNavigate } from "react-router";

interface SliderItemProps {
  movie: SliderMedia;
  width: number;
  isVisibleFirst: boolean;
  isVisibleLast: boolean;
  imageType: "poster" | "backdrop";
  badge?: string;
  showTitle?: boolean;
}

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w780";

const SliderItem = ({
  movie,
  width,
  isVisibleFirst,
  isVisibleLast,
  imageType,
  badge,
  showTitle,
}: SliderItemProps) => {
  const navigate = useNavigate();
  const posterPath = movie.poster_path || "";
  const backdropPath = movie.backdrop_path || "";
  const title = "title" in movie ? movie.title : movie.name;
  const imagePath = imageType === "backdrop" ? backdropPath : posterPath;

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
      aria-label={title}
      onClick={() =>
        navigate(`/details/${"title" in movie ? "movie" : "tv"}/${movie.id}`)
      }
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          navigate(`/details/${"title" in movie ? "movie" : "tv"}/${movie.id}`);
        }
      }}
    >
      <div className="slider-frame">
        {badge && <span className="slider-badge">{badge}</span>}
        {showTitle && <span className="slider-title">{title}</span>}
        {imagePath ? (
          <img
            className="slider-image slider-poster"
            src={`${imageType === "backdrop" ? BACKDROP_BASE_URL : POSTER_BASE_URL}${imagePath}`}
            alt={`${title} ${imageType}`}
          />
        ) : (
          <div
            className="slider-image slider-image-placeholder"
            role="img"
            aria-label={`${title} ${imageType} unavailable`}
          />
        )}

        {imageType === "poster" && backdropPath && (
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
            <h3>{title}</h3>
            <p title={movie.overview}>{movie.overview || "No overview available."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderItem;
