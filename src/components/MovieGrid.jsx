// MovieGrid.js
// MovieGrid.js
import React, { useState, useEffect } from 'react';
import getData from '../utils/getData';
import './MovieGrid.css';

const MovieGrid = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const moviesPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData(`https://api.themoviedb.org/3/movie/popular?page=${currentPage}`);
            
            if (data && Array.isArray(data.results)) {
                setMovies(data.results.slice(0, moviesPerPage));
                setTotalPages(Math.ceil(data.total_results / moviesPerPage));
            } else {
                console.error("Error: Datos de la API no tienen el formato esperado.", data);
                setMovies([]);
            }
        };
        fetchData();
    }, [currentPage]);

    return (
        <div className="movie-grid-container">
            <div className="movie-grid">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-item">
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            alt={movie.title} 
                            className="movie-image"
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
