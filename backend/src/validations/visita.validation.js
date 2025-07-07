"use strict";
import Joi from "joi";

export const visitaQueryValidation = Joi.object({
  rut_visitante: Joi.string()
    .min(9)
    .max(12)
    .pattern(
      /^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/,
    )
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.min": "El rut debe tener como mínimo 9 caracteres.",
      "string.max": "El rut debe tener como máximo 12 caracteres.",
      "string.pattern.base":
        "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
    }),
  rut_usuario: Joi.string()
    .min(9)
    .max(12)
    .pattern(
      /^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/,
    )
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.min": "El rut debe tener como mínimo 9 caracteres.",
      "string.max": "El rut debe tener como máximo 12 caracteres.",
      "string.pattern.base":
        "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
    }),
  nombre_visitante: Joi.string()
    .min(3)
    .max(60)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
      "string.empty": "El nombre del visitante no puede estar vacío.",
      "string.base": "El nombre del visitante debe ser de tipo string.",
      "string.min":
        "El nombre del visitante debe tener como mínimo 15 caracteres.",
      "string.max":
        "El nombre del visitante debe tener como máximo 60 caracteres.",
      "string.pattern.base":
        "El nombre del visitante solo puede contener letras y espacios.",
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
  nombre_usuario: Joi.string()
    .min(3)
    .max(60)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
      "string.empty": "El nombre del residente no puede estar vacío.",
      "string.base": "El nombre del residente debe ser de tipo string.",
      "string.min":
        "El nombre del residente debe tener como mínimo 15 caracteres.",
      "string.max":
        "El nombre del residente debe tener como máximo 60 caracteres.",
      "string.pattern.base":
        "El nombre del residente solo puede contener letras y espacios.",
    }),
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso(),
})
  .or(
    "rut_visitante",
    "rut_usuario",
    "nombre_visitante",
    "nombre_usuario",
    "patente_visitante",
    "startDate",
    "endDate"
  )
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar al menos un parámetro de búsqueda.",
  });

export const visitaBodyValidation = Joi.object({
  rut_visitante: Joi.string()
    .min(9)
    .max(12)
    .pattern(
      /^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/,
    )
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.min": "El rut debe tener como mínimo 9 caracteres.",
      "string.max": "El rut debe tener como máximo 12 caracteres.",
      "string.pattern.base":
        "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
    }),
  rut_usuario: Joi.string()
    .min(9)
    .max(12)
    .pattern(
      /^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/,
    )
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.min": "El rut debe tener como mínimo 9 caracteres.",
      "string.max": "El rut debe tener como máximo 12 caracteres.",
      "string.pattern.base":
        "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
    }),
  nombre_visitante: Joi.string()
    .min(3)
    .max(60)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .required()
    .messages({
      "string.empty": "El nombre del visitante no puede estar vacío.",
      "string.base": "El nombre del visitante debe ser de tipo string.",
      "string.min":
        "El nombre del visitante debe tener como mínimo 15 caracteres.",
      "string.max":
        "El nombre del visitante debe tener como máximo 60 caracteres.",
      "string.pattern.base":
        "El nombre del visitante solo puede contener letras y espacios.",
    }),
  nombre_usuario: Joi.string()
    .min(3)
    .max(60)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .required()
    .messages({
      "string.empty": "El nombre del residente no puede estar vacío.",
      "string.base": "El nombre del residente debe ser de tipo string.",
      "string.min":
        "El nombre del residente debe tener como mínimo 15 caracteres.",
      "string.max":
        "El nombre del residente debe tener como máximo 60 caracteres.",
      "string.pattern.base":
        "El nombre del residente solo puede contener letras y espacios.",
    }),
  fecha_visita: Joi.date().iso().required().messages({
    "date.base": "La fecha de visita debe ser una fecha válida.",
    "date.format": "La fecha de visita debe estar en formato ISO.",
  }),
  patente_visitante: Joi.string()
      .max(9)
      .pattern(/^[A-Z0-9\-]+$/i)
      .allow(null, "")
      .messages({
        "string.max": "La patente debe tener como máximo 9 caracteres.",
        "string.pattern.base":
          "La patente solo puede contener letras, números y guiones.",
  })
})
  .unknown(false)
;
