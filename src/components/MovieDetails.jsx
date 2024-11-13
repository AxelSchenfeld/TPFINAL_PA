import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getData from '../utils/getData';
import './MovieDetails.css';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const data = await getData(`https://api.themoviedb.org/3/movie/${id}?language=es-ES`);
            setMovie(data);
        };
        fetchMovieDetails();
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="movie-details">
            <h1 className="movie-title">{movie.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
            />
            <p className="movie-overview">{movie.overview}</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
            <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + " trailer")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="trailer-link"
            >
                Watch Trailer
            </a>
        </div>
    );
};

export default MovieDetails;
