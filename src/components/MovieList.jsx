import React from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";

const MovieList = ({ movies, selectedMovies, onToggle }) => {
  if (movies.length === 0) {
    return <p className="no-results">No movies found. Try another search.</p>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => {
        const isAdded = selectedMovies.some(
          (selected) => selected.imdbID === movie.imdbID
        );

        return (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onToggle={onToggle}
            isAdded={isAdded}
          />
        );
      })}
    </div>
  );
};

export default MovieList;
