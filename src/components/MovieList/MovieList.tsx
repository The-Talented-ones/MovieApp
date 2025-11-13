import React, { useEffect, useState } from "react";
import _ from 'lodash';


import Fire from "../../assets/fire.png";
import MovieCards from "./movie-card/MovieCards";
import "./MovieList.css";
import FilterGroup from "./FilterGroup";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });

  // Fetch movies from TMDB
  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(()=>{
    if (sort.by !== "default") {
    const sortedMovies =  _.orderBy(movies, [sort.by],[sort.order ])
    setMovies(sortedMovies);
    }
    
  }, [sort])


  const fetchMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=6d7c6b2863346e87e77d5294490e79d3"
    );
    const data = await response.json();
    setMovies(data.results);
    setAllMovies(data.results);
  };

  const handleFilter = (rate) => {
    setMinRating(rate);
    const filtered = allMovies.filter((movie) => movie.vote_average >= rate);
    setMovies(filtered);
  };

  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => {
      return { ...prev, [name]: value };
    });
    console.log(sort);
  };

  return (
    <div>
      <section className="movie-list">
        <header
          className="movie-list-header px-5 py-2 d-flex align-items-center justify-content-between
 mb-5"
        >
          <h2 className="movie-list-heading d-flex align-items-center">
            Popular
            <img src={Fire} alt="fire emoji" className="navbar-emoji" />
          </h2>

          <div className="movie-list-fs ms-auto d-flex align-items-center">
            <FilterGroup
              minRating={minRating}
              onRatingClick={handleFilter}
              ratings={[8, 7, 6]}
            />

            <select
              name="by"
              id=""
              onChange={handleSort}
              value={sort.by}
              className="movie-sorting outline-0 border-0 rounded-3 p-2 mx-2 me-2"
            >
              <option value="default">Sort By</option>
              <option value="release_date">Date</option>
              <option value="vote_average">Rating</option>
            </select>

            <select
              name="order"
              id=""
              onChange={handleSort}
              value={sort.order}
              className="movie-sorting outline-0 border-0 rounded-3 p-2 mx-2"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </header>

        <div className="movie-cards d-flex flex-row flex-wrap overflow-auto py-3">
          {movies.map((movie) => (
            <MovieCards key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MovieList;
