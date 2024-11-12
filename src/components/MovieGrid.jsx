import React, { useState, useEffect } from 'react';
import getData from '../utils/getData';
import './MovieGrid.css';

const MovieGrid = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState('');
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchMovies = async () => {
            const url = query 
                ? `https://api.themoviedb.org/3/search/movie?query=${query}`
                : `https://api.themoviedb.org/3/movie/popular?`;
            const data = await getData(`${url}&page=${currentPage}`);
            
            if (data) {
                setMovies(data.results);
                setTotalPages(data.total_pages);
            }
        };
        fetchMovies();
    }, [query, currentPage]);

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        setQuery(e.target.search.value);
    };

    return (
        <div>
            <h1 className="page-title">PELÍCULAS POPULARES</h1>
            <form onSubmit={handleSearch} className="search-container">
                <input
                    type="text"
                    name="search"
                    placeholder="Buscar película..."
                    className="search-input"
                />
                <button type="submit" className="search-button">Buscar</button>
            </form>
            <div className="movie-grid">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-item">
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            alt={movie.title} 
                            className="movie-poster"
                        />
                        <h3 className="movie-title">{movie.title}</h3>
                    </div>
                ))}
            </div>
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

