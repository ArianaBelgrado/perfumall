function ventaData(sequelize, DataTypes) {
    let alias = "Venta";

    let columns = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        monto_unitario: {
            type: DataTypes.DOUBLE,
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
        detalle_venta_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    };

    let config = { camelCase: false, timestamps: false, tableName: "Venta" };

    const Venta = sequelize.define(alias, columns, config);

    Venta.associate = function (models) {
        Venta.belongsTo(models.User, {
            as: "usuarios",
            foreignKey: "usuario_id",
        });
        Venta.associate = function (models) {
            Venta.belongsTo(models.Producto, {
                as: "productos",
                foreignKey: "producto_id",
            });
            Venta.associate = function (models) {
                Venta.belongsTo(models.Detalle_venta, {
                    as: "detalle_venta",
                    foreignKey: "detalle_venta_ID",
                });
            };
        };
    };

    return Venta;
}

module.exports = ventaData;
