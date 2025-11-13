import React from "react";
import "./MovieCards.css";
import Star from "../../../assets/glowing-star.png";

const MovieCards = ({ movie }) => {
  return (
    <div className="movie-card-container ">
      <a  href={ `https://www.themoviedb.org/movie/${movie.id}/videos`} target="blank" className="card mx-2 rounded-3 overflow-hidden p-2 shadow-sm movie-card">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          className="img-fluid movie-poster rounded"
          alt={movie.title}
        />
        <div className="movie-details p-4">
          <h4 className=" movie-details-heading ">
            {movie.original_title}
          </h4>
          <div className="movie-date-rate d-flex justify-content-between align-items-center">
            <p className="mb-0">{movie.release_date}</p>
            <p className="mb-0 d-flex align-items-center">
              {movie.vote_average}
              <img src={Star} alt="rating-icon" className="card-emoji ms-1" />
            </p>
          </div>
          <p className="movie-description mt-2">
            {movie.overview
              ? movie.overview.slice(0, 100) + "..."
              : "No description available."}
          </p>
        </div>
      </a>
    </div>
  );
};

export default MovieCards;
