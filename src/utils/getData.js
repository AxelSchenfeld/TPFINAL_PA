// src/utils/getData.js
import { headers, apiKey } from '../components/headers.jsx'; // Asegúrate de que la ruta sea correcta

const getData = async (url) => {
    const options = {
        method: 'GET',
        headers: headers
    };

    try {
        // Asegúrate de que la API Key se incluya correctamente en la URL
        const apiUrl = `${url}&api_key=${apiKey}`;
        console.log("Fetching URL: ", apiUrl); // Esto te ayudará a depurar
        const response = await fetch(apiUrl, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Fetch error: ", error);
    }
};

export default getData;