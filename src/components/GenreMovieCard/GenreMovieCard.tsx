type MovieCardProps = {
  movie: {
    id: number;
    title?: string;
    name?: string;
    poster_path?: string;
  };
};

const GenreMovieCard = ({ movie }: MovieCardProps) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  return (
    <div className="card" style={{ width: "12rem" }}>
      <img
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        className="card-img-top"
        alt={movie.title || movie.name}
      />
      <div className="card-body p-2">
        <p className="card-text text-center">{movie.title || movie.name}</p>
      </div>
    </div>
  );
};

export default GenreMovieCard;
