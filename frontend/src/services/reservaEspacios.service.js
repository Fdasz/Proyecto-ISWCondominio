import axios from './root.service.js';
import { formatReservaEspacioData } from '../helpers/formatData.js';

export async function getReservasEspacio() {
    try {
        const { data } = await axios.get('/reservasEspacio/');
        if (!data || !data.data || !Array.isArray(data.data)) {
            console.error("Estructura de datos inesperada:", data);
            return [];
        }

        const formattedData = data.data.map(formatReservaEspacioData);
        return formattedData;
    } catch (error) {
        console.error("Error al obtener reservas de espacio:", error);
        return [];
    }
}

export async function createReservaEspacio(data) {
  try {
    console.log("Datos enviados para crear reserva:", data); // Debug
    const response = await axios.post('/reservasEspacio/', data);
    if (!response.data || !response.data.data) {
      throw new Error('Estructura de datos inesperada');
    }
    return formatReservaEspacioData(response.data.data);
  } catch (error) {
    alert("Ya existe una reserva para el espacio en el horario seleccionado.");
    throw error;
  }
}

export async function deleteReservaEspacio(id_reserva) {
  try {
    const response = await axios.delete(`/reservasEspacio/${id_reserva}/`); // ← Barra agregada
    return response.data;
  } catch (error) {
    console.error("Error en deleteReservaEspacioService:", error);
    throw error;
  }
}

export async function updateReservaEspacio(id_reserva, data) {
  try {
    const response = await axios.put(`/reservasEspacio/${id_reserva}/`, data); // ← Barra agregada
    return formatReservaEspacioData(response.data.data);
  } catch (error) {
    alert("Ya existe una reserva para el espacio en el horario seleccionado.");
    throw error;
  }
}