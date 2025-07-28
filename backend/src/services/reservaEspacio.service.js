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

    // 3. Verificar conflictos de horario
    const conflicto = await reservaEspacioRepository.findOne({
      where: {
        espacio: { id_espacio },
        fecha_reserva,
      },
      relations: ["espacio"],
    });

    if (conflicto) {
      // Verificar solapamiento de horarios
      const horaInicioExistente = conflicto.hora_inicio;
      const horaFinExistente = conflicto.hora_fin;
      
      if (
        (hora_inicio >= horaInicioExistente && hora_inicio < horaFinExistente) ||
        (hora_fin > horaInicioExistente && hora_fin <= horaFinExistente) ||
        (hora_inicio <= horaInicioExistente && hora_fin >= horaFinExistente)
      ) {
        return [null, "Ya existe una reserva en ese horario para el espacio seleccionado"];
      }
    }

    // 4. Crear la reserva
    const reservaEspacio = await reservaEspacioRepository.save({
      fecha_reserva,
      hora_inicio,
      hora_fin,
      espacio,
      usuario,
    });

    // 5. Retornar con relaciones cargadas
    const reservaCompleta = await reservaEspacioRepository.findOne({
      where: { id_reserva: reservaEspacio.id_reserva },
      relations: ["espacio", "usuario"],
      select: {
        id_reserva: true,
        fecha_reserva: true,
        hora_inicio: true,
        hora_fin: true,
        espacio: {
          id_espacio: true,
          tipo_espacio_comun: true,
          descripcion_espacio_comun: true,
        },
        usuario: {
          nombre_usuario: true,
          rut_usuario: true
        }
      }
    });

    return [reservaCompleta, null];
  } catch (error) {
    console.error("Error al crear la reserva de espacio:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getReservasEspacioService(filters) {
  try {
    const reservaEspacioRepository = AppDataSource.getRepository(ReservaEspacio);

    const queryBuilder = reservaEspacioRepository
      .createQueryBuilder("reserva")
      .leftJoinAndSelect("reserva.espacio", "espacio")
      .leftJoinAndSelect("reserva.usuario", "usuario")
      .select([
        "reserva.id_reserva",
        "reserva.fecha_reserva", 
        "reserva.hora_inicio",
        "reserva.hora_fin",
        "espacio.id_espacio",
        "espacio.tipo_espacio_comun", 
        "espacio.descripcion_espacio_comun",
        "usuario.nombre_usuario",
        "usuario.rut_usuario",
        "usuario.email_usuario",
        "usuario.rut_usuario"
      ]);

    if (filters.id_reserva) {
      queryBuilder.andWhere("reserva.id_reserva = :id_reserva", {
        id_reserva: filters.id_reserva,
      });
    }

    if (filters.fecha_reserva) {
      queryBuilder.andWhere("reserva.fecha_reserva = :fecha_reserva", {
        fecha_reserva: filters.fecha_reserva,
      });
    }

    if (filters.hora_inicio) {
      queryBuilder.andWhere("reserva.hora_inicio = :hora_inicio", {
        hora_inicio: filters.hora_inicio,
      });
    }

    if (filters.hora_fin) {
      queryBuilder.andWhere("reserva.hora_fin = :hora_fin", {
        hora_fin: filters.hora_fin,
      });
    }

    if (filters.id_espacio) {
      queryBuilder.andWhere("espacio.id_espacio = :id_espacio", {
        id_espacio: filters.id_espacio,
      });
    }

    if (filters.rut_usuario) {
      queryBuilder.andWhere("usuario.rut_usuario = :rut_usuario", {
        rut_usuario: filters.rut_usuario,
      });
    }

    const reservasEspacio = await queryBuilder.getMany();

    return [reservasEspacio, null];
  } catch (error) {
    console.error("Error al buscar reservas de espacio:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateReservaEspacioService(id_reserva, body) {
  try {
    const reservaEspacioRepository = AppDataSource.getRepository(ReservaEspacio);
    const espacioComunRepository = AppDataSource.getRepository(espacioComun);

    // 1. Verificar que la reserva existe
    const reserva = await reservaEspacioRepository.findOne({
      where: { id_reserva },
      relations: ["espacio", "usuario"],
    });
    
    if (!reserva) return [null, "No existe la reserva"];

    // 2. Verificar si se está intentando actualizar el usuario (no permitido)
    if (body.rut_usuario) {
      return [null, "No se puede modificar el usuario de una reserva existente"];
    }

    // 3. Si se actualiza el espacio, verificar que existe
    if (body.id_espacio && body.id_espacio !== reserva.espacio.id_espacio) {
      const espacio = await espacioComunRepository.findOneBy({ 
        id_espacio: body.id_espacio 
      });
      if (!espacio) return [null, "No existe el espacio común"];
      body.espacio = espacio;
      delete body.id_espacio; // Remover el ID del body
    }

    // 4. Verificar conflictos de horario si se cambia fecha/hora/espacio
    if (body.fecha_reserva || body.hora_inicio || body.hora_fin || body.espacio) {
      const espacioId = body.espacio ? body.espacio.id_espacio : reserva.espacio.id_espacio;
      const fechaReserva = body.fecha_reserva || reserva.fecha_reserva;
      const horaInicio = body.hora_inicio || reserva.hora_inicio;
      const horaFin = body.hora_fin || reserva.hora_fin;

      const conflicto = await reservaEspacioRepository
        .createQueryBuilder("reserva")
        .leftJoinAndSelect("reserva.espacio", "espacio")
        .where("espacio.id_espacio = :espacioId", { espacioId })
        .andWhere("reserva.fecha_reserva = :fechaReserva", { fechaReserva })
        .andWhere("reserva.id_reserva != :id_reserva", { id_reserva })
        .getOne();

      if (conflicto) {
        const horaInicioExistente = conflicto.hora_inicio;
        const horaFinExistente = conflicto.hora_fin;

        if (
          (horaInicio >= horaInicioExistente && horaInicio < horaFinExistente) ||
          (horaFin > horaInicioExistente && horaFin <= horaFinExistente) ||
          (horaInicio <= horaInicioExistente && horaFin >= horaFinExistente)
        ) {
          return [null, "Ya existe una reserva en ese horario para el espacio seleccionado"];
        }
      }
    }

    // 5. Actualizar la reserva (sin modificar el usuario)
    const updated = await reservaEspacioRepository.save({
      ...reserva,
      ...body,
    });

    // 6. Retornar con relaciones cargadas
    const reservaActualizada = await reservaEspacioRepository.findOne({
      where: { id_reserva: updated.id_reserva },
      relations: ["espacio", "usuario"],
      select: {
        id_reserva: true,
        fecha_reserva: true,
        hora_inicio: true,
        hora_fin: true,
        espacio: {
          id_espacio: true,
          tipo_espacio_comun: true,
          descripcion_espacio_comun: true,
        },
        usuario: {
          nombre_usuario: true,
          rut_usuario: true
        }
      }
    });

    return [reservaActualizada, null];
  } catch (error) {
    console.error("Error al actualizar la reserva:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteReservaEspacioService(id_reserva) {
  try {
    const reservaEspacioRepository = AppDataSource.getRepository(ReservaEspacio);

    // 1. Verificar que la reserva existe y obtener datos antes de eliminar
    const reserva = await reservaEspacioRepository.findOne({
      where: { id_reserva },
      relations: ["espacio", "usuario"],
      select: {
        id_reserva: true,
        fecha_reserva: true,
        hora_inicio: true,
        hora_fin: true,
        espacio: {
          id_espacio: true,
          tipo_espacio_comun: true,
          descripcion_espacio_comun: true,
        },
        usuario: {
          nombre_usuario: true,
          rut_usuario: true
        }
      }
    });
    
    if (!reserva) return [null, "No existe la reserva"];

    // 2. Eliminar la reserva
    await reservaEspacioRepository.delete({ id_reserva });

    return [reserva, null];
  } catch (error) {
    console.error("Error al eliminar la reserva:", error);
    return [null, "Error interno del servidor"];
  }
}