"use strict";
import Joi from "joi";

// Query validation: for searching/filtering visitantes
export const visitanteQueryValidation = Joi.object({
    id_visitante: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id debe ser un número",
            "number.integer": "El id debe ser un número entero",
            "number.positive": "El id debe ser un número positivo",
        }),
    rut_visitante_num: Joi.string()
        .pattern(/^\d{7,8}$/)
        .messages({
            "string.pattern.base": "El número de RUT debe tener 7 u 8 dígitos.",
            "string.empty": "El número de RUT es requerido",
        }),
    rut_visitante_dv: Joi.string()
        .pattern(/^[\dkK]$/)
        .messages({
            "string.pattern.base": "El dígito verificador debe ser un número o K.",
            "string.empty": "El dígito verificador es requerido",
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
            "string.pattern.base": "La patente solo puede contener letras, números y guiones.",
        }),
})
.or("id_visitante", "rut_visitante_num", "nombre_visitante", "patente_visitante")
.unknown(false)
.messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar al menos un parámetro de búsqueda.",
});

export const visitanteBodyValidation = Joi.object({
    rut_visitante_num: Joi.string()
        .pattern(/^\d{7,8}$/)
        .messages({
            "string.pattern.base": "El número de RUT debe tener 7 u 8 dígitos.",
            "string.empty": "El número de RUT es requerido.",
        }),
    rut_visitante_dv: Joi.string()
        .pattern(/^[\dkK]$/)
        .messages({
            "string.pattern.base": "El dígito verificador debe ser un número o K.",
            "string.empty": "El dígito verificador es requerido.",
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
            "string.pattern.base": "La patente solo puede contener letras, números y guiones.",
        }),
}).min(1)
.unknown(false)
.messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});