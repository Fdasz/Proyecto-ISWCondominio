"use strict"
import {
    createReservaEspacioService,
    deleteReservaEspacioService,
    getReservasEspacioService,
    updateReservaEspacioService
} from "../services/reservaEspacio.service.js";
import {
    reservaEspacioBodyValidation,
    reservaEspacioQueryValidation
} from "../validations/reservaEspacio.validation.js";
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess
} from "../handlers/responseHandlers.js";

export async function getReservaEspacio(req, res) {
    try {
        const { id_reserva, fecha_reserva, hora_inicio, hora_fin, id_espacio, rut_usuario } = req.query;

        const { error } = reservaEspacioQueryValidation.validate({
            id_reserva,
            fecha_reserva,
            hora_inicio,
            hora_fin,
            id_espacio,
            rut_usuario
        });

        if (error) return handleErrorClient(res, 400, error.message);

        const [reservasEspacio, errorReservasEspacio] = await getReservasEspacioService({
            id_reserva,
            fecha_reserva,
            hora_inicio,
            hora_fin,
            id_espacio,
            rut_usuario
        });

        if (errorReservasEspacio) return handleErrorClient(res, 404, errorReservasEspacio);

        reservasEspacio.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Reservas de espacio encontradas", reservasEspacio);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function createReservaEspacio(req, res) {
    try {
        const { fecha_reserva, hora_inicio, hora_fin, id_espacio, rut_usuario } = req.body;

        const { error } = reservaEspacioBodyValidation.validate({
            fecha_reserva,
            hora_inicio,
            hora_fin,
            id_espacio,
            rut_usuario
        });

        if (error) return handleErrorClient(res, 400, error.message);

        const [reservaEspacio, errorReservaEspacio] = await createReservaEspacioService(req.body);
        if (errorReservaEspacio) return handleErrorClient(res, 404, errorReservaEspacio);
        handleSuccess(res, 201, "Reserva de espacio creada", reservaEspacio);
    }
    catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function updateReservaEspacio(req, res) {
    try {
        const { id_reserva } = req.params;
        const { fecha_reserva, hora_inicio, hora_fin, id_espacio, rut_usuario } = req.body;

        const { error } = reservaEspacioBodyValidation.validate({
            id_reserva,
            fecha_reserva,
            hora_inicio,
            hora_fin,
            id_espacio,
            rut_usuario
        });

        if (error) return handleErrorClient(res, 400, error.message);

        const [reservaEspacio, errorReservaEspacio] = await updateReservaEspacioService(id_reserva, req.body);
        if (errorReservaEspacio) return handleErrorClient(res, 404, errorReservaEspacio);
        handleSuccess(res, 200, "Reserva de espacio actualizada", reservaEspacio);
    }
    catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteReservaEspacio(req, res) {
    try {
        const { id_reserva } = req.params;

        const [reservaEspacio, errorReservaEspacio] = await deleteReservaEspacioService(id_reserva);
        if (errorReservaEspacio) return handleErrorClient(res, 404, errorReservaEspacio);
        handleSuccess(res, 200, "Reserva de espacio eliminada", reservaEspacio);
    }
    catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}
