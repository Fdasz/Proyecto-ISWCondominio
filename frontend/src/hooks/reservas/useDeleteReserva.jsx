import { deleteReserva } from '../../services/Reserva.service.js';
import { showErrorAlert, showSuccessAlert} from '@helpers/sweetAlert.js';

const useDeleteReserva = (fetchReservas, setDataReserva) => {
  const handleDelete = async (reservasToDelete) => {
    try {
      // Validar que haya reservas seleccionadas
      if (!reservasToDelete || reservasToDelete.length === 0) {
        showErrorAlert('Error', 'Seleccione al menos una reserva para eliminar');
        return;
      }

      // Verificar si alguna reserva ya está en curso o ha terminado
      const now = new Date();
      const reservasEnCurso = reservasToDelete.filter(reserva => {
        const fechaReserva = new Date(reserva.fecha_reserva);
        const [horaInicio] = reserva.hora_inicio.split(':');
        const inicioReserva = new Date(fechaReserva);
        inicioReserva.setHours(parseInt(horaInicio));
        
        return inicioReserva <= now;
      });

      if (reservasEnCurso.length > 0) {
        showErrorAlert(
          'Error', 
          'No se pueden eliminar reservas que ya han iniciado o terminado'
        );
        return;
      }

      // Mostrar confirmación
      const confirmResult = await showConfirmDialog(
        '¿Está seguro?',
        `¿Desea eliminar ${reservasToDelete.length === 1 ? 'esta reserva' : 'estas reservas'}?`,
        'Sí, eliminar',
        'Cancelar'
      );

      if (!confirmResult.isConfirmed) {
        return;
      }

      // Procesar eliminación
      const deletePromises = reservasToDelete.map(reserva => 
        deleteReserva(reserva.id_reserva)
      );

      const results = await Promise.allSettled(deletePromises);
      
      // Contar éxitos y errores
      const successCount = results.filter(result => 
        result.status === 'fulfilled' && result.value.status === 'Success'
      ).length;
      
      const errorCount = results.filter(result => 
        result.status === 'rejected' || 
        (result.status === 'fulfilled' && result.value.status !== 'Success')
      ).length;

      // Mostrar resultados
      if (successCount > 0) {
        if (errorCount === 0) {
          showSuccessAlert(
            '¡Éxito!', 
            `${successCount === 1 ? 'Reserva eliminada' : 'Reservas eliminadas'} correctamente`
          );
        } else {
          showSuccessAlert(
            'Parcialmente completado',
            `${successCount} reserva${successCount > 1 ? 's' : ''} eliminada${successCount > 1 ? 's' : ''} correctamente. ${errorCount} no se pudo${errorCount > 1 ? 'ieron' : ''} eliminar.`
          );
        }
        
        // Refrescar la lista de reservas
        await fetchReservas();
        
        // Limpiar selección
        setDataReserva(null);
      } else {
        showErrorAlert('Error', 'No se pudo eliminar ninguna reserva');
      }

    } catch (error) {
      console.error('Error al eliminar reserva(s):', error);
      
      // Manejar diferentes tipos de errores
      if (error.response?.status === 404) {
        showErrorAlert('Error', 'La reserva no existe o ya ha sido eliminada');
      } else if (error.response?.status === 403) {
        showErrorAlert('Error', 'No tiene permisos para eliminar esta reserva');
      } else if (error.response?.status === 500) {
        showErrorAlert('Error', 'Error interno del servidor. Intente más tarde');
      } else {
        showErrorAlert('Error', 'Error al eliminar la reserva. Intente nuevamente');
      }
    }
  };

  return {
    handleDelete
  };
};

export default useDeleteReserva;