"use strict";
import {
    createVisitaService,
    deleteVisitaService,
    searchVisitasService,
    updateVisitaService
} from "../services/visita.service.js";
import {
    visitaBodyValidation,
    visitaQueryValidation
} from "../validations/visita.validation.js";
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess
} from "../handlers/responseHandlers.js";

// Buscar visitas con filtros
export async function getVisitas(req, res) {
    try {
        const {
            startDate,
            endDate,
            nombre_visitante,
            nombre_residente,
            rut_visitante,
            rut_usuario
        } = req.query;

        const { error } = visitaQueryValidation.validate({
            startDate,
            endDate,
            nombre_visitante,
            nombre_residente,
            rut_visitante,
            rut_usuario
        });
        if (error) return handleErrorClient(res, 400, error.message);

        const [visitas, errorVisitas] = await searchVisitasService({
            startDate,
            endDate,
            nombre_visitante,
            nombre_residente,
            rut_visitante,
            rut_usuario
        });

        if (errorVisitas) return handleErrorClient(res, 404, errorVisitas);

        visitas.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Visitas encontradas", visitas);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

// Actualizar visita
export async function updateVisita(req, res) {
    try {
        const { id_visita } = req.params;
        const { body } = req;

        if (!id_visita) return handleErrorClient(res, 400, "id_visita es requerido");

        const { error: bodyError } = visitaBodyValidation.validate(body);
        if (bodyError) return handleErrorClient(res, 400, bodyError.message);

        const [visita, errorVisita] = await updateVisitaService(
            { id_visita },
            body
        );

        if (errorVisita) return handleErrorClient(res, 404, errorVisita);

        handleSuccess(res, 200, "Visita actualizada", visita);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

// Eliminar visita
export async function deleteVisita(req, res) {
    try {
        const { id_visita } = req.params;

        if (!id_visita) return handleErrorClient(res, 400, "id_visita es requerido");

        const [visita, errorVisita] = await deleteVisitaService({ id_visita });

        if (errorVisita) return handleErrorClient(res, 404, errorVisita);

        handleSuccess(res, 200, "Visita eliminada", visita);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

// Crear visita
export async function createVisita(req, res) {
    try {
        const { body } = req;

        const { error } = visitaBodyValidation.validate(body);
        if (error) return handleErrorClient(res, 400, error.message);

        const [visita, errorVisita] = await createVisitaService(body);

        if (errorVisita) return handleErrorClient(res, 400, errorVisita);

        handleSuccess(res, 201, "Visita creada", visita);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}