import Residente from "../entity/residente.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getResidenteService(query) {
    try {
        const { rut_num, rut_dv, id, email } = query;

        const residenteRepository = AppDataSource.getRepository(Residente);

        const residenteFound = await residenteRepository.findOne({
            where: [
                id ? { id_residente: id } : undefined,
                (rut_num && rut_dv) ? { rut_residente_num: rut_num, rut_residente_dv: rut_dv } : undefined,
                email ? { email_residente: email } : undefined
            ].filter(Boolean),
        });

        if (!residenteFound) return [null, "Residente no encontrado"];

        return [residenteFound, null];
    } catch (error) {
        console.error("Error al obtener el residente:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getResidentesService() {
    try {
        const residenteRepository = AppDataSource.getRepository(Residente);

        const residentes = await residenteRepository.find();

        if (!residentes || residentes.length === 0) return [null, "No hay residentes"];

        return [residentes, null];
    } catch (error) {
        console.error("Error al obtener a los residentes:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updateResidenteService(query, body) {
    try {
        const { id, rut_num, rut_dv } = query;

        const residenteRepository = AppDataSource.getRepository(Residente);

        const residenteFound = await residenteRepository.findOne({
            where: [
                id ? { id_residente: id } : undefined,
                (rut_num && rut_dv) ? { rut_residente_num: rut_num, rut_residente_dv: rut_dv } : undefined
            ].filter(Boolean),
        });

        if (!residenteFound) return [null, "Residente no encontrado"];

        const existingResidente = await residenteRepository.findOne({
            where: {
                rut_residente_num: body.rut_residente_num,
                rut_residente_dv: body.rut_residente_dv
            },
        });

        if (existingResidente && existingResidente.id_residente !== residenteFound.id_residente) {
            return [null, "El rut ya está registrado"];
        }

        const updatedResidente = { ...residenteFound, ...body };

        await residenteRepository.save(updatedResidente);

        return [updatedResidente, null];
    } catch (error) {
        console.error("Error al actualizar el residente:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function createResidenteService(body) {
    try {
        const residenteRepository = AppDataSource.getRepository(Residente);

        const existingResidente = await residenteRepository.findOne({
            where: {
                rut_residente_num: body.rut_residente_num,
                rut_residente_dv: body.rut_residente_dv
            },
        });

        if (existingResidente) return [null, "El rut ya está registrado"];

        const newResidente = residenteRepository.create(body);

        await residenteRepository.save(newResidente);

        return [newResidente, null];
    } catch (error) {
        console.error("Error al crear el residente:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteResidenteService(query) {
    try {
        const { id, rut_num, rut_dv } = query;

        const residenteRepository = AppDataSource.getRepository(Residente);

        const residenteFound = await residenteRepository.findOne({
            where: [
                id ? { id_residente: id } : undefined,
                (rut_num && rut_dv) ? { rut_residente_num: rut_num, rut_residente_dv: rut_dv } : undefined
            ].filter(Boolean),
        });

        if (!residenteFound) return [null, "Residente no encontrado"];

        await residenteRepository.delete(residenteFound.id_residente);

        return [residenteFound, null];
    } catch (error) {
        console.error("Error al eliminar el residente:", error);
        return [null, "Error interno del servidor"];
    }
}

