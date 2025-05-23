"use strict";
import Joi from "joi";

export const visitaQueryValidation = Joi.object({
    rut_visitante_num: Joi.string()
        .pattern(/^\d{7,8}$/)
        .messages({
            "string.pattern.base": "El número de RUT del visitante debe tener 7 u 8 dígitos.",
            "string.empty": "El número de RUT del visitante es requerido."
        }),
    rut_visitante_dv: Joi.string()
        .pattern(/^[\dkK]$/)
        .messages({
            "string.pattern.base": "El dígito verificador del visitante debe ser un número o K.",
            "string.empty": "El dígito verificador del visitante es requerido."
        }),
    rut_residente_num: Joi.string()
        .pattern(/^\d{7,8}$/)
        .messages({
            "string.pattern.base": "El número de RUT del residente debe tener 7 u 8 dígitos.",
            "string.empty": "El número de RUT del residente es requerido."
        }),
    rut_residente_dv: Joi.string()
        .pattern(/^[\dkK]$/)
        .messages({
            "string.pattern.base": "El dígito verificador del residente debe ser un número o K.",
            "string.empty": "El dígito verificador del residente es requerido."
        }),
    nombre_visitante: Joi.string()
        .min(15)
        .max(60)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.empty": "El nombre del visitante no puede estar vacío.",
            "string.base": "El nombre del visitante debe ser de tipo string.",
            "string.min": "El nombre del visitante debe tener como mínimo 15 caracteres.",
            "string.max": "El nombre del visitante debe tener como máximo 60 caracteres.",
            "string.pattern.base": "El nombre del visitante solo puede contener letras y espacios.",
        }),
    nombre_residente: Joi.string()
        .min(15)
        .max(60)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.empty": "El nombre del residente no puede estar vacío.",
            "string.base": "El nombre del residente debe ser de tipo string.",
            "string.min": "El nombre del residente debe tener como mínimo 15 caracteres.",
            "string.max": "El nombre del residente debe tener como máximo 60 caracteres.",
            "string.pattern.base": "El nombre del residente solo puede contener letras y espacios.",
        }),
    fecha_visita: Joi.date()
        .iso()
        .messages({
            "date.base": "La fecha de visita debe ser una fecha válida.",
            "date.format": "La fecha de visita debe estar en formato ISO.",
        }),
})
.or(
    "rut_visitante_num",
    "rut_residente_num",
    "fecha_visita",
    "nombre_visitante",
    "nombre_residente"
)
.unknown(false)
.messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar al menos un parámetro de búsqueda.",
});

export const visitaBodyValidation = Joi.object({
    rut_visitante_num: Joi.string()
        .pattern(/^\d{7,8}$/)
        .required()
        .messages({
            "string.pattern.base": "El número de RUT del visitante debe tener 7 u 8 dígitos.",
            "string.empty": "El número de RUT del visitante es requerido."
        }),
    rut_visitante_dv: Joi.string()
        .pattern(/^[\dkK]$/)
        .required()
        .messages({
            "string.pattern.base": "El dígito verificador del visitante debe ser un número o K.",
            "string.empty": "El dígito verificador del visitante es requerido."
        }),
    rut_residente_num: Joi.string()
        .pattern(/^\d{7,8}$/)
        .required()
        .messages({
            "string.pattern.base": "El número de RUT del residente debe tener 7 u 8 dígitos.",
            "string.empty": "El número de RUT del residente es requerido."
        }),
    rut_residente_dv: Joi.string()
        .pattern(/^[\dkK]$/)
        .required()
        .messages({
            "string.pattern.base": "El dígito verificador del residente debe ser un número o K.",
            "string.empty": "El dígito verificador del residente es requerido."
        }),
    nombre_visitante: Joi.string()
        .min(15)
        .max(60)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .required()
        .messages({
            "string.empty": "El nombre del visitante no puede estar vacío.",
            "string.base": "El nombre del visitante debe ser de tipo string.",
            "string.min": "El nombre del visitante debe tener como mínimo 15 caracteres.",
            "string.max": "El nombre del visitante debe tener como máximo 60 caracteres.",
            "string.pattern.base": "El nombre del visitante solo puede contener letras y espacios.",
        }),
    nombre_residente: Joi.string()
        .min(15)
        .max(60)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .required()
        .messages({
            "string.empty": "El nombre del residente no puede estar vacío.",
            "string.base": "El nombre del residente debe ser de tipo string.",
            "string.min": "El nombre del residente debe tener como mínimo 15 caracteres.",
            "string.max": "El nombre del residente debe tener como máximo 60 caracteres.",
            "string.pattern.base": "El nombre del residente solo puede contener letras y espacios.",
        }),
    fecha_visita: Joi.date()
        .iso()
        .required()
        .messages({
            "date.base": "La fecha de visita debe ser una fecha válida.",
            "date.format": "La fecha de visita debe estar en formato ISO.",
        }),
})
.unknown(false)
.messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});