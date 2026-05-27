import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MyListsPage from "./pages/MyListsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>Movie</h1>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-lists" element={<MyListsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
