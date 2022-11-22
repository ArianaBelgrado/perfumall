const { BelongsTo } = require("sequelize");

function usersData(sequelize, DataTypes){
    let u = "usuario";

    let col = {
        id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
        nombre: {type: DataTypes.STRING},
        apellido: {type: DataTypes.STRING},
        email: {type: DataTypes.STRING},
        clave: {type: DataTypes.STRING},
        admin: {type: DataTypes.BOOLEAN},
        superadmin: {type: DataTypes.BOOLEAN}
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
        })
    }
    }
    return User;
}

module.exports= usersData;