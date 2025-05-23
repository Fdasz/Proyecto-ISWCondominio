"use strict";
import { EntitySchema } from "typeorm";

const ResidenteSchema = new EntitySchema({
    name: "Residente",
    tableName: "residente",
    columns: {
        id_residente: {
            type: "int",
            primary: true,
            generated: true,
        },
        rut_residente_num: {
            type: "varchar",
            length: 8, // 7 or 8 digits
            nullable: false,
        },
        rut_residente_dv: {
            type: "char",
            length: 1,
            nullable: false,
        },
        nombre_residente: {
            type: "varchar",
            length: 60,
            nullable: false,
        },
        email_residente: {
            type: "varchar",
            length: 60,
            nullable: false
        },
        tel_residente: {
            type: "varchar",
            length: 12,
            nullable: false
        },
    },
});

export default ResidenteSchema;