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
            length: 10, // 7 or 8 digits
            nullable: false,
            unique: true
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