//  SCRIPT DEFINIÇÃO DB

const Sequelize = require('sequelize');

//  DEFINIE/CRIA BANCO DE DADOS
/*
var connection = new Sequelize(process.env.DB_BASE, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  ssl: false,
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  
});
*/

const connection =new Sequelize(
  process.env.DB_BASE, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
      logging: false
});


module.exports = connection;
