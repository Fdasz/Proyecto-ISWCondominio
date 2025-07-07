"use strict";
import {
    createVisitaService,
    deleteVisitaService,
    searchVisitasService,
    updateVisitaService
} from "../services/visita.service.js";
import {
    visitaBodyValidation,
    visitaQueryValidation,
} from "../validations/visita.validation.js";
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess
} from "../handlers/responseHandlers.js";

export async function searchVisitas(req, res) {
    try {
        const { error } = visitaQueryValidation.validate(req.query);
        if (error) {
            return handleErrorClient(res, 400, error.message);
        }

        const [visitas, serviceError] = await searchVisitasService(req.query);
        if (serviceError) {
            return handleErrorServer(res, 500, serviceError);
        }

        if (visitas.length === 0) {
            return handleSuccess(res, 200, "No se encontraron visitas con los criterios de búsqueda.", []);
        }
        
        handleSuccess(res, 200, "Búsqueda de visitas exitosa.", visitas);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

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