import React, { useEffect, useState } from "react";
import GlobalAPI from "../services/GlobalAPI";
import { useNavigate } from "react-router-dom";
import "./TVShowsPage.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

type TVShow = {
  id: number;
  name: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
};

type Genre = {
  id: number;
  name: string;
};

const TVShowsPage = () => {
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  // Fetch genres
  useEffect(() => {
    GlobalAPI.getTVGenres().then((res) => {
      setGenres(res.data.genres);
    });
  }, []);

  // Fetch TV shows
  useEffect(() => {
    const fetchTVShows = async () => {
      setLoading(true);
      try {
        const res = selectedGenre
          ? await GlobalAPI.getTVShowsByGenre(selectedGenre, page)
          : await GlobalAPI.getAllTVShows(page);

        setTVShows(res.data.results);
        setTotalPages(res.data.total_pages);
      } catch (err) {
        console.error("Error fetching TV shows:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShows();
  }, [selectedGenre, page]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = e.target.value ? Number(e.target.value) : null;
    setSelectedGenre(genreId);
    setPage(1);
  };

  const filteredTVShows = tvShows.filter((show) =>
    show.name.toLowerCase().includes(searchTerm)
  );

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  if (loading) {
    return <div className="loading">Loading TV shows...</div>;
  }

  return (
    <div className="tv-page">
      <div className="tv-header">
        <h2>TV Shows</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="Search TV shows..."
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

      <div className="tv-grid">
        {filteredTVShows.map((show) => (
          <div
            key={show.id}
            className="tv-card"
            onClick={() => navigate(`/tv/${show.id}`)}
          >
            <img
              src={`${IMAGE_BASE_URL}${show.poster_path}`}
              alt={show.name}
              className="tv-poster"
            />
            <div className="tv-info">
              <h4>{show.name}</h4>
              <p>⭐ {show.vote_average}</p>
              <p>{show.first_air_date?.slice(0, 4)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={prevPage} disabled={page === 1}>
          ◀ Prev
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button onClick={nextPage} disabled={page === totalPages}>
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default TVShowsPage;
