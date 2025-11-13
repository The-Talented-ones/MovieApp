import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GlobalAPI from "../services/GlobalAPI";
import MoviePageCard from "../components/MoviePageCard/MoviePageCard";

const GenrePage = () => {
  const { id } = useParams(); // genre ID from URL
  const [movies, setMovies] = useState<any[]>([]);
  const [series, setSeries] = useState<any[]>([]);
  const [trending, setTrending] = useState<any[]>([]);
  const [newReleases, setNewReleases] = useState<any[]>([]);

  useEffect(() => {
    if (id) fetchGenreData(Number(id));
  }, [id]);

  const fetchGenreData = async (genreId: number) => {
    try {
      const moviesResp = await GlobalAPI.getMoviesByGenreId(genreId);
      setMovies(moviesResp.data.results);

      const seriesResp = await GlobalAPI.getSeriesByGenreId(genreId);
      setSeries(seriesResp.data.results);

      const trendingResp = await GlobalAPI.getTrendingByGenre(genreId);
      setTrending(trendingResp.data.results);

      const newReleaseResp = await GlobalAPI.getNewReleaseByGenre(genreId);
      setNewReleases(newReleaseResp.data.results);
    } catch (error) {
      console.error("Failed to fetch genre data:", error);
    }
  };

  return (
    <div className="container mt-4">
      {/* Movies */}
      <section className="mb-5">
        <h2>Movies</h2>
        <div className="d-flex flex-wrap gap-3">
          {movies.map((movie) => (
            <MoviePageCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Series */}
      <section className="mb-5">
        <h2>Series</h2>
        <div className="d-flex flex-wrap gap-3">
          {series.map((serie) => (
            <MoviePageCard key={serie.id} movie={serie} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="mb-5">
        <h2>Trending</h2>
        <div className="d-flex flex-wrap gap-3">
          {trending.map((item) => (
            <MoviePageCard key={item.id} movie={item} />
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="mb-5">
        <h2>New Releases</h2>
        <div className="d-flex flex-wrap gap-3">
          {newReleases.map((item) => (
            <MoviePageCard key={item.id} movie={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default GenrePage;
