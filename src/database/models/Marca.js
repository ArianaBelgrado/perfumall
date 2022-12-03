module.exports = function (sequelize, DataTypes) {
    const alias = "Marca";
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING(100),
        },
    };
    const config = {
        tableName: "marca",
        timestamps: false,
    };
    const Marca = sequelize.define(alias, cols, config);

    Marca.associate = (models) => {
        Marca.hasMany(models.Producto, {
            as: "producto",
            foreignKey: "marca_id",
        });
    };

    return Marca;
};
