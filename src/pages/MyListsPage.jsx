import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLists, deleteListById, getMovieById } from "../services/api";
import "./MyListsPage.css";

const MyListsPage = () => {
  const [lists, setLists] = useState([]);
  const [moviesByList, setMoviesByList] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllLists().then((allLists) => {
      setLists(allLists);

      // Get movies for each folder
      const promises = allLists.map((list) => {
        const moviePromises = list.movies.map((movieId) =>
          getMovieById(movieId)
        );
        return Promise.all(moviePromises).then((movies) => {
          return { listId: list.id, movies: movies.filter((m) => m !== null) };
        });
      });

      Promise.all(promises).then((results) => {
        const moviesMap = {};
        results.forEach((result) => {
          moviesMap[result.listId] = result.movies;
        });
        setMoviesByList(moviesMap);
        setLoading(false);
      });
    });
  }, []);

  const handleDelete = (id) => {
    deleteListById(id).then(() => {
      const updatedLists = lists.filter((l) => l.id !== id);
      setLists(updatedLists);

      const updatedMovies = { ...moviesByList };
      delete updatedMovies[id];
      setMoviesByList(updatedMovies);
    });
  };

  const goToMovies = () => {
    navigate("/");
  };

  if (loading) {
    return <div className="loading-message">Loading folders...</div>;
  }

  return (
    <div className="my-lists-page">
      {lists.length === 0 && (
        <div className="empty-lists">
          <p>No saved folders yet</p>
          <p>Add movies on the main page and save them</p>
        </div>
      )}

      <div className="all-lists-container">
        {lists.map((list) => (
          <div key={list.id} className="list-card-full">
            <div className="list-card-header">
              <h3 className="list-card-title">
                <u> {list.title}</u>
              </h3>
              <button
                className="delete-list-btn"
                onClick={() => handleDelete(list.id)}
              >
                Delete
              </button>
            </div>

            <div className="folder-movies-list">
              {moviesByList[list.id] && moviesByList[list.id].length > 0 ? (
                moviesByList[list.id].map((movie) => (
                  <div key={movie.imdbID} className="folder-movie-item">
                    <img
                      src={
                        movie.Poster !== "N/A"
                          ? movie.Poster
                          : "https://via.placeholder.com/50x75?text=No+Poster"
                      }
                      alt={movie.Title}
                      className="folder-movie-poster"
                    />
                    <div className="folder-movie-info">
                      <span className="folder-movie-title">{movie.Title}</span>
                      <span className="folder-movie-year">({movie.Year})</span>
                      <a
                        href={`https://www.imdb.com/title/${movie.imdbID}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="small-imdb-link"
                      >
                        IMDb
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-movies-in-folder">No movies in this folder</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bottom-buttons">
        <button onClick={goToMovies} className="movies-bottom-btn">
          Movies
        </button>
      </div>
    </div>
  );
};

export default MyListsPage;
