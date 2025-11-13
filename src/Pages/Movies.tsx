import React, { useEffect, useState } from "react";
import GlobalAPI from "../services/GlobalAPI";
import { useNavigate } from "react-router-dom";
import "./Movies.css";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

type Genre = {
  id: number;
  name: string;
};

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  // Fetch genres once
  useEffect(() => {
    GlobalAPI.getGenres().then((res) => {
      setGenres(res.data.genres);
    });
  }, []);

  // Fetch movies
  useEffect(() => {
    setLoading(true);
    const fetchMovies = selectedGenre
      ? GlobalAPI.getMoviesByGenre(selectedGenre, page)
      : GlobalAPI.getAllMovies(page);

    fetchMovies.then((res) => {
      setMovies(res.data.results);
      setTotalPages(res.data.total_pages);
      setLoading(false);
    });
  }, [selectedGenre, page]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = e.target.value ? Number(e.target.value) : null;
    setSelectedGenre(genreId);
    setPage(1); // reset to first page on genre change
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm)
  );

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }

  return (
    <div className="movies-page">
      <div className="movies-header">
        <h2>All Movies</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <select
            className="genre-select"
            value={selectedGenre ?? ""}
            onChange={handleGenreChange}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-info">
              <h4>{movie.title}</h4>
              <p>⭐ {movie.vote_average}</p>
              <p>{movie.release_date?.slice(0, 4)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={prevPage} disabled={page === 1}>
          <MdSkipPrevious /> Prev
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button onClick={nextPage} disabled={page === totalPages}>
          Next <MdSkipNext />
        </button>
      </div>
    </div>
  );
};

export default MoviesPage;
