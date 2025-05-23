"use strict"
import { 
    createResidenteService, 
    deleteResidenteService,
    getResidenteService,
    getResidentesService,
    updateResidenteService,
} from "../services/residente.service.js"

import {
    residenteBodyValidation,
    residenteQueryValidation,
}   from "../validations/residente.validation.js"

import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js"

export async function getResidente(req, res) {
    try {
        const { rut_residente_num, rut_residente_dv, id_residente, email_residente } = req.query;

        const { error } = residenteQueryValidation.validate({ rut_residente_num, rut_residente_dv, id_residente, email_residente });
        if (error) return handleErrorClient(res, 400, error.message);

        const [residente, errorResidente] = await getResidenteService({
            rut_num: rut_residente_num,
            rut_dv: rut_residente_dv,
            id: id_residente,
            email: email_residente,
        });

        if (errorResidente) return handleErrorClient(res, 404, errorResidente);

        handleSuccess(res, 200, "Residente encontrado", residente);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}
export async function getResidentes(req, res) {
    try {
        const [residentes, errorResidentes] = await getResidentesService();

        if (errorResidentes) return handleErrorClient(res, 404, errorResidentes);

        residentes.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Residentes encontrados", residentes);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}
export async function createResidente(req, res) {
    try {
        const { body } = req;

        const { error } = residenteBodyValidation.validate(body);

        if (error) return handleErrorClient(res, 400, error.message);

        const [residente, errorResidente] = await createResidenteService(body);

        if (errorResidente) return handleErrorClient(res, 400, errorResidente);

        handleSuccess(res, 201, "Residente creado", residente);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function updateResidente(req, res) {
    try {
        const { id_residente } = req.params;
        const { rut_residente_num, rut_residente_dv } = req.body; 
        const { body } = req;

        const { error: queryError } = residenteQueryValidation.validate({ id_residente, rut_residente_num, rut_residente_dv });
        if (queryError) return handleErrorClient(res, 400, queryError.message);

        const { error: bodyError } = residenteBodyValidation.validate(body);
        if (bodyError) return handleErrorClient(res, 400, bodyError.message);

        const [residente, errorResidente] = await updateResidenteService(
            { id: id_residente, rut_num: rut_residente_num, rut_dv: rut_residente_dv },
            body
        );

        if (errorResidente) return handleErrorClient(res, 404, errorResidente);

        handleSuccess(res, 200, "Residente actualizado", residente);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteResidente(req, res) {
    try {
        const { id_residente } = req.params;
        const { rut_residente_num, rut_residente_dv } = req.query;

        const { error } = residenteQueryValidation.validate({ id_residente, rut_residente_num, rut_residente_dv });
        if (error) return handleErrorClient(res, 400, error.message);

        const [residente, errorResidente] = await deleteResidenteService({
            id: id_residente,
            rut_num: rut_residente_num,
            rut_dv: rut_residente_dv,
        });

        if (errorResidente) return handleErrorClient(res, 404, errorResidente);

        handleSuccess(res, 200, "Residente eliminado", residente);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}