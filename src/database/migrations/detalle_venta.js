'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('detalle_venta', {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        direccion_destino: {
            type: DataTypes.STRING(100),
            allowNull: false
        }, 
        ciudad_destino: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        retiro: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
        })
       
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('detalle_venta')
  }
};