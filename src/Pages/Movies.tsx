import React, { useEffect, useState } from "react";
import GlobalAPI from "../services/GlobalAPI";
import { useNavigate } from "react-router-dom";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import "./Movies.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
}

interface Genre {
  id: number;
  name: string;
}

const MoviesPage = (): JSX.Element => {
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
    const fetchGenres = async (): Promise<void> => {
      try {
        const res = await GlobalAPI.getGenres();
        if (res.data?.genres) setGenres(res.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  // Fetch movies when selectedGenre or page changes
  useEffect(() => {
    const fetchMovies = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = selectedGenre
          ? await GlobalAPI.getMoviesByGenre(selectedGenre, page)
          : await GlobalAPI.getAllMovies(page);
        if (response.data?.results) {
          setMovies(response.data.results);
          setTotalPages(response.data.total_pages || 1);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
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

  const nextPage = (): void => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = (): void => {
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
            style={{ cursor: "pointer" }}
          >
            <img
              src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "/no-image.png"}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-info">
              <h4>{movie.title}</h4>
              <p>⭐ {movie.vote_average?.toFixed(1) || "N/A"}</p>
              <p>{movie.release_date?.slice(0, 4) || "Unknown"}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={prevPage} disabled={page === 1}>
          <MdSkipPrevious size={24} /> Prev
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button onClick={nextPage} disabled={page === totalPages}>
          Next <MdSkipNext size={24} />
        </button>
      </div>
    </div>
  );
};

export default MoviesPage;
