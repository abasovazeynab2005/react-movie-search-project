import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import SelectedList from "../components/SelectedList";
import { searchMovies, saveMovieList, getRandomMovies } from "../services/api";
import "./HomePage.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);

  useEffect(() => {
    getRandomMovies().then((data) => {
      setMovies(data);
    });
  }, []);

  const handleSearch = (query) => {
    searchMovies(query).then((result) => {
      if (result.Search) {
        setMovies(result.Search);
      } else {
        setMovies([]);
      }
    });
  };

  // THIS FUNCTION ADDS/REMOVES MOVIES
  const handleClickMovie = (movie) => {
    console.log("Movie clicked:", movie.Title); // Check if this appears in console
    
    const isAlreadySelected = selectedMovies.some((m) => m.imdbID === movie.imdbID);
    
    if (isAlreadySelected) {
      const filtered = selectedMovies.filter((m) => m.imdbID !== movie.imdbID);
      setSelectedMovies(filtered);
    } else {
      setSelectedMovies([...selectedMovies, movie]);
    }
  };

  const handleSaveList = (listName) => {
    const movieIds = selectedMovies.map((m) => m.imdbID);
    return saveMovieList(listName, movieIds).then(() => {
      setSelectedMovies([]);
    });
  };

  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch} />
      <div className="content">
        <div className="movies-section">
          <MovieList
            movies={movies}
            selectedMovies={selectedMovies}
            onClick={handleClickMovie}  // ← MAKE SURE THIS IS onClick
          />
        </div>
        <div className="selected-section">
          <SelectedList
            selectedMovies={selectedMovies}
            onRemove={(id) => setSelectedMovies(selectedMovies.filter(m => m.imdbID !== id))}
            onSaveList={handleSaveList}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;