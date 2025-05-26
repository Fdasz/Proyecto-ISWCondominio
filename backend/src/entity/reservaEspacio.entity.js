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
    residente: {
      type: "many-to-one",
      target: "Residente",
      joinColumns: [
        {
          name: "rut_residente_num",
          referencedColumnName: "rut_residente_num"
        },
        {
          name: "rut_residente_dv",
          referencedColumnName: "rut_residente_dv"
        }
      ],
      nullable: false
    }
  }
});

export default ReservaEspacioSchema;
