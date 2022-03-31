const sequelize = require('sequelize');
const connection = require('./database/db.js');

//
//  DEFINIE/CRIA MODELO/TABELA USUARIOS
//
var Filmes = connection.define(
  'filmes',
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nome: {
      type: sequelize.STRING,
      allowNull: false,
    },

    ano: {
      type: sequelize.INTEGER,
      allowNull: false,
    },

    genero: {
      type: sequelize.STRING,
      allowNull: false,
    },

    descricao: {
      type: sequelize.STRING,
      allowNull: false,
    },

    tipo: {
      type: sequelize.STRING,
      allowNull: false,      
    },

    imagem: {
      type: sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
);

module.exports = Filmes;
