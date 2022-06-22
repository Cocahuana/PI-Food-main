// dotenv se usa para llamar al .env
require('dotenv').config();
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
//Cuando usamos axios hay que usar data, ya que es desde donde nos 
// traen los datos (data) es un objeto y dentro esta el resultado de la busqueda
// Importo la api key desde .env
const { API_KEY } = process.env;
const BRING_ONLY_100 = "number=100";
const DETAIL_URL = "addRecipeInformation=true";
const { Recipe, Diet} = require("../db");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const API_URL = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&${DETAIL_URL}&${BRING_ONLY_100}`);
    //return API_URL;
    const apiInfo = await API_URL.data.results.map(e => {
        return {
            id: e.id,
            title: e.title,
            healthScore: e.healthScore,
            img: e.image,
            dietTypes: e.diets,
            dishTypes: e.dishTypes,
            summary: e.summary,
            analyzedInstructions: e.analyzedInstructions[0]?.steps.map(e => {
                return {
                    number: e.number,
                    step: e.step
                }
            })
        }
    })
    return apiInfo;
    
};

const getDbInfo = async () => {
    return await Recipe.findAll({
        //Include takes an array of objects
        include:{
            model: Diet,
            attributes: ['dietName'],
            through: {
                attributes: [],
            }
        }
    });
};

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
};

const getApiDetail = async(id) => {
    const API_URL = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
    return API_URL.data;
}

const getDbById = async (id) => {
    return await Recipe.findByPk(id, {
        include: {
            model: Diet,
            attributes: ['dietName'],
            through: {
                attributes: [],
            }
        }
    });
}


router.get("/getRecipes", async (req, res) => {
    try{
        const { title } = req.query;
        let recipesTotal = await getAllRecipes();
        if(title){
            // filtro por query y traigo todas las recetas que coinciden con el parametro del title
            // Si buscas x query lo mismo en la url: 1er busqueda : status(200), 2da busqueda: status(304) esto último es un erro en cache
            // Esto ultimo debe solucionarse borrando el cache cuando se haga una peticion
            let filtered = await recipesTotal.filter(t => t.title.toLowerCase().includes(title.toLowerCase()));

            if(filtered.length){
                let recipesFiltered = filtered.map(e => {
                    return {
                        // Ruta principal por front
                        img: e.img,
                        title: e.title,
                        dietTypes: e.dietTypes ? e.dietTypes : e.diets.map(e => e),
                    }
                })
                return res.status(200).send(recipesFiltered); 
            }
            //Si no existe ninguna receta mostrar un mensaje adecuado
            return res.status(404).send("No se encontró la receta"); 
        }
        // Si la receta no existe, traer todas.
        else{
            let recipesFiltered = recipesTotal.map(e => {
                return {
                    img: e.img,
                    title: e.title,
                    dietTypes: e.dietTypes ? e.dietTypes : e.diets.map(e => e.title),
                }
            })
            return res.status(200).send(recipesFiltered); 
        }
    }
    catch{ return res.status(400).send("Entrada no valida") }
});

router.get("/getDetails/:id", async (req, res) => {
    // Obtener el detalle de una receta en particular => El detalle se trae por params
    const {id} = req.params;
    try{
        if(id.length > 16){
            console.log(id)
            let recipesDbById = await getDbById(id);
            res.status(200).json(recipesDbById);
        }
        else{
            const numberedId = parseInt(id); 
            let detailedRecipe = await getApiDetail(numberedId);
            if(detailedRecipe){
                let recipeDetailed = {
                    title: detailedRecipe.title,
                    img: detailedRecipe.img,
                    healthScore: detailedRecipe.healthScore,
                    //DietTypes es un arreglo de Strings
                    dietTypes: detailedRecipe.dietTypes ? detailedRecipe.dietTypes : detailedRecipe.diets.map(e => e),
                    dishTypes: detailedRecipe.dishTypes,
                    summary: detailedRecipe.summary,
                    analyzedInstructions: detailedRecipe.analyzedInstructions[0]?.steps.map(e => {
                        return {
                            number: e.number,
                            step: e.step
                        }
                    })
                }
                return res.status(200).send(recipeDetailed);
            }
            res.status(404).send("No se encontró la receta con ese id");
        }
    }
    catch(error){ res.status(400).json(error.message) }
    // Debe traer solo los datos pedidos en la ruta de detalle de receta
    
    // Incluir los tipos de dieta asociados
})

router.get("/getAllDiets", async (req, res) => {
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
        const dietTypesFromDb = 
            [
                'gluten free',
                'ketogenic', 
                'vegetarian', 
                'lacto vegetarian',
                'ovo vegetarian', 
                'vegan', 
                'pescetarian', 
                'paleo', 
                'primal', 
                'low fodmap', 
                'whole30'
            ];
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

router.post("/postRecipe", async (req, res) => {
    // Recibe los datos recolectados desde el formulario controlado de la 
    // ruta de creación de recetas por body
    try{
        const { title, summary, healthScore, analyzedInstructions, dietTypes } = req.body;
        const newRecipe = await Recipe.create({
            title,
            summary,
            healthScore,
            analyzedInstructions,
        })
    
        let dietTypesRecipeForDb = await Diet.findAll({
            where: {dietName: dietTypes}
        })
        console.log(dietTypesRecipeForDb);
        newRecipe.addDiet(dietTypesRecipeForDb);
        res.status(200).send(newRecipe);
    }
    catch(error){
        res.status(400).json(error.message);
    }
    // Crea una receta en la base de datos relacionada con sus tipos 
    // de dietas.
})

module.exports = router;
