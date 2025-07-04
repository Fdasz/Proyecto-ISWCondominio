import Visita from "../entity/visita.entity.js";
import { AppDataSource } from "../config/configDb.js";


// Buscar visitas con filtros
export async function searchVisitasService({
    startDate,
    endDate,
    nombre_visitante,
    nombre_residente,
    rut_visitante,
    rut_usuario
}) {
    try {
        const visitaRepository = AppDataSource.getRepository(Visita);

        const where = {};

        if (startDate && endDate) {
            where.fecha_visita = { $gte: startDate, $lte: endDate };
        }
        if (rut_visitante) {
            where.rut_visitante = rut_visitante;
        }
        if (rut_usuario) {
            where.rut_usuario = rut_usuario;
        }
        if (nombre_visitante) {
            where.nombre_visitante = nombre_visitante;
        }
        if (nombre_residente) {
            where.nombre_residente = nombre_residente;
        }

        const visitas = await visitaRepository.find({ where });

        if (!visitas || visitas.length === 0) return [[], "No hay visitas encontradas"];

        return [visitas, null];
    } catch (error) {
        console.error("Error al buscar visitas:", error);
        return [null, "Error interno del servidor"];
    }
}

// Crear visita
export async function createVisitaService(body) {
    try {
        const visitaRepository = AppDataSource.getRepository(Visita);

        const newVisita = visitaRepository.create(body);
        await visitaRepository.save(newVisita);

        return [newVisita, null];
    } catch (error) {
        console.error("Error al crear la visita:", error);
        return [null, "Error interno del servidor"];
    }
}

// Actualizar visita
export async function updateVisitaService(query, body) {
    try {
        const { id_visita } = query;
        const visitaRepository = AppDataSource.getRepository(Visita);

        const visitaFound = await visitaRepository.findOne({
            where: { id_visita }
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

// Eliminar visita
export async function deleteVisitaService(query) {
    try {
        const { id_visita } = query;
        const visitaRepository = AppDataSource.getRepository(Visita);

        const visitaFound = await visitaRepository.findOne({
            where: { id_visita }
        });

        if (!visitaFound) return [null, "Visita no encontrada"];

        await visitaRepository.delete(id_visita);

        return [visitaFound, null];
    } catch (error) {
        console.error("Error al eliminar la visita:", error);
        return [null, "Error interno del servidor"];
    }
}