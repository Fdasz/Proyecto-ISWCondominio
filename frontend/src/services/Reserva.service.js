import axios from './root.service.js';
import { formatReservaData } from '../helpers/formatData.js';

export async function getReservas() {
    try {
        const { data } = await axios.get('/reservasEspacio/');
        
        // Verificar que la respuesta tenga la estructura esperada
        if (!data || !data.data || !Array.isArray(data.data)) {
            console.error("Estructura de datos inesperada:", data);
            return []; // Devolver array vacío en lugar de objeto
        }
        
        const formattedData = data.data.map(formatReservaData);
        return formattedData;
    } catch (error) {
        console.error("Error al obtener reservas:", error);
        // En caso de error, devolver array vacío para que el hook no falle
        return [];
    }
}

export async function createReserva(data) {
    try {
        const response = await axios.post('/reservasEspacio/', data);
        return response.data;
    } catch (error) {
        console.error("Error al crear reserva:", error);
        throw error;
    }
}

export async function updateReserva(id, data) {
    try {
        const response = await axios.put(`/reservasEspacio/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar reserva:", error);
        throw error;
    }
}

export async function deleteReserva(id) {
    try {
        const response = await axios.delete(`/reservasEspacio/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar reserva:", error);
        throw error;
    }
}

export async function getReservaById(id) {
    try {
        const { data } = await axios.get(`/reservasEspacio/${id}`);
        
        if (!data || !data.data) {
            console.error("Estructura de datos inesperada:", data);
            return null;
        }
        
        return formatReservaData(data.data);
    } catch (error) {
        console.error("Error al obtener reserva por ID:", error);
        throw error;
    }
}