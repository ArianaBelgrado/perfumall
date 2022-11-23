function ventaData(sequelize, DataTypes){
    let v = "venta";

    let column = {
        id: {
            type:DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false
        },
        monto_unitario: {
            type: DataTypes.FLOAT,
            allowNull: false},
        cantidad: {
            type: DataTypes.INTEGER(100),
            allowNull: false
        }
    }

    let config= {camelCase: false, timestamps: false};

    const Venta= sequelize.define(v, column, config);

    Venta.associate = function(modelos){
        Venta.belongsTo(modelos.usuario, {
            as:"usuarios",
            foreignKey:"Usuario_id"
        });
    Venta.associate= function(modelos){
        Venta.hasmany(modelos.producto, {
            as:"productos",
            foreignKey: "Producto_id"
        });
    Venta.associate= function(modelos){
        Venta.belongsTo(modelos.detalle_venta, {
            as:"detalle_venta",
            foreignKey:"Detalle_venta_id"
        })
    }
    }
    }

    return Venta;
}

module.exports= ventaData;