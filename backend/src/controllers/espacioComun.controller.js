"use strict";
import {
    createEspacioComunService,
    deleteEspacioComunService,
    getEspaciosComunesService,
    updateEspacioComunService
} from "../services/espacioComun.service.js";
import {
    espacioComunBodyValidation,
    espacioComunQueryValidation
} from "../validations/espacioComun.validation.js";
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess
} from "../handlers/responseHandlers.js";

export async function getEspacioComun(req, res) {
    try {
        const { id_espacio, tipo_espacio_comun, descripcion_espacio_comun, estado_espacio_comun } = req.query;

        const { error } = espacioComunQueryValidation.validate({
            id_espacio,
            tipo_espacio_comun,
            descripcion_espacio_comun,
            estado_espacio_comun
        });

        if (error) return handleErrorClient(res, 400, error.message);

        const [espaciosComunes, errorEspaciosComunes] = await getEspaciosComunesService({
            id_espacio,
            tipo_espacio_comun,
            descripcion_espacio_comun,
            estado_espacio_comun
        });

        if (errorEspaciosComunes) return handleErrorClient(res, 404, errorEspaciosComunes);

        espaciosComunes.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Espacios comunes encontrados", espaciosComunes);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}


export async function createEspacioComun(req, res) {
    try {
        const { tipo_espacio_comun, descripcion_espacio_comun } = req.body;

        const { error } = espacioComunBodyValidation.validate({
            tipo_espacio_comun,
            descripcion_espacio_comun
        });

        if (error) return handleErrorClient(res, 400, error.message);

        const [espacioComun, errorEspacioComun] = await createEspacioComunService(req.body);

        if (errorEspacioComun) return handleErrorClient(res, 404, errorEspacioComun);

        handleSuccess(res, 201, "Espacio común creado", espacioComun);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}


export async function updateEspacioComun(req, res) {
    try {
        const { id_espacio } = req.params;
        const { tipo_espacio_comun, descripcion_espacio_comun, estado_espacio_comun } = req.body;

        const { error } = espacioComunBodyValidation.validate({
            id_espacio,
            tipo_espacio_comun,
            descripcion_espacio_comun,
            estado_espacio_comun
        });

        if (error) return handleErrorClient(res, 400, error.message);

        const [espacioComun, errorEspacioComun] = await updateEspacioComunService(id_espacio, req.body);

        if (errorEspacioComun) return handleErrorClient(res, 404, errorEspacioComun);

        handleSuccess(res, 200, "Espacio común actualizado", espacioComun);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function removeEspacioComun(req, res) {
    try {
        const { id_espacio } = req.params;

        const { error } = espacioComunQueryValidation.validate({ id_espacio });

        if (error) return handleErrorClient(res, 400, error.message);

        const [espacioComun, errorEspacioComun] = await deleteEspacioComunService(id_espacio);

        if (errorEspacioComun) return handleErrorClient(res, 404, errorEspacioComun);

        handleSuccess(res, 200, "Espacio común eliminado", espacioComun);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}
