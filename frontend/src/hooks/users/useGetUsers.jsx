import { useState, useEffect } from 'react';
import { getUsers } from '@services/user.service.js';

const useUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            const formattedData = response.map(user => ({
                nombre_usuario: user.nombre_usuario,
                rut_usuario: user.rut_usuario,
                email_usuario: user.email_usuario,
                rol: user.rol,
                createdAt: user.createdAt
            }));
            dataLogged(formattedData);
            setUsers(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const dataLogged = (formattedData) => {
        try {
            const { rut_usuario } = JSON.parse(sessionStorage.getItem('usuario'));
            for(let i = 0; i < formattedData.length ; i++) {
                if(formattedData[i].rut_usuario === rut_usuario) {
                    formattedData.splice(i, 1);
                    break;
                }
            }
        } catch (error) {
            console.error("Error: ", error)
        }
    };

    return { users, fetchUsers, setUsers };
};

export default useUsers;