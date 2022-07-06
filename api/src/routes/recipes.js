require('dotenv').config();
const express = require('express');

//importar controllers
const { getAllRecipes } = require('../controllers/recipes');

const router = express();

router.get("/", async (req, res) => {
    try{
        //getRecipesValidation(req.query);
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
                        id: e.id,
                        img: e.img,
                        title: e.title,
                        healthScore: e.healthScore,
                        dietTypes: e.dietTypes ? e.dietTypes : e.diets.map(e => e.dietName),
                    }
                })
                res.status(200).send(recipesFiltered); 
            }
            else{
                //Si no existe ninguna receta mostrar un mensaje adecuado
                res.status(200).send(filtered); 
            }
        }
        // Si no se filtra la receta (valor por default al cargar la pagina web), traeme todas
        else{            
            let recipesFiltered = recipesTotal.map(e => {
                return {
                    id: e.id,
                    img: e.img,
                    title: e.title,
                    healthScore: e.healthScore,
                    dietTypes: e.dietTypes ? e.dietTypes : e.diets.map(e => e.dietName),
                }
            })
            return res.status(200).send(recipesFiltered); 
        }
    }
    catch(error){ return res.status(400).json(error.message); }
});




module.exports = router;