

function ventaData(sequelize, DataTypes) {
  let alias = "Venta";

  let columns = {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    monto_unitario: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER(100),
      allowNull: false,
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    detalle_venta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };

  let config = { camelCase: false, timestamps: false };

  const Venta = sequelize.define(alias, columns, config);

  Venta.associate = function (models) {
    Venta.belongsTo(models.Usuario, {
      as: "usuarios",
      foreignKey: "usuario_id",
    });
    Venta.associate = function (models) {
      Venta.hasmany(models.Producto, {
        as: "productos",
        foreignKey: "producto_id",
      });
      Venta.associate = function (models) {
        Venta.belongsTo(models.Detalle_venta, {
          as: "detalle_venta",
          foreignKey: "detalle_venta_id",
        });
      };
    };
  };

  return Venta;
}

module.exports = ventaData;
