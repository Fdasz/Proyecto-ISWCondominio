"use strict";
import User from "../entity/user.entity.js";
import { AppDataSource } from "./configDb.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";

async function createUsers() {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const count = await userRepository.count();
    if (count > 0) return;

    await Promise.all([
      userRepository.save(
        userRepository.create({
          nombre_usuario: "Diego Alexis Salazar Jara",
          rut_usuario: "21308770-3",
          email_usuario: "administrador2024@gmail.cl",
          password: await encryptPassword("admin1234"),
          rol: "administrador",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombre_usuario: "Diego Sebastián Ampuero Belmar",
          rut_usuario: "21151897-9",
          email_usuario: "usuario1.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "usuario",
        })
      ),
      userRepository.save(
        userRepository.create({
          nombre_usuario: "Juan Carlos Francisco Poveda",
          rut_usuario: "18549616-3",
          email_usuario: "portero2024@gmail.cl",
          password: await encryptPassword("portero1234"),
          rol: "portero",
        })
      ),
      userRepository.save(
        userRepository.create({
          nombre_usuario: "Alexander Benjamín Marcelo Carrasco Fuentes",
          rut_usuario: "20630735-8",
          email_usuario: "usuario2.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "usuario",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombre_usuario: "Pablo Andrés Castillo Fernández",
          rut_usuario: "20738450-K",
          email_usuario: "usuario3.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "usuario",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombre_usuario: "Felipe Andrés Henríquez Zapata",
          rut_usuario: "20976635-3",
          email_usuario: "usuario4.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "usuario",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombre_usuario: "Diego Alexis Meza Ortega",
          rut_usuario: "21172447-1",
          email_usuario: "usuario5.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "usuario",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombre_usuario: "Juan Pablo Rosas Martin",
          rut_usuario: "20738415-1",
          email_usuario: "usuario6.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "usuario",
        }),
      ),
    ]);
    console.log("* => Usuarios creados exitosamente");
  } catch (error) {
    console.error("Error al crear usuarios:", error);
  }
}

export { createUsers };