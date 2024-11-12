// headers.jsx
const apiKey = import.meta.env.VITE_API_KEY; // Asegúrate de que la variable de entorno esté definida

const headers = {
    accept: 'application/json',
    // No necesitas Authorization aquí para TMDB
};

export { apiKey, headers };