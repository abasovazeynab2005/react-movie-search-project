import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SelectedList.css";

const SelectedList = ({ selectedMovies, onRemove, onSaveList }) => {
  const [listName, setListName] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const navigate = useNavigate();

  // Проверяем, можно ли сохранить (есть название и есть фильмы)
  const canSave = listName.trim() !== "" && selectedMovies.length > 0;

  const handleSave = () => {
    if (!canSave) {
      setSaveMessage("imput is empty!Please enter the name");
      setTimeout(() => setSaveMessage(""), 2000);
      return;
    }

    onSaveList(listName).then(() => {
      setListName("");
      setSaveMessage("list saved!");
      setTimeout(() => setSaveMessage(""), 2000);
    });
  };

  return (
    <div className="selected-card">
      {saveMessage && <div className="save-message">{saveMessage}</div>}

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
        placeholder="Название папки..."
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
