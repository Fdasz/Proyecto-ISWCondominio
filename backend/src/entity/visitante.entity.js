"use strict";
import { EntitySchema } from "typeorm";

const VisitanteSchema = new EntitySchema({
  name: "Visitante",
  tableName: "visitante",
  columns: {
    id_visitante: {
      type: "int",
      primary: true,
      generated: true,
    },
    rut_visitante: {
      type: "varchar",
      length: 12,
      nullable: false,
      unique: true,
    },
    nombre_visitante: {
      type: "varchar",
      length: 60,
      nullable: false,
    },
  },
  indices: [
    {
      name: "IDX_VISITANTE",
      columns: ["id_visitante"],
      unique: true,
    },
    {
      name: "IDX_VISITANTE_RUT",
      columns: ["rut_visitante"],
      unique: true,
    }
  ],
});

export default VisitanteSchema;
