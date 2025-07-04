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