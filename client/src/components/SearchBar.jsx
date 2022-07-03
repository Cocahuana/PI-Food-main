import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByTitle } from "../actions";
import "./SearchBar.css";

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
        <div className="flex space-evenly align-center searchbar-div">
            <input
                className="searchbar-input" 
                type='text' 
                placeholder="Homemade Garlic..."
                onChange={(e) => handleInputChange(e)}
            />
            <button className="searchbar-button" type='submit' onClick={(e) => handleSubmit(e)}>SEARCH</button>
        </div>
    )
}