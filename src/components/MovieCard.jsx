import React from "react";
import "./MovieCard.css";

const MovieCard = ({ movie, onToggle, isAdded }) => {
  const posterUrl =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/180x240?text=No+Poster";

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={movie.Title} className="movie-poster" />
      <div className="movie-info">
        <h2 className="movie-title">{movie.Title}</h2>
        <p className="movie-year">Year: {movie.Year}</p>

        <button
          className={isAdded ? "fav-button added" : "fav-button"}
          onClick={() => onToggle(movie)}
        >
          ♥ Favorite
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
