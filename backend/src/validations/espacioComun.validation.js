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

    }),
  estado_espacio_comun: Joi.boolean().messages({
    "boolean.base": "El estado del espacio debe ser verdadero o falso.",
  }),
})

.or("tipo_espacio_comun", "descripcion_espacio_comun", "estado_espacio_comun")
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing":
      "Debes proporcionar al menos un campo: tipo_espacio_comun, descripcion_espacio_comun o estado_espacio_comun.",
  });

  export const espacioComunQueryValidation = Joi.object({
  id_espacio: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "El id del espacio debe ser un número.",
      "number.integer": "El id del espacio debe ser un número entero.",
      "number.positive": "El id del espacio debe ser un número positivo.",
      "any.required": "El id del espacio es obligatorio.",
    }),

  tipo_espacio_comun: Joi.string()
    .min(3)
    .max(60)
    .messages({
      "string.base": "El tipo de espacio debe ser de tipo string.",
      "string.min": "El tipo de espacio debe tener al menos 3 caracteres.",
      "string.max": "El tipo de espacio debe tener como máximo 60 caracteres.",
    }),

  descripcion_espacio_comun: Joi.string()
    .min(5)
    .max(255)
    .messages({
      "string.base": "La descripción debe ser de tipo string.",
      "string.min": "La descripción debe tener al menos 5 caracteres.",
      "string.max": "La descripción debe tener como máximo 255 caracteres.",
    }),

  estado_espacio_comun: Joi.boolean().messages({
    "boolean.base": "El estado del espacio debe ser verdadero o falso.",
  }),
})
  .or("id_espacio", "tipo_espacio_comun", "descripcion_espacio_comun", "estado_espacio_comun")
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing":
      "Debes proporcionar al menos un parámetro: id_espacio, tipo_espacio_comun, descripcion_espacio_comun o estado_espacio_comun.",
  });

  export const espacioComunUpdateValidation = Joi.object({
  tipo_espacio_comun: Joi.string()
    .min(3)
    .max(60)
    .messages({
      "string.empty": "El tipo de espacio no puede estar vacío.",
      "string.base": "El tipo de espacio debe ser de tipo string.",
      "string.min": "El tipo de espacio debe tener al menos 3 caracteres.",
      "string.max": "El tipo de espacio debe tener como máximo 60 caracteres.",
    }),

  descripcion_espacio_comun: Joi.string()
    .min(5)
    .max(255)
    .messages({
      "string.empty": "La descripción no puede estar vacía.",
      "string.base": "La descripción debe ser de tipo string.",
      "string.min": "La descripción debe tener al menos 5 caracteres.",
      "string.max": "La descripción debe tener como máximo 255 caracteres.",
    }),

  estado_espacio_comun: Joi.boolean().messages({
    "boolean.base": "El estado del espacio debe ser verdadero o falso.",
  }),
})
.or("tipo_espacio_comun", "descripcion_espacio_comun", "estado_espacio_comun")
.unknown(false)
.messages({
  "object.unknown": "No se permiten propiedades adicionales.",
  "object.missing": "Debes proporcionar al menos un campo para actualizar.",
});
