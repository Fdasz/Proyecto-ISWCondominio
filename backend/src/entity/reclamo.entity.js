import { EntitySchema } from "typeorm";

const ReclamoSchema = new EntitySchema({
  name: "Reclamo",
  tableName: "reclamo",
  columns: {
    id_reclamo: {
      type: "int",
      primary: true,
      generated: true,
    },
    rut_residente_num: {
        type: "varchar",
        length: 8,
        nullable: false,
    },
    rut_residente_dv: {
        type: "char",
        length: 1,
        nullable: false,
    },
    categoria: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    fecha: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    descripcion_reclamo: {
      type: "text",
      nullable: false,
    },
    estado: {
      type: "varchar",
      length: 20,
      default: "pendiente",
      nullable: false,
    },
    comentarios_admin: {
      type: "text",
      nullable: true,
    },
  },
  relations: {
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

export default ReclamoSchema;