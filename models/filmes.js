const Sequelize = require('sequelize');
const connection = require('./database/db.js');

//
//  DEFINIE/CRIA MODELO/TABELA USUARIOS
//
const Filmes = connection.define(
  'filmes',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    ano: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    genero: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    descricao: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    tipo: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['filme', 'serie']],
      }     
    },

    imagem: {
      type: Sequelize.STRING,
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