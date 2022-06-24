import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { getRecipes } from "../actions";
import {Link} from 'react-router-dom';
import Card from "./Card"
import Paginado from "./Paginado";

export default function Home() {
    // Nos sirve para utilizar la constante despachando las acciones
    const dispatch = useDispatch();

    //Es lo mismo que hacer un mapStateToProps
    // Se declara la constante allRecipes para almacenar todo lo que está en el estado de recipes
    const allRecipes = useSelector ((state) => state.recipes);

    //Vamos a setear estados locales
    //Arranco en la primer pagina (useState(1))
    const [currentPage, setCurrentPage] = useState(1);
    // El PI pide 9 recetas per page (useState(9))
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage // 9
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage // 0
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    //Page 1: 1---------10
    //Page 2: 11---------20
    //Page 3: 21 --------- 30 

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    //Traer del estado las recipes cuando el estado se monta
    //useEffect es como el componentDidMount
    useEffect(() => {
        //Es lo mismo que hacer un mapStateToProps
        dispatch(getRecipes());
    }, [dispatch])

    //Cuando quiera resetear las recetas, el boton me llama acá
    //Sino, no me recarges la pagina
    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    }

    //Vamos a renderizarlo
    return (
        <div>
            <Link to='/postRecipe'>Crear Receta</Link>
            <h1>Titulo de la pagina</h1>
            <button onClick={e => {handleClick(e)}}>
                Volver a cargar todas las recetas
            </button>
            <div>
                <select>
                    <option value="ascendente">Ascendente</option>
                    <option value="descendente">Descendente</option>
                </select>
                <select>
                    <option value="moreHS">More HealthScore</option>
                    <option value="lessHS">Less HealthScore</option>
                </select>
                <select>
                    <option value="todos">Todos</option>
                    <option value="vegan">vegan</option>
                    <option value="paleo">paleo</option>
                </select>
                <Paginado
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginado= {paginado}
                />
                {
                    //Renderizo el componente card
                    //Primero pregunto si existe
                    currentRecipes?.map((e) =>{
                        return(
                            <Link to={"/home/" + e.id}>
                                <div key={e.id}>
                                    <Card key={e.id}  title={e.title} img={e.img} dietTypes={e.dietTypes}/>
                                </div>
                            </Link>);
                    })
                }
            </div>
        </div>
    )
}