import React, { useState } from "react";
import "./MovieCard.css";

const MovieCard = ({ movie, onClick, isAdded }) => {
  const [imgError, setImgError] = useState(false);

  const posterUrl =
    imgError || movie.Poster === "N/A"
      ? "https://via.placeholder.com/180x240?text=No+Poster"
      : movie.Poster;

  return (
    <div className="movie-card">
      <img
        src={posterUrl}
        alt={movie.Title}
        className="movie-poster"
        onError={() => setImgError(true)}
      />
      <div className="movie-info">
        <h2 className="movie-title">{movie.Title}</h2>
        <p className="movie-year">Year: {movie.Year}</p>

        <button
          className={isAdded ? "fav-button added" : "fav-button"}
          onClick={() => onClick(movie)}
        >
          ♥ Favorite
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
