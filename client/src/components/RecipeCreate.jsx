import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import { postRecipe, getDiets } from "../actions/index";
import { validate } from "./validations.js";


export default function RecipeCreate(){
    const dispatch = useDispatch();
    const history = useHistory();

    //Necesito renderizar las dietas
    useEffect(() => {
        dispatch(getDiets());
    }, []);

    const diets = useSelector((state) => state.diets);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        title: "",
        summary: "",
        healthScore: '',
        stepFromDb: "",
        img: "",
        diet: [],
        //Creo una variable solo para mostrar lo que busco y que no me rompa el back
        //showDiet: [],
    })

    function handleChange(e) {
        let { name, value } = e.target;
        setInput({
            ...input,
            [name] : value,
        })
        setErrors(validate({
            ...input,
            [name] : value
        }))
        console.log(input);
    }

    function handleSelect(e){
        let { value } = e.target;
            setInput({
                ...input,
                //Cada vez que haces un click en el select, se va concatenando en diet
                //diet: [...input.diet, e.target.value],
                diet : [...input.diet, value],
                //Creo una variable solo para mostrar lo que busco y que no me rompa el back
                //showDiet: [...input.diet, e.target.value],
            });
    }

    // function handleChangeCheckbox(e){        
    //     let { value, checked } = e.target;
    //     if(checked){
    //         setInput({
    //             ...input,
    //             //Cada vez que haces un click en el select, se va concatenando en diet
    //             //diet: [...input.diet, e.target.value],
    //             diet : [...input.diet, value],
    //             //Creo una variable solo para mostrar lo que busco y que no me rompa el back
    //             //showDiet: [...input.diet, e.target.value],
    //         });
            
    //     }   
    // }


    function handleSubmit(e){
        e.preventDefault();

         if (Object.values(errors).length > 0) {
             alert("Please complete the information required");
         } else if (
            input.title === '' ||
            input.summary === '' ||
            input.healthScore < 0 && input.healthScore > 100 ||
            input.stepFromDb === '' ||
            input.img === '' ||
            input.diet.length === 0) {
            alert("Please complete the form");}
        else {
            dispatch(postRecipe(input));
            alert('New recipe added successfully!')
            setInput({
                title: '',
                summary: '',
                healthScore: '',
                stepFromDb: '',
                diet: []
            });
            history.push('/home')
        }
    }

    //useHistory es un metodo del router que lo que hace es redirigirme a la ruta que yo le diga

    

    return (
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Creemos una receta!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Titulo:</label>
                    <input
                        type= "text"
                        value= {input.title}
                        name= "title"
                        placeholder="Fried Chicken..."
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    {
                        errors.title && (
                            <p className="error">{errors.title}</p>
                        )
                    }
                </div>
                <div>
                    <label>Resumen:</label>
                    <input
                        type= "text"
                        value= {input.summary}
                        name= "summary"
                        placeholder="A very juicy chicken for all the family..."
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    {
                        errors.summary && (
                            <p className="error">{errors.summary}</p>
                        )
                    }
                </div>
                <div>
                    <label>Health Score:</label>
                    <input
                        type= "number"
                        value= {input.healthScore}
                        name= "healthScore"
                        placeholder="70"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                {
                        errors.healthScore && (
                            <p className="error">{errors.healthScore}</p>
                        )
                    }
                <div>
                    <label>Steps:</label>
                    <input
                        type= "text"
                        value= {input.stepFromDb}
                        name= "stepFromDb"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div>
                    <label>Img:</label>
                    <input
                        type= "text"
                        value= {input.img}
                        name= "img"
                        placeholder="http://..."
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                {
                        errors.img && (
                            <p className="error">{errors.img}</p>
                        )
                    }
                <div>
                {/* {
                    diets.map(e => <div>
                                        <label>{e.dietName}</label>
                                            <input type='checkbox' value={e.dietName} name={e.dietName} onChange={(e) => handleChangeCheckbox(e)} />
                                    </div>)

                } */}
                </div>
                
                <select onChange={(e) => handleSelect(e)}>
                    {
                        diets?.map((e) => {
                            //Se itera cada e con su dietName en la DB
                            return(
                                <option value={e.dietName}>{e.dietName}</option>
                            )
                        })
                    }
                </select>
                {
                    //Aca lo que hago en renderizar lo que voy seleccionando en el select
                }
                <ul>
                    <li>
                        {input.diet.map(e => e + ", ")}
                    </li>
                </ul>

                <button type='submit'>Crear Receta</button>
            </form>
        </div>
    )
}
