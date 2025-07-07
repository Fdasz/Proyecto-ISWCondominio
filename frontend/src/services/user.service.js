import axios from './root.service.js';
import { formatUserData } from '@helpers/formatData.js';

export async function getUsers() {
    try {
        const { data } = await axios.get('/user/');
        const formattedData = data.data.map(formatUserData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateUser(data, rut_usuario) {
    try {
        const response = await axios.patch(`/user/detail/?rut_usuario=${rut_usuario}`, data);
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function deleteUser(rut_usuario) {
    try {
        const response = await axios.delete(`/user/detail/?rut_usuario=${rut_usuario}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getUser(params) {
    try {
        console.log('getUser service received params:', params);

        if (!params || Object.keys(params).length === 0) {
            return {
                status: 'Error',
                message: 'Se requieren parámetros de búsqueda'
            };
        }

        const response = await axios.get('/user/detail', { params });
        return response.data;

    } catch (error) {
        console.error('Error in getUser:', error);
        return {
            status: 'Error',
            message: error.response?.data?.message || 'Error al buscar usuario'
        };
    }
}