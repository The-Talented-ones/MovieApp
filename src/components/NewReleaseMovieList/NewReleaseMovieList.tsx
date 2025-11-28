import React, { useEffect, useRef, useState } from "react";
import GlobalAPI from "../../services/GlobalAPI";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./NewReleaseMovieList.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

interface Movie {
  id: number;
  title: string;
  poster_path?: string; // optional in case API returns null
  release_date: string;
}

const NewReleaseMovieList = (): JSX.Element => {
  const [newReleases, setNewReleases] = useState<Movie[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getNewReleases();
  }, []);

  const getNewReleases = async (): Promise<void> => {
    try {
      const resp = await GlobalAPI.getNewReleaseMovies();
      if (resp.data?.results) {
        setNewReleases(resp.data.results);
      } else {
        console.warn("No new release movies returned from API");
      }
    } catch (error) {
      console.error("Failed to fetch new release movies:", error);
    }
  };

  const scrollLeft = (): void => {
    scrollRef.current?.scrollBy({ left: -800, behavior: "smooth" });
  };

  const scrollRight = (): void => {
    scrollRef.current?.scrollBy({ left: 800, behavior: "smooth" });
  };

  return (
    <div className="new-release-section position-relative my-4">
      <div className="newRealeaseMovieListHeader">
        <h3 className="newRealeaseMovieListHeading fw-bold mb-3">New Releases</h3>
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

      <div className="newRealeaseMovieList d-flex gap-4 overflow-auto" ref={scrollRef}>
        {newReleases.map((movie: Movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/detail/${movie.id}`)}
            className="newRealeaseMovieCard position-relative flex-shrink-0"
            style={{ cursor: "pointer" }}
          >
            <span className="new-badge">NEW</span>
            <img
              src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "/no-image.png"}
              alt={movie.title}
              className="newRealeaseMovieposter"
            />
            <p className="newRealeaseMovietitle mt-2">{movie.title}</p>
            <small className="text-white">{movie.release_date}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewReleaseMovieList;
