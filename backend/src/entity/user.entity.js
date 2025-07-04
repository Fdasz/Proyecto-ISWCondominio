"use strict";
import { EntitySchema } from "typeorm";

const UserSchema = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id_usuario: {
      type: "int",
      primary: true,
      generated: true,
    },
    nombre_usuario: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    rut_usuario: {
      type: "varchar",
      length: 12,
      nullable: false,
      unique: true,
    },
    email_usuario: {
      type: "varchar",
      length: 255,
      nullable: false,
      unique: true,
    },
    rol: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    password: {
      type: "varchar",
      nullable: false,
    },
    createdAt: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    updatedAt: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
      nullable: false,
    },
  },
  indices: [
    {
      name: "IDX_USER",
      columns: ["id_usuario"],
      unique: true,
    },
    {
      name: "IDX_USER_RUT",
      columns: ["rut_usuario"],
      unique: true,
    },
    {
      name: "IDX_USER_EMAIL",
      columns: ["email_usuario"],
      unique: true,
    },
  ],
});

export default UserSchema;
