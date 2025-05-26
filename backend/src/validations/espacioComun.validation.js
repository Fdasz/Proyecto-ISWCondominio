"use strict";
import Joi from "joi";

export const espacioComunBodyValidation = Joi.object({
  tipo_espacio_comun: Joi.string()
    .min(3)
    .max(60)
    .required()
    .messages({
      "string.empty": "El tipo de espacio no puede estar vacío.",
      "string.base": "El tipo de espacio debe ser de tipo string.",
      "string.min": "El tipo de espacio debe tener al menos 3 caracteres.",
      "string.max": "El tipo de espacio debe tener como máximo 60 caracteres.",
      "any.required": "El tipo de espacio es obligatorio.",
    }),

  descripcion_espacio_comun: Joi.string()
    .min(5)
    .max(255)
    .required()
    .messages({
      "string.empty": "La descripción no puede estar vacía.",
      "string.base": "La descripción debe ser de tipo string.",
      "string.min": "La descripción debe tener al menos 5 caracteres.",
      "string.max": "La descripción debe tener como máximo 255 caracteres.",
      "any.required": "La descripción del espacio es obligatoria.",
    }),

  estado_espacio_comun: Joi.boolean().optional().messages({
    "boolean.base": "El estado del espacio debe ser verdadero o falso.",
  }),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
  });

export const espacioComunQueryValidation = Joi.object({
  id_espacio: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      "number.base": "El id del espacio debe ser un número.",
      "number.integer": "El id del espacio debe ser un número entero.",
      "number.positive": "El id del espacio debe ser un número positivo.",
    }),

  tipo_espacio_comun: Joi.string().optional(),
  descripcion_espacio_comun: Joi.string().optional(),
  estado_espacio_comun: Joi.boolean().optional()
});
