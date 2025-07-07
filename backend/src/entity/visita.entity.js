"use strict";
import { EntitySchema } from "typeorm";

const VisitaSchema = new EntitySchema({
  name: "Visita",
  tableName: "visita",
  columns: {
    id_visita: {
      type: "int",
      primary: true,
      generated: true,
    },
    rut_visitante: {
      type: "varchar",
      length: 12,
      nullable: false,
    },
    rut_usuario: {
      type: "varchar",
      length: 12,
      nullable: false,
    },
    fecha_visita: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    nombre_visitante: {
      type: "varchar",
      length: 60,
      nullable: false,
    },
    nombre_usuario: {
      type: "varchar",
      length: 60,
      nullable: false,
    }
  },
  relations: {
    visitante: {
      target: "Visitante",
      type: "many-to-one",
      joinColumn: {
        name: "rut_visitante",
        referencedColumnName: "rut_visitante"
      }
    },
    usuario: {
      target: "User",
      type: "many-to-one",
      joinColumn: {
        name: "rut_usuario",
        referencedColumnName: "rut_usuario"
      }
    }
  },
});

export default VisitaSchema;
