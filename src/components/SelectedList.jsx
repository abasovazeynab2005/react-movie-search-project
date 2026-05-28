import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SelectedList.css";

const SelectedList = ({ selectedMovies, onRemove, onSaveList }) => {
  const [listName, setListName] = useState("");
  const navigate = useNavigate();

  // Проверяем, можно ли сохранить (есть название и есть фильмы)
  const canSave = listName.trim() !== "" && selectedMovies.length > 0;

  const handleSave = () => {
    if (!canSave) {
      return; // 👈 Просто выходим, без сообщения
    }

    onSaveList(listName).then(() => {
      setListName("");
    });
  };

  return (
    <div className="selected-card">
      {/* Сообщения полностью убраны */}

      <div className="added-movies-list">
        {selectedMovies.map((movie) => (
          <div key={movie.imdbID} className="added-movie-item">
            <span>{movie.Title}</span>
            <button
              className="remove-x-btn"
              onClick={() => onRemove(movie.imdbID)}
            >
              ✕
            </button>
          </div>
        ))}
        {selectedMovies.length === 0 && <div className="empty-favorite"> </div>}
      </div>

      <input
        type="text"
        className="folder-input"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />

      <button
        className={canSave ? "btn-add-list active" : "btn-add-list"}
        onClick={handleSave}
      >
        Add To Favorite List
      </button>

      <button className="btn-look-list" onClick={() => navigate("/my-lists")}>
        Look At Favorite List
      </button>
    </div>
  );
};

export default SelectedList;