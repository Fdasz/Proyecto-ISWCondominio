"use strict";
import Joi from "joi";
import { validarRutCompleto } from "../helpers/rut.helper.js";

const domainEmailValidator = (value, helper) => {
  if (!value.endsWith("@gmail.cl")) {
    return helper.message(
      "El correo electrónico debe ser del dominio @gmail.cl",
    );
  }
  return value;
};

export const userQueryValidation = Joi.object({
  id_usuario: Joi.number().integer().positive().messages({
    "number.base": "El id debe ser un número.",
    "number.integer": "El id debe ser un número entero.",
    "number.positive": "El id debe ser un número positivo.",
  }),
  email_usuario: Joi.string()
    .min(15)
    .max(35)
    .email()
    .messages({
      "string.empty": "El correo electrónico no puede estar vacío.",
      "string.base": "El correo electrónico debe ser de tipo string.",
      "string.email": "El correo electrónico debe finalizar en @gmail.cl.",
      "string.min":
        "El correo electrónico debe tener como mínimo 15 caracteres.",
      "string.max":
        "El correo electrónico debe tener como máximo 35 caracteres.",
    })
    .custom(domainEmailValidator, "Validación dominio email"),
  rut_usuario: Joi.string()
    .min(9)
    .max(12)
    .pattern(/^\d{7,8}-[\dkK]$/)
    .custom((value, helpers) => {
      if (!validarRutCompleto(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "RUT validation")
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.min": "El rut debe tener como mínimo 9 caracteres.",
      "string.max": "El rut debe tener como máximo 12 caracteres.",
      "string.pattern.base": "Formato rut inválido, debe ser sin puntos y con guión.",
      "any.invalid": "El RUT ingresado no es válido.",
    }),
  nombre_usuario: Joi.string()
    .min(1)
    .max(255)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
      "string.base": "El nombre debe ser de tipo string.",
      "string.min": "El nombre de búsqueda debe tener como mínimo 1 caracter.",
      "string.max": "El nombre de búsqueda debe tener como máximo 50 caracteres.",
      "string.pattern.base": "El nombre solo puede contener letras y espacios.",
    }),
  rol: Joi.string().min(4).max(15).messages({
    "string.base": "El rol debe ser de tipo string.",
    "string.min": "El rol debe tener como mínimo 4 caracteres.",
    "string.max": "El rol debe tener como máximo 15 caracteres.",
  }),
})
  .or("id_usuario", "email_usuario", "rut_usuario", "nombre_usuario")
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing":
      "Debes proporcionar al menos un parámetro: id_usuario, email_usuario, rut_usuario o nombre_usuario.",
  });

export const userBodyValidation = Joi.object({
  nombre_usuario: Joi.string()
    .min(15)
    .max(50)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
      "string.empty": "El nombre completo no puede estar vacío.",
      "string.base": "El nombre completo debe ser de tipo string.",
      "string.min": "El nombre completo debe tener como mínimo 15 caracteres.",
      "string.max": "El nombre completo debe tener como máximo 50 caracteres.",
      "string.pattern.base":
        "El nombre completo solo puede contener letras y espacios.",
    }),
  email_usuario: Joi.string()
    .min(15)
    .max(60)
    .email()
    .messages({
      "string.empty": "El correo electrónico no puede estar vacío.",
      "string.base": "El correo electrónico debe ser de tipo string.",
      "string.email": "El correo electrónico debe finalizar en @gmail.cl.",
      "string.min":
        "El correo electrónico debe tener como mínimo 15 caracteres.",
      "string.max":
        "El correo electrónico debe tener como máximo 35 caracteres.",
    })
    .custom(domainEmailValidator, "Validación dominio email"),
  password: Joi.string()
    .min(8)
    .max(26)
    .pattern(/^[a-zA-Z0-9]+$/)
    .messages({
      "string.empty": "La contraseña no puede estar vacía.",
      "string.base": "La contraseña debe ser de tipo string.",
      "string.min": "La contraseña debe tener como mínimo 8 caracteres.",
      "string.max": "La contraseña debe tener como máximo 26 caracteres.",
      "string.pattern.base":
        "La contraseña solo puede contener letras y números.",
    }),
  newPassword: Joi.string()
    .min(8)
    .max(26)
    .allow("")
    .pattern(/^[a-zA-Z0-9]+$/)
    .messages({
      "string.empty": "La nueva contraseña no puede estar vacía.",
      "string.base": "La nueva contraseña debe ser de tipo string.",
      "string.min": "La nueva contraseña debe tener como mínimo 8 caracteres.",
      "string.max": "La nueva contraseña debe tener como máximo 26 caracteres.",
      "string.pattern.base":
        "La nueva contraseña solo puede contener letras y números.",
    }),
  rut_usuario: Joi.string()
    .min(9)
    .max(12)
    .pattern(/^\d{7,8}-[\dkK]$/)
    .custom((value, helpers) => {
      if (!validarRutCompleto(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "RUT validation")
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.min": "El rut debe tener como mínimo 9 caracteres.",
      "string.max": "El rut debe tener como máximo 12 caracteres.",
      "string.pattern.base": "Formato rut inválido, debe ser sin puntos y con guión.",
      "any.invalid": "El RUT ingresado no es válido.",
    }),
})
  .or(
    "nombre_usuario",
    "email_usuario",
    "password",
    "newPassword",
    "rut_usuario",
    "rol",
  )
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing":
      "Debes proporcionar al menos un campo: nombre_usuario, email_usuario, password, newPassword, rut_usuario o rol.",
  });
