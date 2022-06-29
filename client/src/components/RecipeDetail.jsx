import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from "../actions";
import { useEffect } from "react";

export default function RecipeDetail(props){
    const dispatch = useDispatch();
    const id = props.match.params.id;
    console.log("Id: " + id);

    useEffect(() => {
        dispatch(getDetails(id));
    }, [dispatch, id])

    const myRecipe = useSelector((state) => state.recipesDetail)

    return(
        <div key={id}>
            <h1>Receta: {myRecipe.title}</h1>            
            <img src={myRecipe.img} alt="img not found" width="400px" height="500px"/>

            <h3>Health Score: {myRecipe.healthScore}</h3>
            <h3>Tipo de plato: {myRecipe.dishTypes}</h3>
            <h3>Tipo de dieta: {myRecipe.dietTypes}</h3>
            <p>Summary: {myRecipe.summary}</p>
            <h3 className="texts">Steps: </h3>
                <ul className="steps">
                    {
                        Array.isArray(myRecipe.analyzedInstructions) ? 
                        myRecipe.analyzedInstructions.map(e => {
                            return(
                                <div>
                                    <p><strong>{e.number}</strong></p>
                                    <li key={e.number}>{e.step}</li>
                                </div>
                                )
                        }) :
                        <li>{myRecipe.steps}</li>
                    }
                </ul>
            <Link to= '/home'>
                <button>
                    Volver
                </button>
            </Link>
        </div>
    )
}