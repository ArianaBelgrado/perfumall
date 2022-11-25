const models = require("../models");

module.exports = function (sequelize, DataTypes) {
  const alias = "detalle_venta";
  const cols = {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    direccion_destino: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ciudad_destino: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    retiro: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  };
  const config = {
    tableName: "detalle_venta",
    timestamps: true,
  };
  const Detalle_venta = sequelize.define(alias, cols, config);

  Detalle_venta.associate = (models) => {
    Detalle_venta.hasMany(models.venta, {
      as: "venta",
      foreignKey: "Detalle_venta_id",
    });
  };

  return Detalle_venta;
};
