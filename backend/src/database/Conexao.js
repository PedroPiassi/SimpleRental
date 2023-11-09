import { createConnection } from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();
(async () => {
  await createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  })
    .then((conexao) => {
      conexao
        .query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DB};`)
        .then(() => {
          console.log(`${process.env.MYSQL_DB} criado com sucesso!`);
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
})();

export const conexao = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
    logging: false,
  }
);