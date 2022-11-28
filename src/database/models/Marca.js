module.exports = function(sequelize, DataTypes){
    const alias = "marca"
    const cols = {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false

        }
       
    }
    const config = {
        tableName: "marca",
        timestamps: true,
    }
    const Marca = sequelize.define(alias, cols, config);

    Marca.associate = (models) => {

        Marca.belongsTo(models.producto, {
            as: 'producto',
            foreignKey: 'Marca_id'
        })

    }

 
    return Marca
}
