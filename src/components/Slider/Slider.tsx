import React, { useEffect, useRef, useState } from "react";
import GlobalAPI from "../../services/GlobalAPI";
import { FaChevronRight, FaChevronLeft, FaPlay } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import "./Slider.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

interface Movie {
  id: number;
  title?: string;
  backdrop_path?: string;
  overview?: string;
  vote_average?: number;
}

const Slider = (): JSX.Element => {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const navigate = useNavigate();
  const elementRef = useRef<HTMLDivElement>(null);
  const screenWidth = window.innerWidth;

  // Fetch trending movies
  useEffect(() => {
    const getTrending = async (): Promise<void> => {
      try {
        const resp = await GlobalAPI.getTrendingMovies();
        if (resp.data?.results) {
          setTrending(resp.data.results);
        }
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    getTrending();
  }, []);

  // Navigate on search input
  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  const sliderRight = (): void => {
    if (elementRef.current) {
      elementRef.current.scrollLeft += screenWidth;
    }
  };

  const sliderLeft = (): void => {
    if (elementRef.current) {
      elementRef.current.scrollLeft -= screenWidth;
    }
  };

  return (
    <div className="slider-wrapper w-100 position-relative">
      {/* Navigation Buttons */}
      <div
        className="position-absolute top-50 start-0 translate-middle-y w-100 d-flex justify-content-between align-items-center px-3"
        style={{ zIndex: 10 }}
      >
        <button
          className="d-none d-md-flex btn bg-black bg-opacity-50 rounded-circle border-0 align-items-center justify-content-center"
          style={{ width: "45px", height: "45px" }}
          onClick={sliderLeft}
        >
          <FaChevronLeft size={20} />
        </button>

        <button
          className="d-none d-md-flex btn bg-black bg-opacity-50 rounded-circle border-0 align-items-center justify-content-center"
          style={{ width: "45px", height: "45px" }}
          onClick={sliderRight}
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      {/* Slider Track */}
      <div
        className="slider-track d-flex overflow-x-auto scroll-smooth"
        ref={elementRef}
      >
        {trending.map((item: Movie) => (
          <div
            key={item.id}
            className="movie-banner position-relative flex-shrink-0 w-100"
          >
            <img
              src={item.backdrop_path ? IMAGE_BASE_URL + item.backdrop_path : "/no-image.png"}
              className="w-100 movie-img"
              alt={item.title || "Trending Movie"}
            />

            {/* Overlay */}
            <div className="overlay-banner position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end text-white p-5">
              <div className="banner-content">
                <h2 className="fw-bold">{item.title}</h2>
                <p className="mt-2 mb-3 fs-6" style={{ maxWidth: "600px" }}>
                  {item.overview ? item.overview.slice(0, 220) : ""}...
                </p>

                <div className="d-flex align-items-center gap-3">
                  <span className="fs-5">
                    <TiStarFullOutline className="text-warning" size={20} />{" "}
                    {item.vote_average?.toFixed(1)}
                  </span>
                  <button className="btn d-flex align-items-center gap-2">
                    <FaPlay size={18} /> Play
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
