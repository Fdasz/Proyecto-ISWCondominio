
import { useState } from 'react';
import { createEspacioComun } from '../../services/EspacioComun.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useCreateEspacioComun = (setEspacios) => {
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

  const handleClickCreate = () => {
    setIsCreatePopupOpen(true);
  };

  const handleCreate = async (formData) => {
    try {
      // Validar que los campos requeridos estén presentes
      if (!formData.tipo_espacio_comun || !formData.descripcion_espacio_comun) {
        showErrorAlert('Error', 'Por favor complete todos los campos requeridos');
        return;
      }

      // Preparar los datos para enviar
      const espacioData = {
        tipo_espacio_comun: formData.tipo_espacio_comun,
        descripcion_espacio_comun: formData.descripcion_espacio_comun,
        estado_espacio_comun: formData.estado_espacio_comun !== undefined ? formData.estado_espacio_comun : true
      };

      // Llamar al servicio para crear el espacio común
      const response = await createEspacioComun(espacioData);
      
      
      if (response.status === 'Success') {
        // Actualizar la lista de espacios agregando el nuevo espacio
        setEspacios(prevEspacios => [...prevEspacios, response.data]);
        
        // Mostrar mensaje de éxito
        showSuccessAlert('¡Éxito!', 'Espacio común creado correctamente');
        
        // Cerrar el popup
        setIsCreatePopupOpen(false);
      } else {
        showErrorAlert('Error', response.message || 'Error al crear el espacio común');
      }
    } catch (error) {
      console.error('Error al crear espacio común:', error);
      
      // Manejar diferentes tipos de errores
      if (error.response?.status === 400) {
        showErrorAlert('Error', 'Datos inválidos. Verifique la información ingresada');
      } else if (error.response?.status === 409) {
        showErrorAlert('Error', 'Ya existe un espacio común con ese tipo');
      } else if (error.response?.status === 500) {
        showErrorAlert('Error', 'Error interno del servidor. Intente más tarde');
      } else {
        showErrorAlert('Error', 'Error al crear el espacio común. Intente nuevamente');
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

export default useCreateEspacioComun;