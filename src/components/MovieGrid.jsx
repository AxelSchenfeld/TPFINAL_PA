import React, { useEffect, useState } from 'react';
import getData from '../utils/getData.js';

const MovieGrid = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const BASE_URL = 'https://api.themoviedb.org/3/movie/popular';

    const fetchMovies = async (page) => {
        const data = await getData(`${BASE_URL}?&page=1`);
        if (data) {
            setMovies(data.results);
            setTotalPages(data.total_pages); // Establecer el total de páginas
        } else {
            setError("Error al cargar las películas.");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage]); // Llama a fetchMovies cada vez que currentPage cambia

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {movies.map(movie => (
                    <div key={movie.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                        <img 
                            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'ruta/a/placeholder.jpg'} 
                            alt={movie.title} 
                            className="w-full h-auto"
                        />
                        <h3 className="p-2 text-center font-semibold">{movie.title}</h3>
                    </div>
                ))}
            </div>

            {/* Controles de Paginación */}
            <div className="flex justify-between items-center p-4">
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Anterior
                </button>
                <span>Página {currentPage} de {totalPages}</span>
                <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default MovieGrid;