import {
    GET_RECIPES, 
    FILTER_BY_DIETS, 
    GET_RECIPES_BY_TITLE, 
    GET_DIETS, 
    ORDER_BY_TITLE,
    ORDER_BY_HEALTHSCORE,
    POST_RECIPE,
    GET_RECIPE_DETAILS,
} from '../actions'
//Armamos el estado inicial
const initialState = {
    recipes: [],
    //Estado para que siempre tenga todas las recetas, sino lo tengo, pierdo los estados despues de hacer un filtrado
    allRecipes: [],
    diets: [],
    recipesDetail: [],
}


function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_RECIPES:
            return {
                ...state,
                //Guardo todas las recetas en recipes
                recipes: action.payload,
                //Aca tambien guardo todas las recetas, solo que uso este para no perder el estado de las mismas al filtrar
                allRecipes: action.payload
            }
        case FILTER_BY_DIETS:
            const allRecipes = state.allRecipes;
            //Si en el select pongo que traiga todo, entonces que me muestre todas las recetas
            //Si no, que me filtre por tipo de dieta que me llega
            const statusFiltered = action.payload === 'All' ? 
                allRecipes :
                //allRecipes.filter(e => e === action.payload);
                forInDiets();
                
                function forInDiets(){
                    let newArray = [];
                    for(let key in allRecipes) {
                        allRecipes[key].dietTypes.map(e => {
                            if(e === action.payload){
                                newArray.push(allRecipes[key]);
                            }
                        })
                    }
                    return newArray;
                }
            return {
                ...state,
                recipes: statusFiltered
            }
        case GET_RECIPES_BY_TITLE:
            return{
                ...state,
                // recipes es lo que se está renderizando
                recipes: action.payload
            }
        case GET_DIETS:
            return{
                ...state,
                diets: action.payload
            }
        case POST_RECIPE:
            return{
                ...state,
                recipe: [action.payload, ...state.recipes]
            }
        case ORDER_BY_TITLE:
            let sortedTitle = action.payload === 'ascendente' ?
                state.recipes.sort(function (a, b) {
                    if(a.title > b.title){
                        return 1;
                    }
                    if(b.title > a.title){
                        return -1;
                    }
                    return 0;
                }) :
                state.recipes.sort(function(a, b){
                    if(a.title > b.title){
                        return -1;
                    }
                    if(b.title > a.title){
                        return 1;
                    }
                    return 0;
                });
            return {
                ...state,
                recipes: sortedTitle
            }
        case ORDER_BY_HEALTHSCORE:
            let sortedHealthScore = action.payload === 'mostHS' ?
                state.recipes.sort(function (a, b) {
                    if(a.healthScore > b.healthScore){
                        return -1;
                    }
                    if(b.healthScore > a.healthScore){
                        return 1;
                    }
                    return 0;
                }) :
                state.recipes.sort(function(a, b){
                    if(a.healthScore > b.healthScore){
                        return 1;
                    }
                    if(b.healthScore > a.healthScore){
                        return -1;
                    }
                    return 0;
                });
            return {
                ...state,
                recipes: sortedHealthScore
            }
        case GET_RECIPE_DETAILS:
            return{
                ...state,
                recipesDetail: action.payload
            }
        default: 
            return state;
    }
}

export default rootReducer;