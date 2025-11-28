import { Movie } from "../../type";

interface MovieCardsProps {
  movie: Movie;
}

const MovieCards: React.FC<MovieCardsProps> = ({ movie }) => {
  return (
    <div className="movie-card-container">
      <a
        href={`https://www.themoviedb.org/movie/${movie.id}/videos`}
        target="_blank"
        rel="noopener noreferrer"
        className="card mx-2 rounded-3 overflow-hidden p-2 shadow-sm movie-card"
      >
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.original_title || movie.title || "Movie"}
          className="img-fluid movie-poster rounded"
        />
        <div className="movie-details p-4">
          <h4>{movie.original_title || movie.title}</h4>
          <p>{movie.release_date}</p>
          <p>{movie.vote_average}</p>
        </div>
      </a>
    </div>
  );
};

export default MovieCards;
