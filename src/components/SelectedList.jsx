import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SelectedList.css";

const SelectedList = ({ selectedMovies, onRemove, onSaveList }) => {
  const [listName, setListName] = useState("");
  const navigate = useNavigate();

  const canSave = listName.trim() && selectedMovies.length;
  const canLook = selectedMovies.length > 0;

  const handleSave = () => {
    if (!canSave) return; // Просто ничего не делаем, без сообщения

    onSaveList(listName).then(() => {
      setListName(""); // Просто очищаем поле, без сообщения
    });
  };

  return (
    <div className="selected-card">
      {/* УДАЛЁН saveMessage блок */}

      <div className="added-movies-list">
        {selectedMovies.length ? (
          selectedMovies.map(({ imdbID, Title }) => (
            <div key={imdbID} className="added-movie-item">
              <span>{Title}</span>
              <button onClick={() => onRemove(imdbID)}>✕</button>
            </div>
          ))
        ) : (
          <div className="empty-favorite" />
        )}
      </div>

      <input
        className="folder-input"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder="Folder name..."
      />

      <button
        className={`btn-add-list ${canSave ? "active" : ""}`}
        onClick={handleSave}
        disabled={!canSave}
      >
        Add To Favorite List
      </button>

      <button
        className={`btn-look-list ${canLook ? "active" : ""}`}
        onClick={() => navigate("/my-lists")}
        disabled={!canLook}
      >
        Look At Favorite List
      </button>
    </div>
  );
};

export default SelectedList;