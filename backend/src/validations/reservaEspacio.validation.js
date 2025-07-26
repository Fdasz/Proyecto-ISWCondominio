import Joi from "joi";

// Validación para crear reservas (incluye rut_usuario)
export const reservaEspacioBodyValidation = Joi.object({
  fecha_reserva: Joi.date()
    .iso()
    .required()
    .messages({
      "date.base": "La fecha de reserva debe ser una fecha válida.",
      "any.required": "La fecha de reserva es obligatoria.",
    }),

  hora_inicio: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      "string.pattern.base": "La hora de inicio debe estar en formato HH:mm (24 horas).",
      "any.required": "La hora de inicio es obligatoria.",
    }),

  hora_fin: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      "string.pattern.base": "La hora de término debe estar en formato HH:mm (24 horas).",
      "any.required": "La hora de término es obligatoria.",
    }),

  id_espacio: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "El ID del espacio debe ser un número.",
      "any.required": "El ID del espacio es obligatorio.",
    }),

  rut_usuario: Joi.string()
    .required()
    .messages({
      "string.base": "El RUT del usuario debe ser una cadena de texto.",
      "any.required": "El RUT del usuario es obligatorio.",
    }),

}).custom((value, helpers) => {
  const [hInicio, mInicio] = value.hora_inicio.split(":").map(Number);
  const [hFin, mFin] = value.hora_fin.split(":").map(Number);

  const inicio = hInicio * 60 + mInicio;
  const fin = hFin * 60 + mFin;

  if (fin <= inicio) {
    return helpers.message("La hora de término debe ser posterior a la hora de inicio.");
  }

  return value;
})
.unknown(false)
.messages({
  "object.unknown": "No se permiten propiedades adicionales."
});

// Validación para actualizar reservas (excluye rut_usuario)
export const reservaEspacioUpdateValidation = Joi.object({
  fecha_reserva: Joi.date()
    .iso()
    .optional()
    .messages({
      "date.base": "La fecha de reserva debe ser una fecha válida.",
    }),

  hora_inicio: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .optional()
    .messages({
      "string.pattern.base": "La hora de inicio debe estar en formato HH:mm (24 horas).",
    }),

  hora_fin: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .optional()
    .messages({
      "string.pattern.base": "La hora de término debe estar en formato HH:mm (24 horas).",
    }),

  id_espacio: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      "number.base": "El ID del espacio debe ser un número.",
    }),

  // Explícitamente prohibir la actualización del usuario
  rut_usuario: Joi.forbidden()
    .messages({
      "any.unknown": "No se puede modificar el usuario de una reserva existente."
    })

}).custom((value, helpers) => {
  // Solo validar horarios si ambos están presentes
  if (value.hora_inicio && value.hora_fin) {
    const [hInicio, mInicio] = value.hora_inicio.split(":").map(Number);
    const [hFin, mFin] = value.hora_fin.split(":").map(Number);

    const inicio = hInicio * 60 + mInicio;
    const fin = hFin * 60 + mFin;

    if (fin <= inicio) {
      return helpers.message("La hora de término debe ser posterior a la hora de inicio.");
    }
  }

  return value;
})
.min(1) // Al menos un campo debe estar presente para actualizar
.unknown(false)
.messages({
  "object.unknown": "No se permiten propiedades adicionales.",
  "object.min": "Debe proporcionar al menos un campo para actualizar."
});

// Validación para consultas/filtros
export const reservaEspacioQueryValidation = Joi.object({
  id_reserva: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      "number.base": "El ID de reserva debe ser un número.",
      "number.positive": "El ID de reserva debe ser positivo."
    }),

  fecha_reserva: Joi.date()
    .iso()
    .optional()
    .messages({
      "date.base": "La fecha de reserva debe ser una fecha válida."
    }),

  hora_inicio: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .optional()
    .messages({
      "string.pattern.base": "La hora de inicio debe estar en formato HH:mm (24 horas)."
    }),

  hora_fin: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .optional()
    .messages({
      "string.pattern.base": "La hora de término debe estar en formato HH:mm (24 horas)."
    }),

  id_espacio: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      "number.base": "El ID del espacio debe ser un número.",
      "number.positive": "El ID del espacio debe ser positivo."
    }),

  rut_usuario: Joi.string()
    .optional()
    .messages({
      "string.base": "El RUT del usuario debe ser una cadena de texto."
    })

}).unknown(false)
.messages({
  "object.unknown": "No se permiten propiedades adicionales."
});