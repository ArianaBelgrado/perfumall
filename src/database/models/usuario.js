const { BelongsTo } = require("sequelize");

function usersData(sequelize, DataTypes){
    let u = "usuario";

    let col = {
        id: {
            type:DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        clave: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        superadmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false}
    }

    let cfig= {camelCase: false, timestamps: false};

    const User= sequelize.define(u, col, cfig);

    User.associate = function(modelos){
        User.belongsTo(modelos.local, {
            as: "locales",
            foreignKey:"Local_id"
        });

    User.associate = function(modelos){
        User.hasmany(modelos.venta, {
            as:"ventas",
            foreignKey:"Usuario_id"
        });
        User.associate = function(modelos){
            User.hasmany(modelos.producto, {
                as:"producto",
                foreignKey: "admin_id"
            })
        }
    }
    }
    return User;
}

module.exports= usersData;