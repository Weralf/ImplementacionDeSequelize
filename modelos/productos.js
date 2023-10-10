import { DataTypes } from "sequelize";
import db from "../db/connection.js";

const Productos = db.define('Producto', {
    nombre: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    stock: {
        type: DataTypes.STRING
    },
    categoria: {
        type: DataTypes.STRING
    },
    proveedor: {
        type: DataTypes.STRING
    },
    precio: {
        type: DataTypes.INTEGER
    },
},
{timestamps:false,
tableName:'productos'}
)

export default Productos