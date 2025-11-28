import React, { useEffect, useRef, useState } from "react";
import GlobalAPI from "../services/GlobalAPI";
import MoviePageCard from "./MoviePageCard/MoviePageCard";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string;
}

interface MoviesPageProps {
  genreId: number;
}

const MoviesPage: React.FC<MoviesPageProps> = ({ genreId }): JSX.Element => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const elementRef = useRef<HTMLDivElement>(null);
  const screenWidth = window.innerWidth;

  useEffect(() => {
    const getMovieByGenreId = async (): Promise<void> => {
      try {
        const response = await GlobalAPI.getMoviesByGenreId(genreId);
        if (response.data?.results) {
          setMovies(response.data.results);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    if (genreId) {
      getMovieByGenreId();
    }
  }, [genreId]);

  const scrollRight = (): void => {
    if (elementRef.current) {
      elementRef.current.scrollLeft += screenWidth - 110;
    }
  };

  const scrollLeft = (): void => {
    if (elementRef.current) {
      elementRef.current.scrollLeft -= screenWidth - 110;
    }
  };

  return (
    <div className="position-relative d-flex align-items-center my-4">
      <IoChevronBackOutline
        size={50}
        onClick={scrollLeft}
        className="position-absolute start-0 ms-2 text-dark bg-light bg-opacity-75 rounded-circle p-2"
        style={{ zIndex: 10, cursor: "pointer" }}
      />

      <div
        ref={elementRef}
        className="d-flex overflow-auto gap-3 px-5 py-2 w-100"
      >
        {movies.map((movie: Movie) => (
          <MoviePageCard key={movie.id} movie={movie} />
        ))}
      </div>

      <IoChevronForwardOutline
        size={50}
        onClick={scrollRight}
        className="position-absolute end-0 me-2 text-dark bg-light bg-opacity-75 rounded-circle p-2"
        style={{ zIndex: 10, cursor: "pointer" }}
      />
    </div>
  );
};

export default MoviesPage;
