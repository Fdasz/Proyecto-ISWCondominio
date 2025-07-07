import { startCase } from 'lodash';
import { format as formatRut } from 'rut.js';
import { format as formatTempo } from "@formkit/tempo";

export function formatUserData(user) {
    return {
        ...user,
        nombreCompleto: startCase(user.nombreCompleto),
        rol: startCase(user.rol),
        rut: formatRut(user.rut),
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
        nombreCompleto: startCase(user.nombreCompleto),
        rol: startCase(user.rol),
        rut: formatRut(user.rut),
        email: user.email,
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

export function formatReservaData(reserva) {
    return {
        ...reserva,
        fecha_reserva: reserva.fecha_reserva ? new Date(reserva.fecha_reserva).toLocaleDateString() : null,
        hora_inicio: reserva.hora_inicio,
        hora_fin: reserva.hora_fin,
        espacio: reserva.espacio ? {
            ...reserva.espacio,
            tipo_espacio_comun: startCase(reserva.espacio.tipo_espacio_comun),
            descripcion_espacio_comun: startCase(reserva.espacio.descripcion_espacio_comun),
            estado_espacio_comun: startCase(reserva.espacio.estado_espacio_comun)
        } : null,
        residente: reserva.residente ? {
            ...reserva.residente,
        } : null
    };
}