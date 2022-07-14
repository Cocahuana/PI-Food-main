const { STRING } = require('sequelize');
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	// Usar UUID para no sobreescribir lo que
	// llega de la api con la receta creada en la BD
	sequelize.define('recipe', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING(40),
			allowNull: false,
		},
		summary: {
			type: DataTypes.STRING(800),
			allowNull: false,
		},
		img: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
		healthScore: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		stepFromDb: {
			type: DataTypes.STRING(1024),
			allowNull: true,
		},
		//Separamos lo recibido de la API de lo creado en la BD
		createdInDb: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'Created by Me',
		},
	});
};
