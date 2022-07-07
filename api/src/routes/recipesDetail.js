require('dotenv').config();
const express = require('express');


//importar controllers
const { 
    getApiDetail,
    getDbById, 
} = require('../controllers/recipes');
const {
    getRecipeByUUIDValidation
} = require('../controllers/validations');


const router = express();



router.get("/:id", async (req, res) => {
    
    // Obtener el detalle de una receta en particular => El detalle se trae por params
    const {id} = req.params;
    try{
        if(id.length > 16){
            getRecipeByUUIDValidation(id);
            console.log(id)
            let recipesDbById = await getDbById(id);
            if(recipesDbById){
                let obj = {
                    id: recipesDbById.id,
                    title: recipesDbById.title,
                    img: recipesDbById.img,
                    healthScore: recipesDbById.healthScore,
                    dietTypes: recipesDbById.diets.map(e => e.dietName),
                    summary: recipesDbById.summary,
                    stepFromDb: recipesDbById.stepFromDb,
                }
                console.log(obj);
                res.status(200).send(obj);
            }
        }
        else{
            if(id){
                let type = 'id';
                let idParameter = /^[0-9]+$/;
                if(!idParameter.test(id)){
                    throw new Error (`The ${type} is: ${id} which is not a valid id. Must have only numbers. Example of valid id: 660306, 77017, etc`);
                }
            }
            
            let numberedId = parseInt(id);
            let detailedRecipe = await getApiDetail(numberedId);
            if(detailedRecipe){
                let recipeDetailed = {
                    id: detailedRecipe.id,
                    title: detailedRecipe.title,
                    img: detailedRecipe.image,
                    healthScore: detailedRecipe.healthScore,
                    //DietTypes es un arreglo de Strings
                    dietTypes: detailedRecipe.dietTypes ? detailedRecipe.dietTypes : detailedRecipe.diets.map(e => e),
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


module.exports = router;