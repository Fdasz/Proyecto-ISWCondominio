"use strict";
import Joi from "joi";

// Query validation: for searching/filtering visitantes
export const visitanteQueryValidation = Joi.object({
  id_visitante: Joi.number().integer().positive().messages({
    "number.base": "El id debe ser un número",
    "number.integer": "El id debe ser un número entero",
    "number.positive": "El id debe ser un número positivo",
  }),
  rut_visitante: Joi.string()
    .min(9)
    .max(10)
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.min": "El rut debe tener como mínimo 9 caracteres.",
      "string.max": "El rut debe tener como máximo 12 caracteres.",
      "string.pattern.base":
        "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
    }),
  nombre_visitante: Joi.string()
    .min(15)
    .max(60)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
      "string.empty": "El nombre no puede estar vacío.",
      "string.base": "El nombre debe ser de tipo string.",
      "string.min": "El nombre debe tener como mínimo 15 caracteres.",
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
    "rut_visitante_num",
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
    .min(9)
    .max(10)
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.min": "El rut debe tener como mínimo 9 caracteres.",
      "string.max": "El rut debe tener como máximo 12 caracteres.",
      "string.pattern.base":
        "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
    }),
  nombre_visitante: Joi.string()
    .min(15)
    .max(60)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
      "string.empty": "El nombre no puede estar vacío.",
      "string.base": "El nombre debe ser de tipo string.",
      "string.min": "El nombre debe tener como mínimo 15 caracteres.",
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
  .min(1)
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
  });
