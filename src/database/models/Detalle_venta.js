module.exports = function (sequelize, DataTypes) {
    let alias = "Detalle_venta";
    let cols = {
        id: {
            type: DataTypes.INTEGER(),
            primaryKey: true,
            autoIncrement: true,
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        direccion_destino: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        provincia_destino: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        retiro: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        monto_total: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    };
    let config = {
        tableName: "Detalle_venta",
        timestamps: false,
    };
    let Detalle_venta = sequelize.define(alias, cols, config);

    Detalle_venta.associate = (models) => {
        Detalle_venta.hasMany(models.Venta, {
            as: "venta",
            foreignKey: "detalle_venta_ID",
        });
    };

    return Detalle_venta;
};
