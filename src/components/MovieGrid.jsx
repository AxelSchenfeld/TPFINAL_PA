import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getData from '../utils/getData';
import './MovieGrid.css'; 

// Componente que muestra la cuadrícula de películas
const MovieGrid = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    // Hook para obtener las películas cada vez que cambian 'query' o 'currentPage'
    useEffect(() => {
        const fetchMovies = async () => {

            // Determinamos la URL según si hay un término de búsqueda o no
            const url = query 
                ? `https://api.themoviedb.org/3/search/movie?query=${query}` 
                : `https://api.themoviedb.org/3/movie/popular?`;

            // Llamamos a la API utilizando la función 'getData'
                const data = await getData(`${url}&page=${currentPage}`);
            
            if (data) {
                setMovies(data.results);
                setTotalPages(5);
            }
        };
        fetchMovies();
    }, [query, currentPage]);

    // Manejo de búsqueda
    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1); 
        setQuery(e.target.search.value);
    };
    
    // Manejo del clic en una película
    const handleMovieClick = (id) => {
        navigate(`/movie/${id}`);
    };

    return (
        <div>
            <h1 className="page-title">PELÍCULAS POPULARES</h1>
            
            {/* Formulario para la búsqueda */}
            <form onSubmit={handleSearch} className="search-container">
                <input
                    type="text"
                    name="search"
                    placeholder="Buscar película..."
                    className="search-input"
                />
                <button type="submit" className="search-button">Buscar</button>
            </form>
            
            {/* Grid para mostrar las películas */}
            <div className="movie-grid">
                {movies.map(movie => (
                    <div
                        key={movie.id}
                        className="movie-item"
                        onClick={() => handleMovieClick(movie.id)}
                    >
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            className="movie-poster"
                        />
                        <h3 className="movie-title">{movie.title}</h3>
                    </div>
                ))}
            </div>
            
            {/* Paginación */}
            <div className="pagination">
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span>Página {currentPage} de {totalPages}</span>
                <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default MovieGrid;
