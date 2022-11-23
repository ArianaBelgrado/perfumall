module.exports = function(sequelize, DataTypes){
    const alias = "detalle_venta"
    const cols = {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        direccion_destino: {
            type: DataTypes.STRING(100),
            allowNull: false
        }, 
        ciudad_destino: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        retiro: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }
    const config = {
        tableName: "detalle_venta",
        timestamps: true,
    }
    const detalle_venta = sequelize.define(alias, cols, config);

    detalle_venta.associate = (models) => {

        detalle_venta.hasMany(models.venta, {
            as: 'venta', 
            foreignKey: 'Detalle_venta_id'
        })

    }


    return Nota
}