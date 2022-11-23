'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('producto', {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        precio: {
            type: DataTypes.MEDIUMINT(500000),
            allowNull: false
        },
         fecha_creacion: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
         fecha_baja: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
         imagen: {
            type: DataTypes.STRING(100),
            allowNull: false
        }, 
        admin_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            foreignKey:true
        },
        marca_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            foreignKey:true

        }
        })
       
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('producto')
  }
};