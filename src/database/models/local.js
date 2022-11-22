const { HasMany } = require("sequelize");

function localData(sequelize, DataTypes){
    let l = "local";

    let co = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: DataTypes.STRING},
        direccion: {type: DataTypes.STRING},
        telefono: {type: DataTypes.INTEGER}
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