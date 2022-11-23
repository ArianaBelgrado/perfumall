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
      autoIncrement: true,
    },
    marca_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      autoIncrement: true,
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
  const producto = sequelize.define(alias, cols, config);

  (producto.associate = (models) => {
    producto.belongsTo /
      hasmany(models.marca, {
        as: "marca",
        foreignKey: "marca_id",
      });
  }),
    (producto.associate = (models) => {
      producto.belongsTo(models.usuario, {
        as: "usuario",
        foreignKey: "admin_id",
      });
    }),
    (producto.associate = (models) => {
      producto.belongsTo(models.venta, {
        as: "venta",
        foreignKey: "Producto_id",
      });
    });

  return Nota;
};
