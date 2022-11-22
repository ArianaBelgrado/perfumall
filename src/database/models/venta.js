function ventaData(sequelize, DataTypes){
    let v = "venta";

    let column = {
        id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
        monto_unitario: {type: DataTypes.FLOAT},
        cantidad: {type: DataTypes.INTEGER}
    }

    let config= {camelCase: false, timestamps: false};

    const Venta= sequelize.define(v, column, config);

    Venta.associate = function(modelos){
        Venta.belongsTo(modelos.usuario, {
            as:"usuarios",
            foreignKey:"Usuario_id"
        })
    }

    return Venta;
}

module.exports= ventaData;