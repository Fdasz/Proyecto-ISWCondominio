"use strict";
import { EntitySchema } from "typeorm";

const ReservaEspacioSchema = new EntitySchema({
  name: "ReservaEspacio",
  tableName: "reserva_espacio",
  columns: {
    id_reserva: {
      type: "int",
      primary: true,
      generated: true,
    },
    fecha_reserva: {
      type: "date",
      nullable: false,
    },
    hora_inicio: {
      type: "time",
      nullable: false,
    },
    hora_fin: {
      type: "time",
      nullable: false,
    }
  },
  relations: {
    espacio: {
      type: "many-to-one",
      target: "EspacioComun",
      joinColumn: {
        name: "id_espacio",
        referencedColumnName: "id_espacio"
      },
      nullable: false,
    },
    usuario: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "rut_usuario",
        referencedColumnName: "rut_usuario"
      },
      nullable: false
    }
  }
});

export default ReservaEspacioSchema;
