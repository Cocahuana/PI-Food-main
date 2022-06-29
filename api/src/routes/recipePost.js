const { Router } = require('express');
const { Recipe, Diet } = require('../db')
const router = Router();

router.post("/", async (req, res) => {
    // Recibe los datos recolectados desde el formulario controlado de la 
    // ruta de creación de recetas por body
    try{
        let { title, img, summary, healthScore, analyzedInstructions, diet } = req.body;
        let newRecipe = await Recipe.create({
            title,
            img,
            summary,
            healthScore,
            analyzedInstructions,
        });

        console.log("dietTypes: " + diet);

        let dietTypesRecipeForDb = await Diet.findAll({
            where: {dietName: diet}
        });

        console.log("dietType: " + dietTypesRecipeForDb);
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