module.exports = function (sequelize, DataTypes) {
  const alias = "Detalle_venta";
  const cols = {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha: {
      type: DataTypes.DATE,
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
    monto_total: {
      type: DataTypes.INTEGER,
    },
  };
  const config = {
    tableName: "Detalle_venta",
    timestamps: true,
  };
  const Detalle_venta = sequelize.define(alias, cols, config);

  Detalle_venta.associate = (models) => {
    Detalle_venta.hasMany(models.Venta, {
      as: "venta",
      foreignKey: "detalle_venta_id",
    });
  };

  return Detalle_venta;
};
