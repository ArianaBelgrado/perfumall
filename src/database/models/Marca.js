module.exports = function (sequelize, DataTypes) {
    const alias = "Marca";
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(100),
        },
    };
    const config = {
        tableName: "Marca",
        timestamps: false,
    };
    const Marca = sequelize.define(alias, cols, config);

    Marca.associate = function (models) {
        Marca.hasMany(models.Producto, {
            as: "producto",
            foreignKey: "marca_id",
        });
    };

    return Marca;
};
