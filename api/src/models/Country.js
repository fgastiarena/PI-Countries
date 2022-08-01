const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('country', {
        id: { //Si no especifico el id, sequelize por default me crea uno numérico que va a ir en aumento de a uno
            type: DataTypes.STRING(3),
            allowNull: false, //para determinar que este campo si o si es requerido !!
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        flags: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        continents: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        capital: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subregion: {
            type: DataTypes.STRING,
        },
        area: {
            type: DataTypes.FLOAT,
        },
        population: {
            type: DataTypes.INTEGER,
        }
    });
};