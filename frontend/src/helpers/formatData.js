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
        estado_espacio_comun: Boolean(espacio.estado_espacio_comun)
    };
}

export function formatReservaEspacioData(reserva) {
  return {
    ...reserva,
    fecha_reserva: reserva.fecha_reserva,
    hora_inicio: reserva.hora_inicio,
    hora_fin: reserva.hora_fin,
    espacio: reserva.espacio
      ? {
          ...reserva.espacio,
          tipo_espacio_comun: startCase(reserva.espacio.tipo_espacio_comun),
          descripcion_espacio_comun: startCase(reserva.espacio.descripcion_espacio_comun),
          estado_espacio_comun: Boolean(reserva.espacio.estado_espacio_comun),
        }
      : null,
    usuario: reserva.usuario
      ? {
          ...reserva.usuario,
          nombre_usuario: startCase(reserva.usuario.nombre_usuario),
          rut_usuario: formatRut(reserva.usuario.rut_usuario),
        }
      : null,
  };
}