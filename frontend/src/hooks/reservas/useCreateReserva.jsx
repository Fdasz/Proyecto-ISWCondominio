import { useState } from 'react';
import { createReserva } from '../../services/Reserva.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useCreateReserva = (setReservas) => {
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

  const handleClickCreate = () => {
    setIsCreatePopupOpen(true);
  };

  const handleCreate = async (formData) => {
    try {
      // Validar que los campos requeridos estén presentes
      if (!formData.id_espacio || !formData.id_residente || !formData.fecha_reserva || 
          !formData.hora_inicio || !formData.hora_fin) {
        showErrorAlert('Error', 'Por favor complete todos los campos requeridos');
        return;
      }

      // Validar que la hora de inicio sea anterior a la hora de fin
      if (formData.hora_inicio >= formData.hora_fin) {
        showErrorAlert('Error', 'La hora de inicio debe ser anterior a la hora de fin');
        return;
      }

      // Validar que la fecha no sea anterior a hoy
      const today = new Date();
      const fechaReserva = new Date(formData.fecha_reserva);
      if (fechaReserva < today.setHours(0, 0, 0, 0)) {
        showErrorAlert('Error', 'No se pueden crear reservas para fechas pasadas');
        return;
      }

      // Preparar los datos para enviar
      const reservaData = {
        id_espacio: formData.id_espacio,
        id_residente: formData.id_residente,
        fecha_reserva: formData.fecha_reserva,
        hora_inicio: formData.hora_inicio,
        hora_fin: formData.hora_fin,
        observaciones: formData.observaciones || ''
      };

      // Llamar al servicio para crear la reserva
      const response = await createReserva(reservaData);
      
      if (response.status === 'Success') {
        // Actualizar la lista de reservas agregando la nueva reserva
        setReservas(prevReservas => [...prevReservas, response.data]);
        
        // Mostrar mensaje de éxito
        showSuccessAlert('¡Éxito!', 'Reserva creada correctamente');
        
        // Cerrar el popup
        setIsCreatePopupOpen(false);
      } else {
        showErrorAlert('Error', response.message || 'Error al crear la reserva');
      }
    } catch (error) {
      console.error('Error al crear reserva:', error);
      
      // Manejar diferentes tipos de errores
      if (error.response?.status === 400) {
        showErrorAlert('Error', 'Datos inválidos. Verifique la información ingresada');
      } else if (error.response?.status === 409) {
        showErrorAlert('Error', 'Ya existe una reserva para este espacio en el horario seleccionado');
      } else if (error.response?.status === 422) {
        showErrorAlert('Error', 'El espacio no está disponible en el horario seleccionado');
      } else if (error.response?.status === 500) {
        showErrorAlert('Error', 'Error interno del servidor. Intente más tarde');
      } else {
        showErrorAlert('Error', 'Error al crear la reserva. Intente nuevamente');
      }
    }
  };

  return {
    handleClickCreate,
    handleCreate,
    isCreatePopupOpen,
    setIsCreatePopupOpen
  };
};

export default useCreateReserva;