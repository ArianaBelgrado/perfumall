const { HasMany } = require("sequelize");

function localData(sequelize, DataTypes){
    let l = "local";

    let co = {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        telefono: {
            type: DataTypes.INTEGER(10),
            allowNull:false
        }
    }

    let cfg= {camelCase: false, timestamps: false};

    const Local= sequelize.define(l, co, cfg);

    Local.associate= function(modelos){
        Local.HasMany(modelos.usuario, {
            as: "usuarios",
            foreignKey: "Local_id"
        })
    }

    return Local;
}

module.exports= localData