module.exports = function (sequelize, DataTypes) {
    const alias = "Marca"
    const cols = {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false

        }

    }
    const config = {
        tableName: "marca",
        timestamps: false,
    }
    const Marca = sequelize.define(alias, cols, config);

    Marca.associate = (models) => {

        Marca.hasMany(models.Producto, {
            as: 'producto',
            foreignKey: 'marca_id'
        })

    }


    return Marca
}
