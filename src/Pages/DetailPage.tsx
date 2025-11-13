import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GlobalAPI from "../services/GlobalAPI";
import "./DetailPage.css";

const DetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    GlobalAPI.getMovieDetails(id)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log("API Error:", err));
  }, [id]);

  const handleDownload = () => {
    // Mock download functionality - in real app, this would trigger actual download
    alert(`Downloading ${movie?.title}`);
  };

  if (!movie) return <div className="detail-loading">Loading...</div>;

  return (
    <div className="detail-page">
      {/* Background Banner */}
      <div 
        className="detail-backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`
        }}
      ></div>
      
      <div className="detail-container">
        {/* Main Content */}
        <div className="detail-content">
          {/* Poster Section */}
          <div className="poster-section">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title}
              className="poster-image"
            />
          </div>

          {/* Info Section */}
          <div className="info-section">
            <div className="movie-header">
              <h1 className="movie-title">{movie.title}</h1>
              <div className="movie-meta">
                <span className="release-year">
                  {new Date(movie.release_date).getFullYear()}
                </span>
                <span className="runtime">{movie.runtime} min</span>
                <span className="rating">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="action-buttons">
              <button className="download-btn" onClick={handleDownload}>
                <span>Download</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                </svg>
              </button>
            </div>

            <div className="overview-section">
              <h3>Overview</h3>
              <p className="overview-text">{movie.overview}</p>
            </div>

            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Release Date</span>
                <span className="detail-value">{movie.release_date}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Original Language</span>
                <span className="detail-value">{movie.original_language.toUpperCase()}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Popularity</span>
                <span className="detail-value">{Math.round(movie.popularity)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Vote Count</span>
                <span className="detail-value">{movie.vote_count}</span>
              </div>
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="genres-section">
                <h4>Genres</h4>
                <div className="genres-list">
                  {movie.genres.map((genre: any) => (
                    <span key={genre.id} className="genre-tag">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;