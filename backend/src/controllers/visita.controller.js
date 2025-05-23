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
            rut_visitante_num,
            rut_visitante_dv,
            rut_residente_num,
            rut_residente_dv
        } = req.query;

        const { error } = visitaQueryValidation.validate({
            startDate,
            endDate,
            nombre_visitante,
            nombre_residente,
            rut_visitante_num,
            rut_visitante_dv,
            rut_residente_num,
            rut_residente_dv
        });
        if (error) return handleErrorClient(res, 400, error.message);

        const [visitas, errorVisitas] = await searchVisitasService({
            startDate,
            endDate,
            nombre_visitante,
            nombre_residente,
            rut_visitante_num,
            rut_visitante_dv,
            rut_residente_num,
            rut_residente_dv
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
        const { rut_visitante_num, rut_visitante_dv, rut_residente_num, rut_residente_dv, fecha_visita } = req.body;
        const { body } = req;

        const { error: queryError } = visitaQueryValidation.validate({
            rut_visitante_num,
            rut_visitante_dv,
            rut_residente_num,
            rut_residente_dv,
            fecha_visita
        });
        if (queryError) return handleErrorClient(res, 400, queryError.message);

        const { error: bodyError } = visitaBodyValidation.validate(body);
        if (bodyError) return handleErrorClient(res, 400, bodyError.message);

        const [visita, errorVisita] = await updateVisitaService(
            { rut_visitante_num, rut_visitante_dv, rut_residente_num, rut_residente_dv, fecha_visita },
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
        const { rut_visitante_num, rut_visitante_dv, rut_residente_num, rut_residente_dv, fecha_visita } = req.query;

        const { error } = visitaQueryValidation.validate({
            rut_visitante_num,
            rut_visitante_dv,
            rut_residente_num,
            rut_residente_dv,
            fecha_visita
        });
        if (error) return handleErrorClient(res, 400, error.message);

        const [visita, errorVisita] = await deleteVisitaService({
            rut_visitante_num,
            rut_visitante_dv,
            rut_residente_num,
            rut_residente_dv,
            fecha_visita,
        });

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