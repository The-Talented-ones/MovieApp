import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GlobalAPI from "../services/GlobalAPI";
import MoviePageCard from "../components/MoviePageCard/MoviePageCard";
import './SearchPage.css'; // 👈 import custom styles

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  // Extract query from ?q=
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (query && query.trim() !== "") {
      setLoading(true);
      setError(null);
      GlobalAPI.getSearchMovies(query)
        .then((res: any) => {
          if (res.data && res.data.results) {
            setSearchResults(res.data.results);
          } else {
            setSearchResults([]);
          }
        })
        .catch(() => setError("Failed to fetch search results."))
        .finally(() => setLoading(false));
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <div className="search-page">
      <div className="container py-5">
        <h2 className="search-heading">
          {query ? (
            <>
              Search results for:{" "}
              <span className="highlight-text">{query}</span>
            </>
          ) : (
            "Search for movies"
          )}
        </h2>

        {loading && <p className="loading-text">Loading...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && searchResults.length === 0 && query && (
          <p className="no-results">No results found for "{query}"</p>
        )}

        <div className="movie-grid">
          {searchResults.map((movie) => (
            <MoviePageCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
