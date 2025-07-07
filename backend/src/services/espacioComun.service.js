"use strict";
import espacioComun from "../entity/espacioComun.entity.js";
import { AppDataSource } from "../config/configDb.js"; 

export async function getEspaciosComunesService({
    id_espacio,
    tipo_espacio_comun,
    descripcion_espacio_comun,
    estado_espacio_comun
}) {
    try {
        const espacioComunRepository = AppDataSource.getRepository(espacioComun);

        const where = {};

        if (id_espacio) {
            where.id_espacio = id_espacio;
        }

        if (tipo_espacio_comun) {
            where.tipo_espacio_comun = tipo_espacio_comun;
        }

        if (descripcion_espacio_comun) {
            where.descripcion_espacio_comun = descripcion_espacio_comun;
        }

        if (estado_espacio_comun) {
            where.estado_espacio_comun = estado_espacio_comun;
        }

        const espaciosComunes = Object.keys(where).length === 0
            ? await espacioComunRepository.find()
            : await espacioComunRepository.find({ where });
        if (!espaciosComunes || espaciosComunes.length === 0) {
            return [null, "No hay espacios comunes que coincidan con los filtros"];
        }

        return [espaciosComunes, null];
    } catch (error) {
        console.error("Error al buscar espacios comunes:", error);
        return [null, "Error interno del servidor"];
    }
}


export async function updateEspacioComunService(id_espacio, body) {
    try {
        const espacioComunRepository = AppDataSource.getRepository(espacioComun);

        const espacioComun = await espacioComunRepository.findOneBy({ id_espacio });

        if (!espacioComun) return [null, "No existe el espacio común"];

        const updatedEspacioComun = await espacioComunRepository.save({
            ...espacioComun,
            ...body
        });

        return [updatedEspacioComun, null];
    } catch (error) {
        console.error("Error al actualizar el espacio común:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function createEspacioComunService(body) {
    try {
        const espacioComunRepository = AppDataSource.getRepository(espacioComun);

        const newEspacioComun = await espacioComunRepository.save(body);

        return [newEspacioComun, null];
    } catch (error) {
        console.error("Error al crear el espacio común:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteEspacioComunService(id_espacio) {
  try {
    const espacioComunRepository = AppDataSource.getRepository(espacioComun); 

    const espacioComunEncontrado = await espacioComunRepository.findOneBy({ id_espacio });

    if (!espacioComunEncontrado) {
      return [null, `Espacio común con id ${id_espacio} no encontrado`];
    }

    await espacioComunRepository.remove(espacioComunEncontrado);

    return [espacioComunEncontrado, null];
  } catch (error) {
    console.error("Error en deleteEspacioComunService:", error);
    return [null, "Error al eliminar el espacio común"];
  }
}
