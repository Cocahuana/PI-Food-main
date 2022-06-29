const express = require('express');
const { Diet } = require("../db");

const { dietTypesFromDb } = require('../controllers/dietTypes')

const router = express();


router.get("/", async (req, res) => {
    // Obtener todos los tipos de dieta posibles
    // En una primera instancia, cuando no exista ninguno (findOrCreate), 
    // deberán precargar la base de datos con los tipos de datos 
    // indicados por spoonacular acá
    try{
            // const dietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&${DETAIL_URL}&${BRING_ONLY_100}`);
            // const diets = dietsApi.data.results.map(e => e.diets);
                //Obtengo todas las dietas de cada receta
            // console.log(diets);
                //Por cada array del array diets, las saco todas y las pongo sobre un mismo nivel de profundidad
            // const dietsEach = diets.flatMap(e => e);
                // const dietsEach = diets.map(e => {
                //     for(let i = 0; i < e.length; i++) return e[i]})
            // console.log(dietsEach);
        //Las dietas traidas desde la api no son optimas por lo que hay que hardodearlas xd

        //Por cada indice de la dieta:
        // Busco si está, sino, la creo
        
            //Ver: quizas debe concatenarse todo lo hardcodeado y lo que 
            //se busca de la api y hacer un forEach a ese resultado...
        dietTypesFromDb.forEach(e => {
            //Si hay una receta sin tipo de dieta, no la busco ni la creo
            if(e !== undefined){
                Diet.findOrCreate({
                    where: { dietName: e }
                })
            }
        });
        const allDiets = await Diet.findAll();
        res.send(allDiets);
        //res.status(200).send(totalDiets);
    }
    catch(error){
        res.status(400).json(error.message);
    }
})

module.exports = router;