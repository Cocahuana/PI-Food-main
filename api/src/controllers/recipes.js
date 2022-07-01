// dotenv se usa para llamar al .env
//Cuando usamos axios hay que usar data, ya que es desde donde nos 
// traen los datos (data) es un objeto y dentro esta el resultado de la busqueda
// Importo la api key desde .env
require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const BRING_ONLY_100 = "number=10";
const DETAIL_URL = "addRecipeInformation=true";
const { Recipe, Diet} = require("../db");

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
    const recipeDb = await Recipe.findAll({
        //Include takes an array of objects
        include:{
            model: Diet,
            attributes: ['dietName'],
            through: {
                attributes: [],
            }
        }
    });
    return recipeDb.map(e => {
        return{
            id: e.id,
            title: e.title,
            img: e.img,
            summary: e.summary,
            healthScore: e.healthScore,
            dietTypes: e.diets.map(e => e.dietName),
        }
    })
};

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    console.log(dbInfo);
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

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllRecipes,
    getApiDetail,
    getDbById,
}