const models = require("../models");

module.exports = function (sequelize, DataTypes) {
  const alias = "producto";
  const cols = {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    precio: {
      type: DataTypes.MEDIUMINT(500000),
      allowNull: false,
    },
    fecha_creacion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fecha_baja: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    imagen: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    admin_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
    marca_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  };
  
  const config = {
    tableName: "producto",
    timestamps: true,
  };

  const Producto = sequelize.define(alias, cols, config);

  Producto.associate = (models) => {
    Producto.belongsTo(models.Marca), {
      as: "marca",
      foreignKey: "marca_id",
    }
  },

    Producto.associate = (models) => {
      Producto.belongsTo(models.Usuario), {
        as: "usuario",
        foreignKey: "admin_id",
      };
    },

    Producto.associate = (models) => {
      Producto.belongsTo(models.Venta), {
        as: "venta",
        foreignKey: "producto_id",
      };
    };

  return Producto;
};
