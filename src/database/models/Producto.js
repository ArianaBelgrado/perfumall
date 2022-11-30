module.exports = function (sequelize, DataTypes) {
    const alias = "Producto";
    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        precio: {
            type: DataTypes.MEDIUMINT(500000),
            allowNull: true,
        },
        fecha_creacion: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        fecha_baja: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        imagen: {
            type: DataTypes.STRING(300),
            allowNull: true,
        },
        admin_id: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
        },
        marca_id: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    };

    const config = {
        tableName: "producto",
        timestamps: false,
        camel_case: false,
    };

    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = (models) => {
        Producto.belongsTo(models.Marca),
        {
            as: "marca",
            foreignKey: "marca_id",
        };
    };
    Producto.associate = (models) => {
        Producto.belongsTo(models.Usuario),
        {
            as: "usuario",
            foreignKey: "admin_id",
        };
    };
    Producto.associate = (models) => {
        Producto.hasMany(models.Venta),
        {
            as: "venta",
            foreignKey: "producto_id",
        };
    };

    return Producto;
};
