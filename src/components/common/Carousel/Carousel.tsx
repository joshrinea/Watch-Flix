import { useEffect, useState } from "react";
import { trendings } from "../../../data/trendings";
import { CiCircleInfo, CiStar } from "react-icons/ci";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  id: number;

  // Movies use title; TV shows use name
  title?: string;
  name?: string;

  original_title?: string;
  original_name?: string;

  overview: string;
  poster_path: string | null;

  media_type: "movie" | "tv";
  original_language: string;
  genre_ids: number[];
  popularity: number;

  // Movies use release_date; TV shows use first_air_date
  release_date?: string;
  first_air_date?: string;

  vote_average: number;
  vote_count: number;

  // Optional fields found in your data
  video?: boolean;
  origin_country?: string[];
  softcore?: boolean;
}

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState(false);

  const items = trendings.results.slice(0, 6);

  useEffect(() => {
    if (
      paused ||
      index >= items.length - 1 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    } else {
      setError(true);
    }

    const id = window.setTimeout(
      () => setIndex((i) => Math.min(i + 1, items.length - 1)),
      6500,
    );
    return () => clearTimeout(id);
  }, [index, items.length, paused]);

  const m = items[index];

  return (
    <section
      aria-label="Featured Titles"
      className="relative min-h-140 h-[90vh] bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      {items.map((trending, i) => (
        <div
          className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${i === index ? "opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden="true"
          style={{
            backgroundImage: `url(${"https://image.tmdb.org/t/p/original" + trending.backdrop_path})`,
            backgroundPosition: "center 30%",
            backgroundSize: "cover",
          }}
          key={i + trending.id}
        >
          <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/75 via-black/35 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#09090b] via-[#09090b]/20 to-transparent" />
          {m ? (
            <div className="absolute bottom-[15%] left-0! ps-12 right-6 z-10 max-w-2xl sm:left-9 lg:left-14">
              <p className="mb-3 text-xs font-bold uppercase tracking-[.35em] text-red-400">
                Featured on WatchFlix
              </p>
              <h1 className="text-4xl font-black leading-[1.05] tracking-tight drop-shadow-lg sm:text-6xl lg:text-7xl">
                {m.title || "Untitled"}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-200">
                <span className="flex items-center gap-1">
                  <CiStar size={15} className="text-amber-400" />
                  {m.vote_average.toFixed(1)}
                </span>
                <span>
                  {(m.release_date || m.first_air_date || "").slice(0, 4)}
                </span>
                <span className="rounded border border-white/50 px-2 py-0.5 text-xs">
                  {m.media_type === "tv" ? "SERIES" : "MOVIE"}
                </span>
              </div>
              <p
                className="mt-4 line-clamp-3 max-w-xl text-sm leading-relaxed text-zinc-100 sm:text-base"
                title={m.overview}
              >
                {m.overview}
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  // href={detailsUrl(m)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded bg-white px-5 py-3 font-bold text-black hover:bg-zinc-200"
                >
                  <CiCircleInfo size={18} />
                  More Info
                </a>
                <button
                  // onClick={() => toggle("saved", m)}
                  className="inline-flex items-center gap-2 rounded bg-white/20 px-5 py-3 font-bold backdrop-blur-sm hover:bg-white/30"
                >
                  {/* {saved.some((x) => x.id === m.id) ? (
                    <Check size={18} />
                  ) : (
                    <Plus size={18} />
                  )} */}
                  My List
                </button>
              </div>
            </div>
          ) : (
            <div className="absolute bottom-1/3 left-5 text-xl font-semibold text-zinc-300">
              {error
                ? "Unable to load featured titles. Check TMDB configuration."
                : "Loading featured titles…"}
            </div>
          )}
          {index > 0 && (
            // <button
            //   onClick={() => setIndex((i) => Math.max(0, i - 1))}
            //   aria-label="Previous featured title"
            //   className="absolute left-0! top-0 z-20 h-full bg-transparent hover:bg-[linear-gradient(90deg,rgba(0,0,0,0.5)_0%,rgba(255,255,255,0)_100%)] duration-300 p-3 sm:left-4 cursor-pointer"
            // >
            //   <FiChevronLeft />
            // </button>
            <button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              aria-label="Previous featured title"
              className="absolute left-0! top-0 z-20 h-full p-3 sm:left-4
    cursor-pointer
    before:absolute before:inset-0 before:-z-10
    before:bg-[linear-gradient(90deg,rgba(0,0,0,0.5)_0%,rgba(255,255,255,0)_100%)]
    before:opacity-0 before:transition-opacity before:duration-300
    hover:before:opacity-100"
            >
              <FiChevronLeft className="relative z-10 text-white drop-shadow-md" />
            </button>
          )}
          {index < items.length - 1 && (
            // <button
            //   onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
            //   aria-label="Next featured title"
            //   className="absolute right-0! top-0 z-20 h-full bg-transparent hover:bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(0,0,0,0.5)_100%)] duration-300 p-3 sm:right-4 cursor-pointer"
            // >
            //   <FiChevronRight />
            // </button>
            <button
              onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
              aria-label="Next featured title"
              className="absolute right-0! top-0 z-20 h-full p-3 sm:right-4
    cursor-pointer
    before:absolute before:inset-0 before:-z-10
    before:bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(0,0,0,0.5)_100%)]
    before:opacity-0 before:transition-opacity before:duration-300
    hover:before:opacity-100"
            >
              <FiChevronRight className="relative z-10 text-white" />
            </button>
          )}
        </div>
      ))}
    </section>
  );
}
