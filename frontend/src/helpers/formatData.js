import { startCase } from 'lodash';
import { format as formatRut } from 'rut.js';
import { format as formatTempo } from "@formkit/tempo";

export function formatUserData(user) {
    return {
        ...user,
        nombre_usuario: startCase(user.nombre_usuario),
        rol: startCase(user.rol),
        rut: formatRut(user.rut_usuario),
        createdAt: formatTempo(user.createdAt, "DD-MM-YYYY")
    };
}

export function convertirMinusculas(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = obj[key].toLowerCase();
        }
    }
    return obj;
}

export function formatPostUpdate(user) {
    return {
        nombre_usuario: startCase(user.nombre_usuario),
        rol: startCase(user.rol),
        rut_usuario: formatRut(user.rut_usuario),
        email_usuario: user.email_usuario,
        createdAt: formatTempo(user.createdAt, "DD-MM-YYYY")
    };
}

export function formatEspacioComunData(espacio) {
    return {
        ...espacio,
        tipo_espacio_comun: startCase(espacio.tipo_espacio_comun),
        descripcion_espacio_comun: startCase(espacio.descripcion_espacio_comun),
        estado_espacio_comun: startCase(espacio.estado_espacio_comun)
    };
}
