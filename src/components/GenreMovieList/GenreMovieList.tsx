import React from "react";
import { Link } from "react-router-dom";
import GenresList from "../../Constant/GenresList";
import "./GenreMovieList.css";

const GenreMovieList = () => {
  // Map each genre name to its custom page route
  const genrePageMap: Record<string, string> = {
    Action: "/genre/actionpage",
    Adventure: "/genre/adventurepage",
    Comedy: "/genre/comedypage",
    Crime: "/genre/crimepage",
    Animation: "/genre/animationpage",
  };

  return (
    <div>
      <h2 className="mb-4 text-center">Browse by Genre</h2>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {GenresList.genres.slice(0, 5).map((item) => (
          <Link
            key={item.id}
            to={genrePageMap[item.name] || "#"} // Link to custom page
            className="text-decoration-none"
          >
            <div className="genre-card p-5 border border-3 border-warning text-center rounded-4">
              <div className="section-title ">{item.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenreMovieList;
