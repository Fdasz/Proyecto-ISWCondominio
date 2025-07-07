"use strict";
import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { comparePassword, encryptPassword } from "../helpers/bcrypt.helper.js";
import { ILike } from "typeorm"; 

export async function getUserService(query) {
  try {
    const { rut_usuario, id_usuario, email_usuario, nombre_usuario } = query;
    const userRepository = AppDataSource.getRepository(User);

    const whereConditions = [];
    if (id_usuario) {
      whereConditions.push({ id_usuario: id_usuario });
    }
    if (rut_usuario) {
      whereConditions.push({ rut_usuario: rut_usuario });
    }
    if (email_usuario) {
      whereConditions.push({ email_usuario: email_usuario });
    }
    if (nombre_usuario) {
      whereConditions.push({ nombre_usuario: ILike(`%${nombre_usuario}%`) });
    }

    if (whereConditions.length === 0) {
      return [null, "Debe proporcionar al menos un parámetro de búsqueda"];
    }

    if (nombre_usuario) {
        const usersFound = await userRepository.find({
            where: whereConditions,
            select: ["id_usuario", "nombre_usuario", "rut_usuario", "email_usuario", "rol"] // Exclude password
        });
        if (!usersFound || usersFound.length === 0) return [null, "Usuario no encontrado"];
        return [usersFound, null];
    } else {
        const userFound = await userRepository.findOne({
            where: whereConditions,
        });
        if (!userFound) return [null, "Usuario no encontrado"];
        const { password, ...userData } = userFound;
        return [userData, null];
    }

  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getUsersService() {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    if (!users || users.length === 0) return [null, "No hay usuarios"];

    const usersData = users.map(({ password, ...user }) => user);

    return [usersData, null];
  } catch (error) {
    console.error("Error al obtener a los usuarios:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateUserService(query, body) {
  try {
    const { id_usuario, rut_usuario, email_usuario } = query;
    const userRepository = AppDataSource.getRepository(User);

    const userFound = await userRepository.findOne({
      where: [
        { id_usuario: id_usuario },
        { rut_usuario: rut_usuario },
        { email_usuario: email_usuario }
      ],
    });

    if (!userFound) {
      return [null, "Usuario no encontrado"];
    }

    if (body.rut_usuario && body.rut_usuario !== userFound.rut_usuario) {
      const existingRutUser = await userRepository.findOne({
        where: { rut_usuario: body.rut_usuario }
      });
      
      if (existingRutUser) {
        return [null, "El RUT ingresado ya está en uso por otro usuario"];
      }
    }

    if (body.email_usuario && body.email_usuario !== userFound.email_usuario) {
      const existingEmailUser = await userRepository.findOne({
        where: { email_usuario: body.email_usuario }
      });
      
      if (existingEmailUser) {
        return [null, "El email ingresado ya está en uso por otro usuario"];
      }
    }

    if (body.password) {
      const isPasswordValid = await comparePassword(
        body.password,
        userFound.password
      );
      
      if (!isPasswordValid) {
        return [null, "La contraseña actual no es válida"];
      }
    }

    const updateData = {
      nombre_usuario: body.nombre_usuario || userFound.nombre_usuario,
      rut_usuario: body.rut_usuario || userFound.rut_usuario,
      email_usuario: body.email_usuario || userFound.email_usuario,
      rol: body.rol || userFound.rol,
      updatedAt: new Date()
    };

    if (body.newPassword && body.newPassword.trim() !== "") {
      updateData.password = await encryptPassword(body.newPassword);
    }

    await userRepository.update(
      { id_usuario: userFound.id_usuario },
      updateData
    );

    const updatedUser = await userRepository.findOne({
      where: { id_usuario: userFound.id_usuario },
      select: ["id_usuario", "nombre_usuario", "rut_usuario", "email_usuario", "rol", "createdAt", "updatedAt"]
    });

    if (!updatedUser) {
      return [null, "No se pudo recuperar el usuario actualizado"];
    }

    return [updatedUser, null];

  } catch (error) {
    console.error("Error en updateUserService:", error);
    return [null, "Error interno al procesar la actualización"];
  }
}

export async function deleteUserService(query) {
  try {
    const { id_usuario, rut_usuario, email_usuario } = query;

    const userRepository = AppDataSource.getRepository(User);

    const userFound = await userRepository.findOne({
      where: [
        { id_usuario: id_usuario },
        { rut_usuario: rut_usuario },
        { email_usuario: email_usuario }
      ],
    });

    if (!userFound) return [null, "Usuario no encontrado"];

    if (userFound.rol === "administrador") {
      return [null, "No se puede eliminar un usuario con rol de administrador"];
    }

    const userDeleted = await userRepository.remove(userFound);

    const { password, ...dataUser } = userDeleted;

    return [dataUser, null];
  } catch (error) {
    console.error("Error al eliminar un usuario:", error);
    return [null, "Error interno del servidor"];
  }
}