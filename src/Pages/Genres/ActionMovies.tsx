import React, { useEffect, useState } from "react";
import GlobalAPI from "../../services/GlobalAPI";
import GenreMovieCard from "../../components/GenreMovieCard/GenreMovieCard";

const ActionPage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [series, setSeries] = useState<any[]>([]);
  const [trending, setTrending] = useState<any[]>([]);
  const [newRelease, setNewRelease] = useState<any[]>([]);

  useEffect(() => {
    fetchActionData();
  }, []);

  const fetchActionData = async () => {
    try {
      // Replace 28 with the genre ID for Action in your API
      const moviesResp = await GlobalAPI.getMoviesByGenreId(28);
      setMovies(moviesResp.data.results);

      const seriesResp = await GlobalAPI.getSeriesByGenreId(28);
      setSeries(seriesResp.data.results);

      const trendingResp = await GlobalAPI.getTrendingByGenre(28);
      setTrending(trendingResp.data.results);

      const newReleaseResp = await GlobalAPI.getNewReleaseByGenre(28);
      setNewRelease(newReleaseResp.data.results);
    } catch (error) {
      console.error("Failed to fetch Action genre data:", error);
    }
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Action</h1>

      {/* Action Movies */}
      <section className="mb-5">
        <h2>Action Movies</h2>
        <div className="d-flex gap-3 flex-wrap">
          {movies.map((movie) => (
            <GenreMovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Action Series */}
      <section className="mb-5">
        <h2>Action Series</h2>
        <div className="d-flex gap-3 flex-wrap">
          {series.map((serie) => (
            <GenreMovieCard key={serie.id} movie={serie} />
          ))}
        </div>
      </section>

      {/* Trending Action */}
      <section className="mb-5">
        <h2>Trending Action</h2>
        <div className="d-flex gap-3 flex-wrap">
          {trending.map((item) => (
            <GenreMovieCard key={item.id} movie={item} />
          ))}
        </div>
      </section>

      {/* New Release Action */}
      <section className="mb-5">
        <h2>New Release Action</h2>
        <div className="d-flex gap-3 flex-wrap">
          {newRelease.map((item) => (
            <GenreMovieCard key={item.id} movie={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ActionPage;
