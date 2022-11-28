module.exports = function (sequelize, DataTypes) {
  let alias = "User";
  let cols = {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagenPerfil: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    ciudad: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    provincia: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    local_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  };

  let config = { camelCase: false, timestamps: false, tableName: "usuario" };

  let User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    User.belongsTo(models.Local, {
      as: "local",
      foreignKey: "local_id",
    });

    User.associate = function (models) {
      User.hasMany(models.Venta, {
        as: "ventas",
        foreignKey: "usuario_id",
      });
      User.associate = function (models) {
        User.hasMany(models.Producto, {
          as: "producto",
          foreignKey: "admin_id",
        });
      };
    };
  };
  return User;
};
