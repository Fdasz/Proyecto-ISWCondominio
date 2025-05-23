"use strict";
import Joi from "joi";

const domainEmailValidator = (value, helper) => {
    const [local, domain] = value.split("@");
    const allowedDomains = ["gmail.com", "hotmail.com", "outlook.com"];
    if (!allowedDomains.includes(domain)) {
    return helper.message(`El dominio ${domain} no es permitido`);
    }
    if (!local || local.length < 5) {
    return helper.message("La sección antes del @ debe tener al menos 5 caracteres");
    }
    return value;
};

export const residenteQueryValidation = Joi.object({
    id_residente: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id debe ser un número",
            "number.integer": "El id debe ser un número entero",
            "number.positive": "El id debe ser un número positivo",
        }),
    rut_residente_num: Joi.string()
        .pattern(/^\d{7,8}$/)
        .messages({
            "string.pattern.base": "El número de RUT debe tener 7 u 8 dígitos.",
            "string.empty": "El número de RUT es requerido."
        }),
    rut_residente_dv: Joi.string()
        .pattern(/^[\dkK]$/)
        .messages({
            "string.pattern.base": "El dígito verificador debe ser un número o K.",
            "string.empty": "El dígito verificador es requerido."
        }),
    email_residente: Joi.string()
        .email()
        .custom(domainEmailValidator)
        .messages({
            "string.email": "El email no es válido",
            "string.empty": "El email es requerido",
        }),
})
    .or("id_residente", "email_residente", "rut_residente_num")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
            "Debes proporcionar al menos un parámetro: id, email o rut.",
    });

export const residenteBodyValidation = Joi.object({
    rut_residente_num: Joi.string()
        .pattern(/^\d{7,8}$/)
        .required()
        .messages({
            "string.pattern.base": "El número de RUT debe tener 7 u 8 dígitos.",
            "string.empty": "El número de RUT es requerido."
        }),
    rut_residente_dv: Joi.string()
        .pattern(/^[\dkK]$/)
        .required()
        .messages({
            "string.pattern.base": "El dígito verificador debe ser un número o K.",
            "string.empty": "El dígito verificador es requerido."
        }),
    nombre_residente: Joi.string()
        .min(15)
        .max(60)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.empty": "El nombre completo no puede estar vacío.",
            "string.base": "El nombre completo debe ser de tipo string.",
            "string.min": "El nombre completo debe tener como mínimo 15 caracteres.",
            "string.max": "El nombre completo debe tener como máximo 60 caracteres.",
            "string.pattern.base":
            "El nombre completo solo puede contener letras y espacios.",
        }),
    email_residente: Joi.string()
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
    tel_residente: Joi.string()
        .min(12)
        .max(12)
        .pattern(/^\+569\d{8}$/)
        .messages({
            "string.empty": "El teléfono no puede estar vacío.",
            "string.base": "El teléfono debe ser de tipo string.",
            "string.max": "El teléfono debe tener el formato +569XXXXXXXX.",
        }),
})
.unknown(false)
.messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

