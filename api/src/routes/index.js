const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipesRouter = require('./recipes');
const recipesDetailRouter = require('./recipesDetail');
const dietsRouter = require('./diets');
const recipePostRouter = require('./recipePost');


const router = Router();

//next() indica el siguiente middleware de la accion

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/getRecipes', recipesRouter);
router.use('/getDetails', recipesDetailRouter);
router.use('/getAllDiets', dietsRouter);
router.use('/postRecipe', recipePostRouter);

module.exports = router;