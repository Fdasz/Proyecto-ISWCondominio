import ReservaEspacio from "../entity/reservaEspacio.entity.js";
import espacioComun from "../entity/espacioComun.entity.js";
import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js"; 

export async function createReservaEspacioService({
  fecha_reserva,
  hora_inicio,
  hora_fin,
  id_espacio,
  rut_usuario,
}) {
  try {
    const reservaEspacioRepository = AppDataSource.getRepository(ReservaEspacio);
    const espacioComunRepository = AppDataSource.getRepository(espacioComun);
    const userRepository = AppDataSource.getRepository(User);

    // 1. Buscar el espacio
    const espacio = await espacioComunRepository.findOneBy({ id_espacio });
    if (!espacio) return [null, "No existe el espacio común"];

    // 2. Buscar al usuario
    const usuario = await userRepository.findOneBy({ rut_usuario });
    if (!usuario) return [null, "No existe el usuario"];

    // 3. Crear la reserva
    const reservaEspacio = await reservaEspacioRepository.save({
      fecha_reserva,
      hora_inicio,
      hora_fin,
      espacio,
      usuario,
    });

    return [reservaEspacio, null];
  } catch (error) {
    console.error("Error al crear la reserva de espacio:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getReservasEspacioService(filters) {
  try {
    const reservaEspacioRepository = AppDataSource.getRepository(ReservaEspacio);

    const where = {};

    for (const key of [
      "id_reserva",
      "fecha_reserva",
      "hora_inicio",
      "hora_fin",
      "rut_usuario" 
    ]) {
      if (filters[key]) where[key] = filters[key];
    }

    if (filters.id_espacio) {
      where.espacio = { id_espacio: filters.id_espacio };
    }

    const reservasEspacio = await reservaEspacioRepository.find({
      where,
      relations: ["espacio", "usuario"],
    });

    if (!reservasEspacio.length) return [null, "No hay reservas que coincidan"];

    return [reservasEspacio, null];
  } catch (error) {
    console.error("Error al buscar reservas de espacio:", error);
    return [null, "Error interno del servidor"];
  }
}


export async function updateReservaEspacioService(id_reserva, body) {
  try {
    const reservaEspacioRepository = AppDataSource.getRepository(ReservaEspacio);

    const reserva = await reservaEspacioRepository.findOneBy({ id_reserva });
    if (!reserva) return [null, "No existe la reserva"];

    const updated = await reservaEspacioRepository.save({
      ...reserva,
      ...body
    });

    return [updated, null];
  } catch (error) {
    console.error("Error al actualizar la reserva:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteReservaEspacioService(id_reserva) {
  try {
    const reservaEspacioRepository = AppDataSource.getRepository(ReservaEspacio);

    const reserva = await reservaEspacioRepository.findOneBy({ id_reserva });
    if (!reserva) return [null, "No existe la reserva"];

    await reservaEspacioRepository.delete(id_reserva);

    return [reserva, null];
  } catch (error) {
    console.error("Error al eliminar la reserva:", error);
    return [null, "Error interno del servidor"];
  }
}
