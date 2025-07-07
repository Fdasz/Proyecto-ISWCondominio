// useGetReserva.js
import { useState, useEffect } from 'react';
import { getReservas } from '../../services/Reserva.service.js';
import { showErrorAlert } from '@helpers/sweetAlert.js';

const useGetReserva = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReservas = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getReservas();
      
      if (response.status === 'Success') {
        setReservas(response.data || []);
      } else {
        setError(response.message || 'Error al obtener las reservas');
        showErrorAlert('Error', response.message || 'Error al cargar las reservas');
      }
    } catch (error) {
      console.error('Error al obtener reservas:', error);
      const errorMessage = 'Error al cargar las reservas. Intente nuevamente';
      setError(errorMessage);
      
      // Manejar diferentes tipos de errores
      if (error.response?.status === 404) {
        showErrorAlert('Error', 'No se encontraron reservas');
      } else if (error.response?.status === 500) {
        showErrorAlert('Error', 'Error interno del servidor. Intente más tarde');
      } else {
        showErrorAlert('Error', errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  return {
    reservas,
    setReservas,
    loading,
    error,
    fetchReservas
  };
};

export default useGetReserva;