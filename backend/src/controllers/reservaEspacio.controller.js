"use strict";

import {
    createReservaEspacioService,
    deleteReservaEspacioService,
    getReservasEspacioService,
    updateReservaEspacioService
} from "../services/reservaEspacio.service.js";
import {
    reservaEspacioBodyValidation,
    reservaEspacioUpdateValidation,
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

        // Validación de query parameters
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

        if (reservasEspacio.length === 0) {
            return handleSuccess(res, 200, "No se encontraron reservas de espacio", []);
        }
        
        handleSuccess(res, 200, "Reservas de espacio encontradas", reservasEspacio);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function createReservaEspacio(req, res) {
    try {
        const { fecha_reserva, hora_inicio, hora_fin, id_espacio, rut_usuario } = req.body;

        // Validación del body (sin incluir id_reserva ya que es auto-generado)
        const { error } = reservaEspacioBodyValidation.validate({
            fecha_reserva,
            hora_inicio,
            hora_fin,
            id_espacio,
            rut_usuario
        });

        if (error) return handleErrorClient(res, 400, error.message);

        const [reservaEspacio, errorReservaEspacio] = await createReservaEspacioService(req.body);
        
        if (errorReservaEspacio) return handleErrorClient(res, 400, errorReservaEspacio);
        
        handleSuccess(res, 201, "Reserva de espacio creada", reservaEspacio);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function updateReservaEspacio(req, res) {
    try {
        const { id_reserva } = req.params;
        const { fecha_reserva, hora_inicio, hora_fin, id_espacio } = req.body;

        // Validar que id_reserva sea un número válido
        const idReserva = parseInt(id_reserva);
        if (isNaN(idReserva) || idReserva <= 0) {
            return handleErrorClient(res, 400, "ID de reserva inválido");
        }

        // Usar la validación específica para updates (sin rut_usuario)
        const { error } = reservaEspacioUpdateValidation.validate({
            fecha_reserva,
            hora_inicio,
            hora_fin,
            id_espacio
        });

        if (error) return handleErrorClient(res, 400, error.message);

        const [reservaEspacio, errorReservaEspacio] = await updateReservaEspacioService(idReserva, req.body);
        
        if (errorReservaEspacio) return handleErrorClient(res, 404, errorReservaEspacio);
        
        handleSuccess(res, 200, "Reserva de espacio actualizada", reservaEspacio);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteReservaEspacio(req, res) {
    try {
        const { id_reserva } = req.params;

        // Validar que id_reserva sea un número válido
        const idReserva = parseInt(id_reserva);
        if (isNaN(idReserva) || idReserva <= 0) {
            return handleErrorClient(res, 400, "ID de reserva inválido");
        }

        const [reservaEspacio, errorReservaEspacio] = await deleteReservaEspacioService(idReserva);
        
        if (errorReservaEspacio) return handleErrorClient(res, 404, errorReservaEspacio);
        
        handleSuccess(res, 200, "Reserva de espacio eliminada", reservaEspacio);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}