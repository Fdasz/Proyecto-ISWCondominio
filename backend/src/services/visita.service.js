"use strict";
import Visita from "../entity/visita.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { Between, ILike } from "typeorm";

export async function searchVisitasService(queryParams) {
  try {
    const {
      rut_visitante,
      rut_usuario,
      nombre_visitante,
      nombre_usuario,
      patente_visitante,
      startDate,
      endDate,
    } = queryParams;

    const query = AppDataSource.getRepository(Visita)
      .createQueryBuilder("visita")
      .leftJoinAndSelect("visita.usuario", "usuario")
      .leftJoinAndSelect("visita.visitante", "visitante");

    if (rut_visitante) {
      query.andWhere("visita.rut_visitante = :rut_visitante", { rut_visitante });
    }
    if (rut_usuario) {
      query.andWhere("visita.rut_usuario = :rut_usuario", { rut_usuario });
    }
    if (nombre_visitante) {
      query.andWhere("visita.nombre_visitante ILIKE :nombre_visitante", {
        nombre_visitante: `%${nombre_visitante}%`,
      });
    }
    if (nombre_usuario) {
      query.andWhere("visita.nombre_usuario ILIKE :nombre_usuario", {
        nombre_usuario: `%${nombre_usuario}%`,
      });
    }
    // Search on the related 'visitante' entity for the patent
    if (patente_visitante) {
      query.andWhere("visitante.patente_visitante ILIKE :patente_visitante", {
        patente_visitante: `%${patente_visitante}%`,
      });
    }
    if (startDate && endDate) {
      query.andWhere("visita.fecha_visita BETWEEN :startDate AND :endDate", {
        startDate,
        endDate,
      });
    }

    const visitas = await query.getMany();
    return [visitas, null];
  } catch (error) {
    console.error("Error en el servicio de búsqueda de visitas:", error);
    return [null, "Error interno del servidor al realizar la búsqueda."];
  }
}

export async function createVisitaService(body) {
    try {
        const visitaRepository = AppDataSource.getRepository(Visita);
        const {
            rut_usuario,
            rut_visitante,
            nombre_usuario,
            nombre_visitante,
            patente_visitante,
            fecha_visita,
        } = body;

        const newVisita = visitaRepository.create({
            rut_usuario,
            rut_visitante,
            nombre_usuario,
            nombre_visitante,
            patente_visitante,
            fecha_visita,
        });

        await visitaRepository.save(newVisita);
        return [newVisita, null];
    } catch (error) {
        console.error("Error al crear la visita:", error);
        return [null, error.message || "Error interno del servidor al crear la visita."];
    }
}

export async function updateVisitaService(query, body) {
    try {
        const { id_visita } = query;
        const visitaRepository = AppDataSource.getRepository(Visita);

        const visitaFound = await visitaRepository.findOne({
            where: { id_visita }
        });

        if (!visitaFound) return [null, "Visita no encontrada"];

        // FIX: The mapping logic is no longer needed. The body fields match the entity.
        visitaRepository.merge(visitaFound, body);
        await visitaRepository.save(visitaFound);

        return [visitaFound, null];
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