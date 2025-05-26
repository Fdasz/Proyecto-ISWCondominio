import Joi from "joi";

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

  rut_residente_num: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "El número del RUT debe ser un número entero positivo.",
      "any.required": "El número del RUT es obligatorio.",
    }),

  rut_residente_dv: Joi.string()
    .length(1)
    .pattern(/^[0-9kK]$/)
    .required()
    .messages({
      "string.base": "El dígito verificador debe ser un carácter.",
      "string.length": "El dígito verificador debe tener un solo carácter.",
      "string.pattern.base": "El dígito verificador debe ser un número o la letra K.",
      "any.required": "El dígito verificador del RUT es obligatorio.",
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


export const reservaEspacioQueryValidation = Joi.object({
  id_reserva: Joi.number().integer().positive().optional(),

  fecha_reserva: Joi.date().iso().optional(),
  hora_inicio: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).optional(),
  hora_fin: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).optional(),
  id_espacio: Joi.number().integer().positive().optional(),
  rut_residente_num: Joi.number().integer().positive().optional(),
  rut_residente_dv: Joi.string().length(1).pattern(/^[0-9kK]$/).optional()
}).unknown(false) 
.messages({
  "object.unknown": "No se permiten propiedades adicionales."
});