import axios from 'axios';
export const GET_RECIPES = 'GET_RECIPES';
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS';
export const GET_RECIPES_BY_TITLE = 'GET_RECIPES_BY_TITLE';
export const GET_DIETS = 'GET_DIETS';
export const POST_RECIPE = 'POST_RECIPE';
export const ORDER_BY_TITLE = 'ORDER_BY_TITLE';
export const ORDER_BY_HEALTHSCORE = 'ORDER_BY_HEALTHSCORE';
export const GET_RECIPE_DETAILS = 'GET_RECIPE_DETAILS';
export const LOADING = 'LOADING';

export function getRecipes(){
    return async function(dispatch){
        dispatch({
            type: LOADING,
        })

        var json = await axios.get("http://localhost:3001/getRecipes",{
            
        });
        
        // console.log(Object.values(json.data));

        return dispatch({
            type: GET_RECIPES,
            payload: json.data
        })
    }
}

export function filterByDiets(payload){
    // console.log(payload); //All
    return{
        type: FILTER_BY_DIETS,
        payload
    }
}

export function getRecipesByTitle(title){
    return async function (dispatch){
        try{
            
            dispatch({
                type: LOADING,
            })
            var json = await axios.get(`http://localhost:3001/getRecipes?title=` + title)
            return dispatch({
                type: GET_RECIPES_BY_TITLE,
                //json.data devuelve lo que nos da la ruta de arriba, ya filtrado por nombre
                payload: json.data
            })
        }
        catch(error){
            console.log(error);
        }
    }
}

export function getDiets(){
    return async function(dispatch){
        var info = await axios.get(`http://localhost:3001/getAllDiets`, {

        });
        return dispatch({
            type: GET_DIETS,
            payload: info.data
        })
    }
}

export function postRecipe(payload){
    return async function(dispatch){
        try{
            var response = await axios.post(`http://localhost:3001/postRecipe`, payload);
            //console.log("postRecipe:" + response.data);
            return dispatch({
                type: POST_RECIPE,
                payload: response.data
            })
        }
        catch(error){
            console.log(error);
        }
        
    }
}

export function orderByTitle(payload){
    return{
        type: ORDER_BY_TITLE,
        payload
    }
}

export function orderByHealthScore(payload){
    return{
        type: ORDER_BY_HEALTHSCORE,
        payload
    }
}

export function getDetails(id){
    // console.log("id actions: " + id);
    return async function(dispatch){
        
        try{
            dispatch({
                type: LOADING,
            })
            var detail = await axios.get(`http://localhost:3001/getDetails/${id}`);
            return dispatch({
                type: GET_RECIPE_DETAILS,
                payload: detail.data
            })
        }
        catch(error){
            window.location.href="/error404";
        }
    }
}