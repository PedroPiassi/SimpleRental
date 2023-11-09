import { conexao } from '../database/Conexao.js';
import { INTEGER, STRING } from 'sequelize';

export const Cliente = conexao.define('cliente', {
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
  email: {
    type: STRING,
    allowNull: false,
    primaryKey: false
  },
  telefone: {
    type: STRING,
    allowNull: false,
    primaryKey: false
  },
  CPF: {
    type: STRING,
    allowNull: false,
    primaryKey: false,
    unique: true
  }
});