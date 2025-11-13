import React from "react";

const FilterGroup = ({ minRating, onRatingClick, ratings }) => {
  return (
    <div>
      <ul className="movie-filter gap-4 mt-3 d-flex align-items-center list-unstyled">
        {ratings.map((rate) => (
          <li
            className={`movie-filter-item p-2 ${
              minRating === rate ? "active" : ""
            }`}
            key={rate}
            onClick={() => onRatingClick(rate)}
          >
           {rate}+ star
          </li>
        ))}
        <li
          className="movie-filter-item p-2"
          onClick={() => {
            onRatingClick(0);
          }}
        >
          All
        </li>
      </ul>
    </div>
  );
};

export default FilterGroup;
