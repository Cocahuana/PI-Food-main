const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  // Usar UUID para no sobreescribir lo que
  // llega de la api con la receta creada en la BD
  sequelize.define('diet', {
    // No paso el id porque lo genera automaticamente la BD
    // Va a generar un id numerico
    dietName:{
        type: DataTypes.STRING,
        allowNull: true,
    },
  });
};