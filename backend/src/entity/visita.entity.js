"use strict";
import { EntitySchema } from "typeorm";

const VisitaSchema = new EntitySchema({
  name: "Visita",
  tableName: "visita",
  columns: {
    rut_visitante_num: {
      type: "varchar",
      length: 8,
      primary: true,
    },
    rut_visitante_dv: {
      type: "char",
      length: 1,
      primary: true,
    },
    rut_residente_num: {
      type: "varchar",
      length: 8,
      primary: true,
    },
    rut_residente_dv: {
      type: "char",
      length: 1,
      primary: true,
    },
    fecha_visita: {
      type: "timestamp with time zone",
      primary: true,
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    nombre_visitante: {
      type: "varchar",
      length: 60,
      nullable: false,
    },
    nombre_residente: {
      type: "varchar",
      length: 60,
      nullable: false,
    }
  },
  relations: {
    visitante: {
      target: "Visitante",
      type: "many-to-one",
      joinColumns: [
        { name: "rut_visitante_num", referencedColumnName: "rut_visitante_num" },
        { name: "rut_visitante_dv", referencedColumnName: "rut_visitante_dv" }
      ]
    },
    residente: {
      target: "Residente",
      type: "many-to-one",
      joinColumns: [
        { name: "rut_residente_num", referencedColumnName: "rut_residente_num" },
        { name: "rut_residente_dv", referencedColumnName: "rut_residente_dv" }
      ]
    },
  },
});

export default VisitaSchema;
