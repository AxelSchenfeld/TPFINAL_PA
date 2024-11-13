import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getData from '../utils/getData';
import getMovieTrailers from '../utils/getMovieTrailers';
import './MovieDetails.css';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);  // Usamos 'trailer' en lugar de 'trailers'

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const data = await getData(`https://api.themoviedb.org/3/movie/${id}?language=es-ES`);
            setMovie(data);
        };
        fetchMovieDetails();

        // Obtener trailers
        const fetchTrailers = async () => {
            const trailerData = await getMovieTrailers(id);
            if (trailerData.length > 0) {
                setTrailer(trailerData[0]);  // Tomamos solo el primer trailer
            }
        };
        fetchTrailers();
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="movie-details">
            <h1 className="movie-title">{movie.title}</h1>
            <div className="movie-poster-container">
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-poster"
                />
            </div>
            <div className="movie-info">
                <p className="movie-overview"><strong>Sinopsis:</strong> {movie.overview}</p>
                <div className="info-section">
                    <div>
                        <h3>Fecha de estreno</h3>
                        <p className="release-date">{movie.release_date}</p>
                    </div>
                    <div>
                        <h3>Valoración</h3>
                        <p className="vote-average">{movie.vote_average} / 10</p>
                    </div>
                </div>

                {/* Sección para los trailers */}
                <div className="trailers-section">
                    {trailer ? (
                        <div className="trailer-container">
                            <h3 className="trailer-title">{trailer.name}</h3>
                            <iframe
                                className="trailer-video"
                                src={`https://www.youtube.com/embed/${trailer.key}`}
                                title={trailer.name}
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        <p className="no-trailers">No se encontraron trailers para esta película.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
