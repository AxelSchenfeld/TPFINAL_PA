// src/App.js
import React from 'react';
import MovieGrid from "./components/MovieGrid.jsx";

const App = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center my-4">Películas Populares</h1>
      <MovieGrid />
    </div>
  );
};

export default App;
