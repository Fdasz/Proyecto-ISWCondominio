import axios from './root.service.js';
import { formatReservaEspacioData } from '../helpers/formatData.js';

export const getReservasEspacioService = async () => {
  try {
    const response = await axios.get('/reservasEspacio');
    if (!response.data || !Array.isArray(response.data)) {
      console.error("Estructura de datos inesperada:", response.data);
      return [null, 'Error en la estructura de datos'];
    }
    return [response.data.map(formatReservaEspacioData), null];
  } catch (error) {
    console.error("Error en getReservasEspacioService:", error);
    return [null, error.message || 'Error al obtener reservas'];
  }
};

export const createReservaEspacioService = async (data) => {
  try {
    const response = await axios.post('/reservasEspacio', data);
    if (!response.data) {
      console.error("Estructura de datos inesperada:", response.data);
      return [null, 'Error en la estructura de datos'];
    }
    return [response.data.map(formatReservaEspacioData), null];
  } catch (error) {
    console.error("Error en createReservaEspacioService:", error);
    return [null, error.message || 'Error al crear reserva'];
  }
};

export const deleteReservaEspacioService = async (id_reserva) => {
  try {
    const response = await axios.delete(`/reservasEspacio${id_reserva}`);
    return [response.data, null];
  } catch (error) {
    console.error("Error en deleteReservaEspacioService:", error);
    return [null, error.message || 'Error al eliminar reserva'];
  }
}
export const updateReservaEspacioService = async (id_reserva, data) => {
  try {
    const response = await axios.patch(`/reservasEspacio${id_reserva}`, data);
    return [response.data, null];
  } catch (error) {
    console.error("Error en updateReservaEspacioService:", error);
    return [null, error.message || 'Error al actualizar reserva'];
  }
}