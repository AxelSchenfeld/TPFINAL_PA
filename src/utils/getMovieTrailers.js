import getData from './getData';  // Importamos la función getData

// Función para obtener los trailers de una película
const getMovieTrailers = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=es-ES`;
    const data = await getData(url);  // Usamos getData para hacer la solicitud
    return data.results;  // Devuelve la lista de trailers
};

export default getMovieTrailers;  // Exportación por defecto
