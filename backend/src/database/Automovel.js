import { conexao } from "../database/Conexao.js";
import { BOOLEAN, FLOAT, INTEGER, STRING } from "sequelize";
import { Cliente } from "./Cliente.js";

export const Automovel = conexao.define("automovel", {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: STRING,
        allowNull: false,
        primaryKey: false
    },
    marca: {
        type: STRING,
        allowNull: false,
        primaryKey: false
    },
    ano: {
        type: INTEGER,
        allowNull: false,
        primaryKey: false
    },
    kmRodados: {
        type: FLOAT,
        allowNull: false,
        primaryKey: false
    },
    placa: {
        type: STRING,
        allowNull: false,
        primaryKey: false,
        unique: true
    },
    valor: {
        type: FLOAT,
        allowNull: false,
        primaryKey: false
    },
    precoLocacao: {
        type: FLOAT,
        allowNull: false,
        primaryKey: false
    },
    alugado: {
        type: BOOLEAN,
        allowNull: false,
        primaryKey: false
    },
});

Automovel.belongsTo(Cliente, {
    constraint: true,
    foreignKey: "idCliente"
});

Cliente.hasMany(Automovel, {
    foreignKey: "idCliente"
});