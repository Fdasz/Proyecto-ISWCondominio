import axios from './root.service.js';
import cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { convertirMinusculas } from '@helpers/formatData.js';


export async function login(dataUser) {
    try {
        const response = await axios.post('/auth/login', {
            email_usuario: dataUser.email_usuario, 
            password: dataUser.password
        });
        const { status, data } = response;
        if (status === 200) {
            const { nombre_usuario, email_usuario, rut_usuario, rol } = jwtDecode(data.data.token);
            const userData = { nombre_usuario, email_usuario, rut_usuario, rol };
            sessionStorage.setItem('usuario', JSON.stringify(userData));
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            cookies.set('jwt-auth', data.data.token, {path:'/'});
            return response.data
        }
    } catch (error) {
        return error.response.data;
    }
}

export async function register(data) {
    try {
        const dataRegister = convertirMinusculas(data);
        const { nombre_usuario, email_usuario, rut_usuario, password } = dataRegister
        const response = await axios.post('/auth/register', {
            nombre_usuario,
            email_usuario,
            rut_usuario,
            password
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function logout() {
    try {
        await axios.post('/auth/logout');
        sessionStorage.removeItem('usuario');
        cookies.remove('jwt');
        cookies.remove('jwt-auth');
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
}