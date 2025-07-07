import { deleteEspacioComun } from '@services/EspacioComun.service.js';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeleteEspacioComun = (fetchEspacios, setDataEspacio) => {
    const handleDelete = async (dataEspacio) => {
        if (dataEspacio.length > 0) {
            try {
                const result = await deleteDataAlert();
                if (result.isConfirmed) {
                    const response = await deleteEspacioComun(dataEspacio[0].id_espacio);
                    
                    if (response.status === 'Client error') {
                        return showErrorAlert('Error', response.details);
                    }

                    showSuccessAlert('¡Eliminado!', 'El espacio común ha sido eliminado correctamente.');
                    await fetchEspacios();
                    setDataEspacio([]);
                } else {
                    showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                }
            } catch (error) {
                console.error('Error al eliminar el espacio común:', error);
                showErrorAlert('Error', 'Ocurrió un error al eliminar el espacio común.');
            }
        }
    };

    return {
        handleDelete
    };
};

export default useDeleteEspacioComun;
