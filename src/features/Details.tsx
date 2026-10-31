import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { MediaDetails } from "../types/details";
import { fetchMediaDetails } from "../services/movieService";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export default function Details() {
  const { mediaType, id } = useParams();
  const [media, setMedia] = useState<MediaDetails | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if ((mediaType !== "movie" && mediaType !== "tv") || !id) {
      setError(true);
      return;
    }

    setMedia(null);
    setError(false);
    fetchMediaDetails(mediaType, id)
      .then(setMedia)
      .catch((fetchError: unknown) => {
        console.error("Error fetching media details:", fetchError);
        setError(true);
      });
  }, [id, mediaType]);

  if (error) {
    return (
      <div className="details-page">
        <p>Unable to load this title.</p>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  if (!media) {
    return <div className="details-page">Loading...</div>;
  }

  const title = media.title || media.name || "Untitled";
  const date = media.release_date || media.first_air_date || "";
  const runtime = media.runtime || media.episode_run_time?.[0];

  return (
    <article
      className="details-page"
      style={{
        backgroundImage: media.backdrop_path
          ? `linear-gradient(90deg, #09090b 0%, rgba(9, 9, 11, 0.7) 45%, rgba(9, 9, 11, 0.25) 100%), url("${IMAGE_BASE_URL}${media.backdrop_path}")`
          : undefined,
      }}
    >
      <div className="details-content">
        <Link className="details-back" to="/">
          Back to home
        </Link>
        <p className="details-label">
          {mediaType === "tv" ? "SERIES" : "MOVIE"}
        </p>
        <h1>{title}</h1>
        <div className="details-meta">
          <span>{date.slice(0, 4)}</span>
          <span>{media.vote_average.toFixed(1)} rating</span>
          {runtime && <span>{runtime} min</span>}
        </div>
        <div className="details-genres">
          {media.genres.map((genre) => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </div>
        <p className="details-overview">
          {media.overview || "No overview available."}
        </p>
      </div>
    </article>
  );
}
