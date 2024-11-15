import getData from './getData';  
// Función para obtener los trailers de una película
const getMovieTrailers = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=es-ES`;
    const data = await getData(url);  
    return data.results;  
};

export default getMovieTrailers;  