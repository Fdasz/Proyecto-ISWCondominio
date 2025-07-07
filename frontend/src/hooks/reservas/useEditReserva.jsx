import { useState } from 'react';
import { updateReserva } from '../../services/Reserva.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useEditReserva = (setReservas) => {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [dataReserva, setDataReserva] = useState(null);

  const handleClickEdit = (reserva) => {
    setDataReserva(reserva);
    setIsEditPopupOpen(true);
  };

  const handleUpdate = async (formData) => {
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

      // Validar que no se esté editando una reserva que ya pasó
      const now = new Date();
      const fechaReserva = new Date(formData.fecha_reserva);
      const [horaFin] = formData.hora_fin.split(':');
      const finReserva = new Date(fechaReserva);
      finReserva.setHours(parseInt(horaFin));
      
      if (finReserva < now) {
        showErrorAlert('Error', 'No se pueden modificar reservas que ya han finalizado');
        return;
      }

      // Preparar los datos para enviar
      const reservaData = {
        id_reserva: dataReserva.id_reserva,
        id_espacio: formData.id_espacio,
        id_residente: formData.id_residente,
        fecha_reserva: formData.fecha_reserva,
        hora_inicio: formData.hora_inicio,
        hora_fin: formData.hora_fin,
        observaciones: formData.observaciones || ''
      };

      // Llamar al servicio para actualizar la reserva
      const response = await updateReserva(reservaData.id_reserva, reservaData);
      
      if (response.status === 'Success') {
        // Actualizar la lista de reservas
        setReservas(prevReservas => 
          prevReservas.map(reserva => 
            reserva.id_reserva === dataReserva.id_reserva 
              ? { ...reserva, ...response.data }
              : reserva
          )
        );
        
        // Mostrar mensaje de éxito
        showSuccessAlert('¡Éxito!', 'Reserva actualizada correctamente');
        
        // Cerrar el popup y limpiar datos
        setIsEditPopupOpen(false);
        setDataReserva(null);
      } else {
        showErrorAlert('Error', response.message || 'Error al actualizar la reserva');
      }
    } catch (error) {
      console.error('Error al actualizar reserva:', error);
      
      // Manejar diferentes tipos de errores
      if (error.response?.status === 400) {
        showErrorAlert('Error', 'Datos inválidos. Verifique la información ingresada');
      } else if (error.response?.status === 404) {
        showErrorAlert('Error', 'La reserva no existe o ha sido eliminada');
      } else if (error.response?.status === 409) {
        showErrorAlert('Error', 'Ya existe una reserva para este espacio en el horario seleccionado');
      } else if (error.response?.status === 422) {
        showErrorAlert('Error', 'El espacio no está disponible en el horario seleccionado');
      } else if (error.response?.status === 500) {
        showErrorAlert('Error', 'Error interno del servidor. Intente más tarde');
      } else {
        showErrorAlert('Error', 'Error al actualizar la reserva. Intente nuevamente');
      }
    }
  };

  return {
    handleClickEdit,
    handleUpdate,
    isEditPopupOpen,
    setIsEditPopupOpen,
    dataReserva,
    setDataReserva
  };
};

export default useEditReserva;