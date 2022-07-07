import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import { postRecipe, getDiets } from "../actions/index";
import { validate } from "./validations.js";
import "./RecipeCreate.css";


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
    }

    function handleSelect(e){
        let { value } = e.target;
        if(value && !input.diet.includes(value)){

            setInput({
                ...input,
                //Cada vez que haces un click en el select, se va concatenando en diet
                //diet: [...input.diet, e.target.value],
                diet : [...input.diet, value],
            });
            console.log("diet: " + input.diet);
        }
    }

    function handleDeleteDiet(e){
        let { value } = e.target;
        console.log("HOLA");
        if(value && input.diet.includes(value)){
            let filtered = input.diet.filter(e => e !== value);
            setInput({
                ...input,
                //Cada vez que haces un click en el select, se va concatenando en diet
                //diet: [...input.diet, e.target.value],
                diet : filtered,
            });
        }
    }


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
            alert("Please complete the form");
        }
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
        <div className="grid">
            <div className="createrecipe-container">
                <div className="CTA-container">
                    <div className="createrecipe-CTA-goBack">
                        <Link to='/home'>
                            <button className="CTA-goBack">Volver</button>
                        </Link>
                    </div>
                    <div className="createrecipe-CTA-submit">                    
                        <button className="CTA-submit" onClick={e => handleSubmit(e)} type='submit' disabled={Object.values(errors).length}>Crear Receta</button>
                    </div>
                </div>
                <h1 className="createrecipe-title">Let's create a recipe!</h1>
                <form className="createrecipe-form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-div">
                        <div className="form-input-div">
                            <label className="form-label">Title:</label>
                            <input className="form__input"
                                type= "text"
                                value= {input.title}
                                name= "title"
                                placeholder="Fried Chicken..."
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </div>
                        <div className="error-div">
                            {
                                errors.title && (
                                    <div className="error-div-p">
                                        <p className="error">{errors.title}</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="form-div">
                        
                        <div className="form-input-div">
                            <label  className="form-label">Summary:</label>
                            <input className="form__input"
                                type= "text"
                                value= {input.summary}
                                name= "summary"
                                placeholder="A very juicy chicken for all the family..."
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </div>
                        <div className="error-div">
                            {
                                errors.summary && (
                                    <div className="error-div-p">
                                        <p className="error">{errors.summary}</p>
                                    </div>
                                )
                            }
                        </div>
                        
                    </div>
                    <div className="form-div">
                        <div className="form-input-div">
                            <label className="form-label">Health Score:</label>
                            <input className="form__input"
                                type= "number"
                                value= {input.healthScore}
                                name= "healthScore"
                                placeholder="70"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="error-div">
                        {
                        errors.healthScore && (                                    
                            <div className="error-div-p">
                                <p className="error">{errors.healthScore}</p>
                            </div>
                            )
                        }
                    </div>
                    </div>
                    <div className="form-div">
                        <div className="form-input-div">
                            <label className="form-label">Img:</label>
                            <input className="form__input"
                                type= "text"
                                value= {input.img}
                                name= "img"
                                placeholder="http://..."
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </div>
                        <div className="error-div">
                            {
                                errors.img && (
                                    <div className="error-div-p">
                                        <p className="error">{errors.img}</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="form-div">
                        <div className="form-input-div">
                            <label className="form-label">Steps:</label>
                            <input className="form__input"
                                type= "text"
                                value= {input.stepFromDb}
                                name= "stepFromDb"
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </div>
                    </div>
                    
                        
                    <div className="form-div">
                        <div className="form-input-div">
                            <label className="form-label">Diet types:</label>
                            <select className="form__input" onChange={(e) => handleSelect(e)}>
                                {
                                    diets?.map((e) => {
                                        //Se itera cada e con su dietName en la DB
                                        return(
                                            <option value={e.dietName}>{e.dietName}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-showDiet">
                            {
                                input.diet.map(e => (
                                    <div className="diets-h5-container">
                                        <h5 className="diets-h5"key={e}>
                                            {e}
                                            <button type="button" value={e} onClick={(e) => handleDeleteDiet(e)}>X</button>
                                        </h5>
                                            
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
