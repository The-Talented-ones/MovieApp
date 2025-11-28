import React, { useEffect, useRef, useState } from "react";
import GlobalAPI from "../../services/GlobalAPI";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./Trending.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

interface Movie {
  id: number;
  title?: string;
  poster_path?: string;
  release_date?: string;
}

const TrendingMovieList = (): JSX.Element => {
  const [trending, setTrending] = useState<Movie[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getTrendings = async (): Promise<void> => {
      try {
        const resp = await GlobalAPI.getTrendingMovies();
        if (resp.data?.results) {
          setTrending(resp.data.results);
        }
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    getTrendings();
  }, []);

  const scrollLeft = (): void => {
    scrollRef.current?.scrollBy({ left: -800, behavior: "smooth" });
  };

  const scrollRight = (): void => {
    scrollRef.current?.scrollBy({ left: 800, behavior: "smooth" });
  };

  return (
    <div className="new-release-section position-relative my-4">
      <div className="newRealeaseMovieListHeader">
        <h3 className="newRealeaseMovieListHeading fw-bold mb-3">Trending</h3>
      </div>

      {/* Scroll Buttons */}
      <IoChevronBackOutline
        className="scroll-btn left"
        size={30}
        onClick={scrollLeft}
      />
      <IoChevronForwardOutline
        className="scroll-btn right"
        size={30}
        onClick={scrollRight}
      />

      <div
        className="newRealeaseMovieList d-flex gap-4 overflow-auto"
        ref={scrollRef}
      >
        {trending.map((movie: Movie) => (
          <div
            key={movie.id}
            className="newRealeaseMovieCard position-relative flex-shrink-0"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/detail/${movie.id}`)}
          >
            <img
              src={movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : "/no-image.png"}
              alt={movie.title || "Trending Movie"}
              className="newRealeaseMovieposter"
            />
            <p className="newRealeaseMovietitle mt-2">{movie.title || "No Title"}</p>
            <small className="text-muted">{movie.release_date || "Unknown"}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingMovieList;
