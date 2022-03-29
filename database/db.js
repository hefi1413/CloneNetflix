//
//  SCRIPT DEFINIÇÃO DB
//

const Sequelize =require("sequelize");

//
//  DEFINIE/CRIA BANCO DE DADOS
//
var connection =new Sequelize(
  process.env.DATABASE, 
  process.env.USER_DB, 
  process.env.PASS_DB, 
    {
      host: process.env.HOST_DB,
      dialect: 'postgres',
      pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
      logging: false
});


module.exports =connection; 