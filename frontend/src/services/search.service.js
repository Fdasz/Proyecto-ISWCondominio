import axios from './root.service';

export const searchVisitantes = async (params) => {
    try {
        const response = await axios.get('/visitante/detail', { params });
        return response.data;
    } catch (error) {
        console.error('Error searching visitantes:', error);
        return error.response?.data || [];
    }
};

export const searchUsuarios = async (params) => {
    try {
        const searchParams = {};
        if (params.nombre_usuario?.trim()) {
            searchParams.nombre_usuario = params.nombre_usuario.trim();
        }
        if (params.rut_usuario?.trim()) {
            searchParams.rut_usuario = params.rut_usuario.trim();
        }

        if (Object.keys(searchParams).length === 0) {
            return {
                status: 'Error',
                message: 'Debe proporcionar al menos un parámetro de búsqueda'
            };
        }

        const response = await axios.get('/user/detail', { params: searchParams });
        return response.data;
    } catch (error) {
        console.error('Error in searchUsuarios:', error);
        return {
            status: 'Error',
            message: error.response?.data?.message || 'Error al buscar usuarios'
        };
    }
};