import React, { useEffect, useRef, useState } from "react";
import GlobalAPI from "../services/GlobalAPI";
import MoviePageCard from "./MoviePageCard/MoviePageCard";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

type Movie = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string;
};

interface MoviesPageProps {
  genreId: number;
}

const MoviesPage: React.FC<MoviesPageProps> = ({ genreId }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const elementRef = useRef<HTMLDivElement>(null);
  const screenWidth = window.innerWidth;

  useEffect(() => {
    if (genreId) {
      getMovieByGenreId();
    }
  }, [genreId]);

  const getMovieByGenreId = () => {
    GlobalAPI.getMoviesByGenreId(genreId)
      .then((response) => {
        console.log(response.data.results);
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  };

  const scrollRight = () => {
    if (elementRef.current) {
      elementRef.current.scrollLeft += screenWidth - 110;
    }
  };

  const scrollLeft = () => {
    if (elementRef.current) {
      elementRef.current.scrollLeft -= screenWidth - 110;
    }
  };

  return (
    <div className="position-relative d-flex align-items-center my-4">

      <IoChevronBackOutline
        onClick={scrollLeft}
        className="position-absolute start-0 ms-2 text-dark bg-light bg-opacity-75 rounded-circle p-2 cursor-pointer"
        style={{ zIndex: 10, cursor: "pointer", fontSize: "50px" }}
      />


      <div
        ref={elementRef}
        className="d-flex overflow-auto gap-3 px-5 py-2 w-100"
      >
        {movies.map((movie) => (
          <MoviePageCard key={movie.id} movie={movie} />
        ))}
      </div>


      <IoChevronForwardOutline
        onClick={scrollRight}
        className="position-absolute end-0 me-2  text-dark bg-light bg-opacity-75 rounded-circle p-2 cursor-pointer"
        style={{ zIndex: 10, cursor: "pointer", fontSize: "50px" }}
      />
    </div>
  );
};

export default MoviesPage;


