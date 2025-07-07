"use strict";
import Joi from "joi";

export const visitanteQueryValidation = Joi.object({
  id_visitante: Joi.number().integer().positive().messages({
    "number.base": "El id debe ser un número",
    "number.integer": "El id debe ser un número entero",
    "number.positive": "El id debe ser un número positivo",
  }),
  rut_visitante: Joi.string()
    .pattern(
      /^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/,
    )
    .min(9)
    .max(12)
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.min": "El rut debe tener como mínimo 9 caracteres.",
      "string.max": "El rut debe tener como máximo 12 caracteres.",
      "string.pattern.base":
        "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
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
  patente_visitante: Joi.string()
    .max(9)
    .pattern(/^[A-Z0-9\-]+$/i)
    .messages({
      "string.max": "La patente debe tener como máximo 9 caracteres.",
      "string.pattern.base":
        "La patente solo puede contener letras, números y guiones.",
    }),
})
  .or(
    "id_visitante",
    "rut_visitante",
    "nombre_visitante",
    "patente_visitante",
  )
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar al menos un parámetro de búsqueda.",
  });

export const visitanteBodyValidation = Joi.object({
  rut_visitante: Joi.string()
    .pattern(
      /^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/,
    )
    .min(9)
    .max(12)
    .required()
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.min": "El rut debe tener como mínimo 9 caracteres.",
      "string.max": "El rut debe tener como máximo 12 caracteres.",
      "string.pattern.base":
        "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
      "any.required": "El rut es un campo obligatorio.",
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
  patente_visitante: Joi.string()
    .max(9)
    .pattern(/^[A-Z0-9\-]+$/i)
    .allow(null, "")
    .messages({
      "string.max": "La patente debe tener como máximo 9 caracteres.",
      "string.pattern.base":
        "La patente solo puede contener letras, números y guiones.",
    }),
})
  .min(1)
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
  });
