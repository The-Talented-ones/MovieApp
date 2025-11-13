import React from "react";
import "./MoviePageCard.css";
import { useNavigate } from "react-router-dom";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MoviePageCard = ({ movie }: any) => {
  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate(`/detail/${movie.id}`)
  }
  return (
    <div className="movie-card" onClick={handleClick}>
      <div className="poster-wrapper">
        <img
          src={
            movie.poster_path
              ? `${IMG_BASE_URL}${movie.poster_path}`
              : "/no-image.jpg"
          }
          alt={movie.title || movie.name}
          className="movie-poster"
        />
        {movie.vote_average && (
          <span className="rating">
            {movie.vote_average.toFixed(1)}
          </span>
        )}
      </div>

      <h5 className="movie-title">
        {movie.title || movie.name}
      </h5>

      <button className="watch-btn">Watch now</button>
    </div>
  );
};

export default MoviePageCard;
