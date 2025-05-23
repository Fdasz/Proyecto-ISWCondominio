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
        rut_visitante_num: {
            type: "varchar",
            length: 8, // 7 or 8 digits
            nullable: false,
        },
        rut_visitante_dv: {
            type: "char",
            length: 1,
            nullable: false,
        },
        nombre_visitante: {
            type: "varchar",
            length: 60,
            nullable: false,
        },
        patente_visitante: {
            type: "varchar",
            length: 9,
        }
    },
});

export default VisitanteSchema;