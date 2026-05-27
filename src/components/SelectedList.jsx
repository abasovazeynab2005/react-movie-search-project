import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SelectedList.css";

const SelectedList = ({ selectedMovies, onRemove, onSaveList }) => {
  const [listName, setListName] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const navigate = useNavigate();

  const canSave = listName.trim() && selectedMovies.length;

  const showMessage = (text) => {
    setSaveMessage(text);
    setTimeout(() => setSaveMessage(""), 2000);
  };

  const handleSave = () => {
    if (!canSave)
      return showMessage(
        " Please enter the name or select the favorite film! "
      );

    onSaveList(listName).then(() => {
      setListName("");
      showMessage("List saved!");
    });
  };

  return (
    <div className="selected-card">
      {saveMessage && <div className="save-message">{saveMessage}</div>}

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
      />

      <button
        className={`btn-add-list ${canSave ? "active" : ""}`}
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
