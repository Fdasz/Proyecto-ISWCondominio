import { useState } from 'react';
import { updateEspacioComun } from '@services/espacioComun.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatEspacioComunData } from '@helpers/formatData.js';

const useEditEspacioComun = (setEspacios) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataEspacio, setDataEspacio] = useState([]);

    const handleClickUpdate = () => {
        if (dataEspacio.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedEspacioData) => {
        if (updatedEspacioData) {
            try {
                const updated = await updateEspacioComun(dataEspacio[0].id_espacio, updatedEspacioData);
                showSuccessAlert('¡Actualizado!', 'El espacio común ha sido actualizado correctamente.');
                setIsPopupOpen(false);

                const formattedEspacio = formatEspacioComunData(updated.data);

                setEspacios(prev =>
                    prev.map(espacio =>
                        espacio.id_espacio === formattedEspacio.id_espacio
                            ? formattedEspacio
                            : espacio
                    )
                );

                setDataEspacio([]);
            } catch (error) {
                console.error('Error al actualizar el espacio común:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al actualizar el espacio común.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataEspacio,
        setDataEspacio
    };
};

export default useEditEspacioComun;
