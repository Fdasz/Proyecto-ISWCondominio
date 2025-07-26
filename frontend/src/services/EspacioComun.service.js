import axios from './root.service.js';
import { formatEspacioComunData } from '../helpers/formatData.js';

export async function getEspaciosComunes() {
    try {
        const { data } = await axios.get('/espaciosComunes/');
        if (!data || !data.data || !Array.isArray(data.data)) {
            console.error("Estructura de datos inesperada:", data);
            return [];
        }
        
        const formattedData = data.data.map(formatEspacioComunData);
        return formattedData;
    } catch (error) {
        console.error("Error al obtener espacios comunes:", error);
        return [];
    }
}

export async function createEspacioComun(data) {
    try {
        const response = await axios.post('/espaciosComunes/', data);
        return response.data;
    } catch (error) {
        console.error("Error al crear espacio común:", error);
        throw error;
    }
}

export async function updateEspacioComun(id, data) {
    try {
        const response = await axios.patch(`/espaciosComunes/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar espacio común:", error);
        throw error;
    }
}

export async function deleteEspacioComun(id) {
    try {
        const response = await axios.delete(`/espaciosComunes/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar espacio común:", error);
        throw error;
    }
}

