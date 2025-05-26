"use strict";
import { EntitySchema } from "typeorm";

const EspacioComunSchema = new EntitySchema({
    name: "EspacioComun",
    tableName: "espacio_comun",
    columns: {
        id_espacio: {
            type: "int",
            primary: true,
            generated: true,
        },
        tipo_espacio_comun: {
            type: "varchar",
            length: 60,
            nullable: false,
        },
        descripcion_espacio_comun: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        estado_espacio_comun: {
            type: "boolean",
            default: true,
        },
    },     
});

export default EspacioComunSchema;