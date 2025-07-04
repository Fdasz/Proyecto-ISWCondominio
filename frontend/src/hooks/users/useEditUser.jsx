import { useState } from 'react';
import { updateUser } from '@services/user.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdate } from '@helpers/formatData.js';

const useEditUser = (setUsers) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataUser, setDataUser] = useState([]);
    
    const handleClickUpdate = () => {
        if (dataUser.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedUserData) => {
        if (updatedUserData) {
            try {
            const updatedUser = await updateUser(updatedUserData, dataUser[0].rut_usuario);
            showSuccessAlert('¡Actualizado!','El usuario ha sido actualizado correctamente.');
            setIsPopupOpen(false);
            const formattedUser = formatPostUpdate(updatedUser);

            setUsers(prevUsers => prevUsers.map(user => {
                if (user.id_usuario === formattedUser.id_usuario) {
                    return formattedUser;
                }
                return user.email_usuario === formattedUser.email_usuario ? formattedUser : user;
            }));

            setDataUser([]);
            } catch (error) {
                console.error('Error al actualizar el usuario:', error);
                showErrorAlert('Cancelado','Ocurrió un error al actualizar el usuario.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataUser,
        setDataUser
    };
};

export default useEditUser;