function localData(sequelize, DataTypes) {
  let alias = "Local";

  let cols = {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
  };

  let cfg = { camelCase: false, timestamps: false, tableName: "Local" };

  const Local = sequelize.define(alias, cols, cfg);

  Local.associate = function (modelos) {
    Local.hasMany(modelos.User, {
      as: "usuarios",
      foreignKey: "local_id",
    });
  };

  return Local;
}

module.exports = localData;
