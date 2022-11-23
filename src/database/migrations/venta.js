'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('venta', {
        id: {
            type:DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false
        },
        monto_unitario: {
            type: DataTypes.FLOAT,
            allowNull: false},
        cantidad: {
            type: DataTypes.INTEGER(100),
            allowNull: false
        }

        })
       
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('venta')
  }
};