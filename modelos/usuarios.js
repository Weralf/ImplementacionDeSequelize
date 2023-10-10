import { DataTypes } from "sequelize";
import db from "../db/connection.js";

const Usuarios = db.define('Usuario', {
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    dni: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    contraseña: {
        type: DataTypes.STRING
    },
},
{timestamps:false,
tableName:'usuarios'}
)

export default Usuarios