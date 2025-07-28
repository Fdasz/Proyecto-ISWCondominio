"use strict";
import Joi from "joi";
import { validarRutCompleto } from "../helpers/rut.helper.js";

export const visitanteQueryValidation = Joi.object({
  id_visitante: Joi.number().integer().positive().messages({
    "number.base": "El id debe ser un número",
    "number.integer": "El id debe ser un número entero",
    "number.positive": "El id debe ser un número positivo",
  }),
  rut_visitante: Joi.string()
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
  nombre_visitante: Joi.string()
    .min(1)
    .max(60)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
      "string.empty": "El nombre no puede estar vacío.",
      "string.base": "El nombre debe ser de tipo string.",
      "string.min": "El nombre debe tener como mínimo 1 caracter.",
      "string.max": "El nombre debe tener como máximo 60 caracteres.",
      "string.pattern.base": "El nombre solo puede contener letras y espacios.",
    }),
  
})
  .or(
    "id_visitante",
    "rut_visitante",
    "nombre_visitante",
  )
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar al menos un parámetro de búsqueda.",
  });

export const visitanteBodyValidation = Joi.object({
  rut_visitante: Joi.string()
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
  nombre_visitante: Joi.string()
    .min(1)
    .max(60)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .required()
    .messages({
      "string.empty": "El nombre no puede estar vacío.",
      "string.base": "El nombre debe ser de tipo string.",
      "string.min": "El nombre debe tener como mínimo 1 caracter.",
      "string.max": "El nombre debe tener como máximo 60 caracteres.",
      "string.pattern.base": "El nombre solo puede contener letras y espacios.",
      "any.required": "El nombre es un campo obligatorio.",
    }),
})
  .min(1)
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
  });

export const visitanteUpdateValidation = Joi.object({
  rut_visitante: Joi.string()
    .min(9)
    .max(12)
    .pattern(/^\d{7,8}-[\dkK]$/)
    .custom((value, helpers) => {
      if (!validarRutCompleto(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "RUT validation")
    .optional()
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.min": "El rut debe tener como mínimo 9 caracteres.",
      "string.max": "El rut debe tener como máximo 12 caracteres.",
      "string.pattern.base": "Formato rut inválido, debe ser sin puntos y con guión.",
      "any.invalid": "El RUT ingresado no es válido.",
    }),
  nombre_visitante: Joi.string()
    .min(1)
    .max(60)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .optional()
    .messages({
      "string.empty": "El nombre no puede estar vacío.",
      "string.base": "El nombre debe ser de tipo string.",
      "string.min": "El nombre debe tener como mínimo 1 caracter.",
      "string.max": "El nombre debe tener como máximo 60 caracteres.",
      "string.pattern.base": "El nombre solo puede contener letras y espacios.",
    }),
})
  .min(1)
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.min": "Debe proporcionar al menos un campo para actualizar.",
  });
