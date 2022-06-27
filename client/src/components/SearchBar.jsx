import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByTitle } from "../actions";

export default function SearchBar (){
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");

    function handleInputChange(e){
        e.preventDefault();
        setTitle(e.target.value);
        console.log(title)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getRecipesByTitle(title))
    }
    //para borrar el input = value={title}
    return (
        <div>
            <input 
                type='text' 
                placeholder="Buscar..."
                onChange={(e) => handleInputChange(e)}
            />
            <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}