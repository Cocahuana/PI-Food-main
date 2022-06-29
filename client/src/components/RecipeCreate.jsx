import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import { postRecipe, getDiets } from "../actions/index";

function validate(input){
    let errors = {};
    if(!input.title){
        errors.title = 'A title is required';
    } else if (!input.summary || input.summary.length > 5){
        errors.summary = 'A summary is required';
    }
    return errors;
}


export default function RecipeCreate(){
    const dispatch = useDispatch();
    const history = useHistory();

    const diets = useSelector((state) => state.diets);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        title: "",
        summary: "",
        healthScore: "",
        analyzedInstructions: [],
        img: "",
        diet: [],
        //Creo una variable solo para mostrar lo que busco y que no me rompa el back
        showDiet: [],
    })

    // function handleClickAdd(e){
    //     setInput({
    //         ...input,
    //         steps: [...input.steps,
    //             {
    //                 number: input.number,
    //                 step: input.step
    //             }
    //         ],
    //         number: input.number+1
    //     })
    // }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(input);
    }

    function handleCheckbox(e){
        if(e.target.checked){
            setInput({
                ...input,
                diet: e.target.value
            })
        }
    }

    function handleSelect(e){
            setInput({
                ...input,
                //Cada vez que haces un click en el select, se va concatenando en diet
                diet: [...input.diet, e.target.value],
                //Creo una variable solo para mostrar lo que busco y que no me rompa el back
                showDiet: [...input.diet, e.target.value],
            });
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log("submit: " + Object.values(input));
        //Chequear si el estado de los errores está vacio, si lo está, que te deja hacer un dispatch, 
        //sino que no te lo active al submit
        
        dispatch(postRecipe(input));
        alert("La receta ha sido creada exitosamente!");
        setInput({
            title: "",
            summary: "",
            healthScore: "",
            analyzedInstructions: "",
            img: "",
            diet: [],
            //Creo una variable solo para mostrar lo que busco y que no me rompa el back
            showDiet: [],
        });
        //history sirve para ir a otra pagina cuando termine una accion
        history.push('/home');
    }

    //useHistory es un metodo del router que lo que hace es redirigirme a la ruta que yo le diga

    //Necesito renderizar las dietas
    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

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
                        onChange={(e) => handleChange(e)}
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
                        onChange={(e) => handleChange(e)}
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
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Steps:</label>
                    <input
                        type= "text"
                        value= {input.analyzedInstructions}
                        name= "steps"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Img:</label>
                    <input
                        type= "text"
                        value= {input.img}
                        name= "img"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <label>Whole 30
                    <input
                        type ="checkbox"
                        name = "Whole 30"
                        value= "Whole 30"
                        onChange={(e) => handleCheckbox(e)}
                    />
                </label>
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
                        {input.showDiet.map(e => e + ", ")}
                    </li>
                </ul>

                <button type='submit'>Crear Receta</button>
            </form>
        </div>
    )
}
