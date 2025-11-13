import React, { useEffect, useRef, useState } from "react";
import GlobalAPI from "../../services/GlobalAPI";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import "./Trending.css";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
};

const TrendingMovieList = () => {
  const [trending, setTrending] = useState<Movie[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getTrendings();
  }, []);

  const getTrendings = () => {
    GlobalAPI.getTrendingMovies().then((resp) => {
      setTrending(resp.data.results);
    });
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -800, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 800, behavior: "smooth" });
  };

  return (
    <div className="new-release-section position-relative my-4">
      <div className="newRealeaseMovieListHeader">
        <h3 className="newRealeaseMovieListHeading fw-bold mb-3">Trending</h3>
      </div>

      <IoChevronBackOutline
        className="scroll-btn left"
        onClick={scrollLeft}
      />
      <IoChevronForwardOutline
        className="scroll-btn right"
        onClick={scrollRight}
      />

      <div
        className="newRealeaseMovieList d-flex gap-4 overflow-auto"
        ref={scrollRef}
      >
        {trending.map((movie) => (
          <div
            key={movie.id}
            className="newRealeaseMovieCard position-relative flex-shrink-0"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/detail/${movie.id}`)} // Navigate on click
          >
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="newRealeaseMovieposter"
            />
            <p className="newRealeaseMovietitle mt-2">{movie.title}</p>
            <small className="text-muted">{movie.release_date}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingMovieList;
