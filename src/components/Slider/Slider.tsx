import React, { useEffect, useRef, useState } from "react";
import GlobalAPI from "../../services/GlobalAPI";
import { FaChevronRight, FaChevronLeft, FaPlay } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";
import "./Slider.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

type Movie = {
  id: number;
  title?: string;
  backdrop_path?: string;
  overview?: string;
  vote_average?: number;
};

const Slider = () => {
  const [trending, setTrending] = useState<Movie[]>([]);
  const elementRef = useRef<HTMLDivElement>(null);
  const screenWidth = window.innerWidth;

  useEffect(() => {
    getTrending();
  }, []);

  const getTrending = () => {
    GlobalAPI.getTrendingMovies().then((resp: any) => {
      setTrending(resp.data.results);
    });
  };

  const sliderRight = () => {
    if (elementRef.current) {
      elementRef.current.scrollLeft += screenWidth;
    }
  };

  const sliderLeft = () => {
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
          <FaChevronLeft className="text-white" />
        </button>

        <button
          className="d-none d-md-flex btn bg-black bg-opacity-50 rounded-circle border-0 align-items-center justify-content-center"
          style={{ width: "45px", height: "45px" }}
          onClick={sliderRight}
        >
          <FaChevronRight className="text-white" />
        </button>
      </div>

      {/* Slider Track */}
      <div
        className="slider-track d-flex overflow-x-auto scroll-smooth"
        ref={elementRef}
      >
        {trending.map((item) => (
          <div
            key={item.id}
            className="movie-banner position-relative flex-shrink-0 w-100"
          >
            <img
              src={IMAGE_BASE_URL + item.backdrop_path}
              className="w-100 movie-img"
              alt={item.title || "Trending Movie"}
            />

            {/* Overlay */}
            <div className="overlay-banner position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end text-white p-5">
              <div className="banner-content">
                <h2 className="fw-bold">{item.title}</h2>
                <p className="mt-2 mb-3 fs-6" style={{ maxWidth: "600px" }}>
                  {item.overview?.slice(0, 220)}...
                </p>
                
                <div className="d-flex align-items-center gap-3">
                  <span className="fs-5"><TiStarFullOutline className="text-warning" /> {item.vote_average?.toFixed(1)}</span>
                  <button className="btn  d-flex align-items-center gap-2">
                    <FaPlay /> Play
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
