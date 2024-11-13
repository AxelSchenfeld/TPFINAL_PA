import { headers, apiKey } from '../components/headers.jsx';  // Asegúrate de que la ruta sea correcta

const getData = async (url, query = "") => {
    const options = {
        method: 'GET',
        headers: headers,
    };

    // Construir la URL completa, incluyendo la API Key y el término de búsqueda si existe
    const apiUrl = query
        ? `${url}&api_key=${apiKey}&query=${encodeURIComponent(query)}`
        : `${url}&api_key=${apiKey}`;

    try {
        console.log("Fetching URL: ", apiUrl);  // Esto te ayudará a depurar
        const response = await fetch(apiUrl, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Fetch error: ", error);
        return { results: [], total_pages: 1 };  // Retornar un objeto vacío en caso de error
    }
};

export default getData;  // Exportar como default

