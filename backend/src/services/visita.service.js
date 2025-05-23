import Visita from "../entity/visita.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { Between } from "typeorm";


export async function searchVisitasService({
    startDate,
    endDate,
    nombre_visitante,
    nombre_residente,
    rut_visitante_num,
    rut_visitante_dv,
    rut_residente_num,
    rut_residente_dv
}) {
    try {
        const visitaRepository = AppDataSource.getRepository(Visita);

        const where = {};

        if (startDate && endDate) {
            where.fecha_visita = Between(startDate, endDate);
        } else if (startDate) {
            where.fecha_visita = startDate;
        } else if (endDate) {
            where.fecha_visita = endDate;
        }

        if (rut_visitante_num && rut_visitante_dv) {
            where.rut_visitante_num = rut_visitante_num;
            where.rut_visitante_dv = rut_visitante_dv;
        }

        if (nombre_visitante) {
            where.nombre_visitante = nombre_visitante;
        }

        if (rut_residente_num && rut_residente_dv) {
            where.rut_residente_num = rut_residente_num;
            where.rut_residente_dv = rut_residente_dv;
        }

        if (nombre_residente) {
            where.nombre_residente = nombre_residente;
        }

        const visitas = await visitaRepository.find({ where });

        if (!visitas || visitas.length === 0) return [null, "No hay visitas que coincidan con los filtros"];

        return [visitas, null];
    } catch (error) {
        console.error("Error al buscar visitas:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updateVisitaService(query, body) {
    try {
        const { rut_visitante_num, rut_visitante_dv, rut_residente_num, rut_residente_dv, fecha_visita } = query;

        const visitaRepository = AppDataSource.getRepository(Visita);

        const visitaFound = await visitaRepository.findOne({
            where: {
                rut_visitante_num,
                rut_visitante_dv,
                rut_residente_num,
                rut_residente_dv,
                fecha_visita
            },
        });

        if (!visitaFound) return [null, "Visita no encontrada"];

        const updatedVisita = { ...visitaFound, ...body };

        await visitaRepository.save(updatedVisita);

        return [updatedVisita, null];
    } catch (error) {
        console.error("Error al actualizar la visita:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteVisitaService(query) {
    try {
        const { rut_visitante_num, rut_visitante_dv, rut_residente_num, rut_residente_dv, fecha_visita } = query;

        const visitaRepository = AppDataSource.getRepository(Visita);

        const visitaFound = await visitaRepository.findOne({
            where: {
                rut_visitante_num,
                rut_visitante_dv,
                rut_residente_num,
                rut_residente_dv,
                fecha_visita
            },
        });

        if (!visitaFound) return [null, "Visita no encontrada"];

        await visitaRepository.remove(visitaFound);

        return [visitaFound, null];
    } catch (error) {
        console.error("Error al eliminar la visita:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function createVisitaService(body) {
    try {
        const visitaRepository = AppDataSource.getRepository(Visita);

        const existingVisita = await visitaRepository.findOne({
            where: {
                rut_visitante_num: body.rut_visitante_num,
                rut_visitante_dv: body.rut_visitante_dv,
                rut_residente_num: body.rut_residente_num,
                rut_residente_dv: body.rut_residente_dv,
                fecha_visita: body.fecha_visita
            },
        });

        if (existingVisita) return [null, "La visita ya existe"];

        const newVisita = visitaRepository.create(body);

        await visitaRepository.save(newVisita);

        return [newVisita, null];
    } catch (error) {
        console.error("Error al crear la visita:", error);
        return [null, "Error interno del servidor"];
    }
}