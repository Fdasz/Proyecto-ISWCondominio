"use strict";
import {
    createVisitanteService,
    deleteVisitanteService,
    getVisitanteService,
    getVisitantesService,
    updateVisitanteService
} from "../services/visitante.service.js";
import {
    visitanteBodyValidation,
    visitanteQueryValidation
} from "../validations/visitante.validation.js";
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess
} from "../handlers/responseHandlers.js";

export async function getVisitante(req, res) {
    try {
        const { rut_visitante, id_visitante, nombre_visitante } = req.query;

        const { error } = visitanteQueryValidation.validate({
            rut_visitante,
            id_visitante,
            nombre_visitante
        });

        if (error) return handleErrorClient(res, 400, error.message);

        const [visitante, errorVisitante] = await getVisitanteService({
            rut_visitante,
            id: id_visitante,
            nombre: nombre_visitante,
        });

        if (errorVisitante) return handleErrorClient(res, 404, errorVisitante);

        handleSuccess(res, 200, "Visitante encontrado", visitante);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getVisitantes(req, res) {
    try {
        const [visitantes, errorVisitantes] = await getVisitantesService();

        if (errorVisitantes) return handleErrorClient(res, 404, errorVisitantes);

        visitantes.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Visitantes encontrados", visitantes);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function createVisitante(req, res) {
    try {
        const { body } = req;

        const { error } = visitanteBodyValidation.validate(body);
        if (error) return handleErrorClient(res, 400, error.message);

        const [visitante, errorVisitante] = await createVisitanteService(body);

        if (errorVisitante) return handleErrorClient(res, 400, errorVisitante);

        handleSuccess(res, 201, "Visitante creado", visitante);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

// Update visitante
export async function updateVisitante(req, res) {
    try {
        const { id_visitante } = req.params;
        const { body } = req;

        const { error: bodyError } = visitanteBodyValidation.validate(body);
        if (bodyError) return handleErrorClient(res, 400, bodyError.message);

        const [visitante, errorVisitante] = await updateVisitanteService(
            { id: id_visitante, rut_visitante: body.rut_visitante },
            body
        );

        if (errorVisitante) return handleErrorClient(res, 404, errorVisitante);

        handleSuccess(res, 200, "Visitante actualizado", visitante);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteVisitante(req, res) {
    try {
        const { id_visitante } = req.params;
        const { rut_visitante } = req.query;

        const { error } = visitanteQueryValidation.validate({ id_visitante, rut_visitante });
        if (error) return handleErrorClient(res, 400, error.message);

        const [visitante, errorVisitante] = await deleteVisitanteService({
            id: id_visitante,
            rut_visitante,
        });

        if (errorVisitante) return handleErrorClient(res, 404, errorVisitante);

        handleSuccess(res, 200, "Visitante eliminado", visitante);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}