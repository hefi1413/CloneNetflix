const Sequelize = require('sequelize');
const connection = require('./database/db.js');

//
//  DEFINIE/CRIA MODELO/TABELA USUARIOS
//
var Filmes = connection.define(
  'filmes',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    codigo: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true,
      },
    },

    nome: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    ano: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true,
      },
    },

    genero: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    descricao: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    tipo: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isLowercase: true,
        isIn: [['filme', 'serie']],
        tipo_teste() {
          if ((this.tipo !== "filme") || (this.tipo === "serie")) {
            throw new Error('Either both latitude and longitude, or neither!');
          }
        },
      },
    },

    imagem: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isUrl: true,
      },
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
