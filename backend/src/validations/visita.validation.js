"use strict";
import Joi from "joi";
import { validarRutCompleto } from "../helpers/rut.helper.js";

export const visitaQueryValidation = Joi.object({
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
  startDate: Joi.date().iso().messages({
    "date.base": "La fecha de inicio debe ser una fecha válida.",
    "date.format": "La fecha de inicio debe tener formato ISO.",
  }),
  endDate: Joi.date().iso().messages({
    "date.base": "La fecha de término debe ser una fecha válida.",
    "date.format": "La fecha de término debe tener formato ISO.",
  }),
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
