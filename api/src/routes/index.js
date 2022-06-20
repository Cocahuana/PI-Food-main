// dotenv se usa para llamar al .env
require('dotenv').config();
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
// Importo la api key desde .env
const { API_KEY } = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/getRecipe", async (req, res) => {

    const result = 
        await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`);

    //Obtener un listado de las recetas que contengan la 
    //palabra ingresada como query parameter (?)


    //Cuando usamos axios hay que usar data, ya que es desde donde nos 
    // traen los datos (data) es un objeto y dentro esta el resultado de la busqueda
    res.json(result.data);

    //Si no existe ninguna receta mostrar un mensaje adecuado
})

router.get("/getDetails", (req, res) => {
    // Obtener el detalle de una receta en particular

    // Debe traer solo los datos pedidos en la ruta de detalle de receta
    
    // Incluir los tipos de dieta asociados
})

router.get("/getAllDiets", (req, res) => {
    // Obtener todos los tipos de dieta posibles

    // En una primera instancia, cuando no exista ninguno, 
    // deberán precargar la base de datos con los tipos de datos 
    // indicados por spoonacular acá
})

router.post("/postRecipe", (req, res) => {
    // Recibe los datos recolectados desde el formulario controlado de la 
    // ruta de creación de recetas por body

    // Crea una receta en la base de datos relacionada con sus tipos 
    // de dietas.
})

module.exports = router;
