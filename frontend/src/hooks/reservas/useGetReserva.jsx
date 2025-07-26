import { useState, useEffect, useCallback } from 'react';
import { getReservasEspacioService } from '@services/reservaEspacio.service.js';

const useGetReservaEspacio = () => {
  const [reservas, setReservas] = useState([]);
  const [reservasUsuario, setReservasUsuario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener el usuario del sessionStorage de forma segura
  const getCurrentUser = useCallback(() => {
    try {
      const usuarioString = sessionStorage.getItem('usuario');
      if (!usuarioString) return null;
      
      const usuario = JSON.parse(usuarioString);
      return usuario?.rut_usuario || null;
    } catch (error) {
      console.error("Error al obtener usuario del sessionStorage:", error);
      return null;
    }
  }, []);

  const filterUserReservas = useCallback((reservasData) => {
    const rutUsuario = getCurrentUser();
    if (!rutUsuario) {
      console.warn('No hay usuario autenticado');
      return [];
    }

    return reservasData.filter(
      reserva => reserva.usuario?.rut_usuario === rutUsuario
    );
  }, [getCurrentUser]);

  const fetchReservas = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);

      // Llamar al service y manejar la respuesta [data, error]
      const [data, serviceError] = await getReservasEspacioService(filters);

      // Verificar si hubo error en el service
      if (serviceError) {
        throw new Error(serviceError);
      }

      // Verificar que data sea un array válido
      if (!data || !Array.isArray(data)) {
        console.warn("Respuesta inesperada del service:", data);
        setReservas([]);
        setReservasUsuario([]);
        return;
      }

      setReservas(data);
      
      // Filtrar reservas del usuario actual
      const reservasDelUsuario = filterUserReservas(data);
      setReservasUsuario(reservasDelUsuario);

    } catch (error) {
      console.error("Error al obtener reservas:", error);
      setError(error.message || 'Error al cargar reservas');
      setReservas([]);
      setReservasUsuario([]);
    } finally {
      setLoading(false);
    }
  }, [filterUserReservas]);

  // Función para obtener reservas por fecha
  const getReservasByDate = useCallback((fecha) => {
    const fechaString = fecha instanceof Date 
      ? fecha.toISOString().split('T')[0] 
      : fecha;

    return reservas.filter(reserva => 
      reserva.fecha_reserva === fechaString
    );
  }, [reservas]);

  // Función para obtener reservas del usuario por fecha
  const getUserReservasByDate = useCallback((fecha) => {
    const fechaString = fecha instanceof Date 
      ? fecha.toISOString().split('T')[0] 
      : fecha;

    return reservasUsuario.filter(reserva => 
      reserva.fecha_reserva === fechaString
    );
  }, [reservasUsuario]);

  // Función para verificar si el usuario puede reservar en una fecha
  const canUserReserveOnDate = useCallback((fecha) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const targetDate = fecha instanceof Date ? fecha : new Date(fecha);

    // No se puede reservar en fechas pasadas
    if (targetDate <= yesterday) {
      return false;
    }

    // Verificar si ya tiene una reserva ese día
    const reservasEnFecha = getUserReservasByDate(fecha);
    return reservasEnFecha.length === 0;
  }, [getUserReservasByDate]);

  // Función para verificar disponibilidad de un espacio en un horario específico
  const isEspacioAvailable = useCallback((idEspacio, fecha, horaInicio, horaFin) => {
    const reservasEnFecha = getReservasByDate(fecha);
    
    return !reservasEnFecha.some(reserva => {
      if (reserva.espacio?.id_espacio !== idEspacio) return false;
      
      const existingStart = reserva.hora_inicio;
      const existingEnd = reserva.hora_fin;
      
      // Verificar solapamiento de horarios
      return (
        (horaInicio >= existingStart && horaInicio < existingEnd) ||
        (horaFin > existingStart && horaFin <= existingEnd) ||
        (horaInicio <= existingStart && horaFin >= existingEnd)
      );
    });
  }, [getReservasByDate]);

  // Función para refrescar las reservas
  const refreshReservas = useCallback(() => {
    fetchReservas();
  }, [fetchReservas]);

  // Función para actualizar una reserva específica en el estado local
  const updateReservaInState = useCallback((updatedReserva) => {
    setReservas(prev => 
      prev.map(reserva => 
        reserva.id_reserva === updatedReserva.id_reserva 
          ? updatedReserva 
          : reserva
      )
    );

    // Actualizar también las reservas del usuario si corresponde
    const rutUsuario = getCurrentUser();
    if (updatedReserva.usuario?.rut_usuario === rutUsuario) {
      setReservasUsuario(prev => 
        prev.map(reserva => 
          reserva.id_reserva === updatedReserva.id_reserva 
            ? updatedReserva 
            : reserva
        )
      );
    }
  }, [getCurrentUser]);

  // Función para eliminar una reserva del estado local
  const removeReservaFromState = useCallback((idReserva) => {
    setReservas(prev => 
      prev.filter(reserva => reserva.id_reserva !== idReserva)
    );
    setReservasUsuario(prev => 
      prev.filter(reserva => reserva.id_reserva !== idReserva)
    );
  }, []);

  // Función para agregar una nueva reserva al estado local
  const addReservaToState = useCallback((newReserva) => {
    setReservas(prev => [...prev, newReserva]);
    
    // Agregar a reservas del usuario si corresponde
    const rutUsuario = getCurrentUser();
    if (newReserva.usuario?.rut_usuario === rutUsuario) {
      setReservasUsuario(prev => [...prev, newReserva]);
    }
  }, [getCurrentUser]);

  // Efecto para cargar las reservas al montar el componente
  useEffect(() => {
    fetchReservas();
  }, [fetchReservas]);

  return {
    // Estados
    reservas,
    reservasUsuario,
    loading,
    error,
    
    // Funciones principales
    fetchReservas,
    refreshReservas,
    
    // Funciones de consulta
    getReservasByDate,
    getUserReservasByDate,
    canUserReserveOnDate,
    isEspacioAvailable,
    
    // Funciones de manipulación del estado
    updateReservaInState,
    removeReservaFromState,
    addReservaToState,
    
    // Funciones de utilidad
    getCurrentUser
  };
};

export default useGetReservaEspacio;