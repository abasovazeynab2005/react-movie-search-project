import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListById, getMovieById } from "../services/api";
import "./ListPage.css";

const ListPage = () => {
  const { id } = useParams();
  const [list, setList] = useState(null);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getListById(id).then((listData) => {
      if (listData) {
        setList(listData);

        const moviePromises = listData.movies.map((movieId) =>
          getMovieById(movieId)
        );

        Promise.all(moviePromises).then((moviesData) => {
          setMovies(moviesData.filter((movie) => movie !== null));
        });
      }
    });
  }, [id]);

  if (!list) {
    return <div className="error-msg">loading...</div>;
  }

  return (
    <div className="list-page">
      <div className="main-box">
        <h1 className="list-main-title">{list.title}</h1>

        <div className="movies-rows">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-row-item">
              <span className="movie-row-title">
                {movie.Title} ({movie.Year})
              </span>
              <a
                href={`https://www.imdb.com/title/${movie.imdbID}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="yellow-imdb-btn"
              >
                IMDB
              </a>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => navigate("/")} className="purple-movies-btn">
        Movies
      </button>
    </div>
  );
};

export default ListPage;
