import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLists, deleteListById } from "../services/api";
import "./MyListsPage.css";

const MyListsPage = () => {
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllLists().then((data) => {
      setLists(data);
    });
  }, []);

  const handleDelete = (id) => {
    deleteListById(id).then(() => {
      const updated = lists.filter((l) => l.id !== id);
      setLists(updated);
    });
  };

  return (
    <div className="my-lists-page">
      <h2>Saved Folders</h2>

      <div className="folders-container">
        {lists.map((list) => (
          <div key={list.id} className="folder-item">
            <span
              className="folder-link"
              onClick={() => navigate(`/list/${list.id}`)}
            >
              📁 {list.title} ({list.movies.length} movies)
            </span>
            <button
              className="del-folder-btn"
              onClick={() => handleDelete(list.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {lists.length === 0 && <p className="no-folders">no save folders </p>}

      <button onClick={() => navigate("/")} className="movies-back-btn">
        Movies
      </button>
    </div>
  );
};

export default MyListsPage;
