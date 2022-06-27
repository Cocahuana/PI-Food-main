import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import { postRecipe, getDiets } from "../actions/index";

export default function RecipeCreate(){
    const dispatch = useDispatch();
    const history = useHistory();

    const diets = useSelector((state) => state.diets);

    const [input, setInput] = useState({
        title: "",
        summary: "",
        healthScore: "",
        steps: "",
        img: "",
        diet: []
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
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
                diet: [...input.diet, e.target.value]
            });
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(Object.values(input));
        dispatch(postRecipe(input));
        alert("La receta ha sido creada exitosamente!");
        setInput({
            title: "",
            summary: "",
            healthScore: "",
            steps: "",
            img: "",
            diet: []
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
                </div>
                <div>
                    <label>Resumen:</label>
                    <input
                        type= "text"
                        value= {input.summary}
                        name= "summary"
                        onChange={(e) => handleChange(e)}
                    />
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
                        value= {input.steps}
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
                        {input.diet.map(e => e + ", ")}
                    </li>
                </ul>

                <button type='submit'>Crear Receta</button>
            </form>
        </div>
    )
}
