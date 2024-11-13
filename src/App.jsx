import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieGrid from './components/MovieGrid.jsx';
import MovieDetails from './components/MovieDetails.jsx';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta principal que muestra el grid de películas */}
        <Route path="/" element={<MovieGrid />} />
        
        {/* Ruta para los detalles de cada película */}
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

