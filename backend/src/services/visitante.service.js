"use strict";
import Visitante from "../entity/visitante.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { ILike } from "typeorm";

export async function getVisitanteService(query) {
  try {
    const { rut_visitante, id_visitante, nombre_visitante } = query;
    const visitanteRepository = AppDataSource.getRepository(Visitante);

    const whereConditions = [];
    if (id_visitante) {
      whereConditions.push({ id_visitante: id_visitante });
    }
    if (rut_visitante) {
      whereConditions.push({ rut_visitante: rut_visitante });
    }
    if (nombre_visitante) {
      whereConditions.push({ nombre_visitante: ILike(`%${nombre_visitante}%`) });
    }

    if (whereConditions.length === 0) {
      return [null, "Debe proporcionar al menos un parámetro de búsqueda"];
    }

    if (nombre_visitante) {
        const visitantesFound = await visitanteRepository.find({
            where: whereConditions,
        });
        if (!visitantesFound || visitantesFound.length === 0) return [null, "Visitante no encontrado"];
        return [visitantesFound, null];
    } else {
        const visitanteFound = await visitanteRepository.findOne({
            where: whereConditions,
        });
        if (!visitanteFound) return [null, "Visitante no encontrado"];
        return [visitanteFound, null];
    }

  } catch (error) {
    console.error("Error al obtener el visitante:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getVisitantesService() {
    try {
        const visitanteRepository = AppDataSource.getRepository(Visitante);

        const visitantes = await visitanteRepository.find();

        if (!visitantes || visitantes.length === 0) return [null, "No hay visitantes"];

        return [visitantes, null];
    } catch (error) {
        console.error("Error al obtener a los visitantes:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updateVisitanteService(query, body) {
    try {
        const { id, rut_visitante } = query;

        const visitanteRepository = AppDataSource.getRepository(Visitante);

        const visitanteFound = await visitanteRepository.findOne({
            where: [
                id ? { id_visitante: id } : undefined,
                rut_visitante ? { rut_visitante } : undefined
            ].filter(Boolean),
        });

        if (!visitanteFound) return [null, "Visitante no encontrado"];

        const existingVisitante = await visitanteRepository.findOne({
            where: {
                rut_visitante: body.rut_visitante
            },
        });

        if (existingVisitante && existingVisitante.id_visitante !== visitanteFound.id_visitante) {
            return [null, "El rut ya está registrado"];
        }

        const updatedVisitante = { ...visitanteFound, ...body };

        await visitanteRepository.save(updatedVisitante);

        return [updatedVisitante, null];
    } catch (error) {
        console.error("Error al actualizar el visitante:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function createVisitanteService(body) {
  try {
    const visitanteRepository = AppDataSource.getRepository(Visitante);
    const { rut_visitante, nombre_visitante, patente_visitante } = body;

    const existingRut = await visitanteRepository.findOne({
      where: { rut_visitante: rut_visitante },
    });

    if (existingRut) {
      return [null, "El rut ya está registrado"];
    }

    const newVisitante = visitanteRepository.create({
      rut_visitante,
      nombre_visitante,
      patente_visitante,
    });

    await visitanteRepository.save(newVisitante);

    return [newVisitante, null];
  } catch (error) {
    console.error("Error al crear el visitante:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteVisitanteService(query) {
    try {
        const { id, rut_visitante } = query;

        const visitanteRepository = AppDataSource.getRepository(Visitante);

        const visitanteFound = await visitanteRepository.findOne({
            where: [
                id ? { id_visitante: id } : undefined,
                rut_visitante ? { rut_visitante } : undefined
            ].filter(Boolean),
        });

        if (!visitanteFound) return [null, "Visitante no encontrado"];

        await visitanteRepository.delete(visitanteFound.id_visitante);

        return [visitanteFound, null];
    } catch (error) {
        console.error("Error al eliminar el visitante:", error);
        return [null, "Error interno del servidor"];
    }
}

