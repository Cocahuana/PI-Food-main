const { Router } = require('express');
const { Recipe, Diet } = require('../db')
const router = Router();
const postRecipeValidations = require('../controllers/validations');

router.post("/", async (req, res) => {
    // Recibe los datos recolectados desde el formulario controlado de la 
    // ruta de creación de recetas por body
    try{
        postRecipeValidations.postRecipeValidation(req.body);
        
        let { title, img, summary, healthScore, stepFromDb, diet } = req.body;
        let newRecipe = await Recipe.create({
            title,
            img,
            summary,
            healthScore,
            stepFromDb,
        });

        let dietTypesRecipeForDb = await Diet.findAll({
            where: {dietName: diet}
        });

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