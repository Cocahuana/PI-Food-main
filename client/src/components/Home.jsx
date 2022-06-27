import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { getRecipes, filterByDiets } from "../actions";
import {Link} from 'react-router-dom';
import Card from "./Card"
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

//useSelector() Allows you to extract data from the Redux store state, using a selector function
//useEffect actualiza cuando algo sucede

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
    function handleFilterDiets(e){
        dispatch(filterByDiets(e.target.value));
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
                    <option value="mostHS">Most HealthScore</option>
                    <option value="lessHS">Less HealthScore</option>
                </select>
                <select onClick={e => {handleFilterDiets(e)}}>
                    <option value='All'>All</option>
                    <option value='gluten free'>Gluten Free</option>
                    <option value='ketogenic'>Ketogenic</option>
                    <option value='vegetarian'>Vegetarian</option>
                    <option value='lacto vegetarian'>Lacto Vegetarian</option>
                    <option value='ovo vegetarian'>Ovo Vegetarian</option>
                    <option value='vegan'>Vegan</option>
                    <option value='pescetarian'>Pescetarian</option>
                    <option value='paleo'>Paleo</option>
                    <option value='primal'>Primal</option>
                    <option value='low fodmap'>Low Fodmap</option>
                    <option value='whole 30'>Whole 30</option>
                </select>
                <Paginado
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginado= {paginado}
                />
                <SearchBar/>
                {
                    //Renderizo el componente card
                    //Primero pregunto si existe
                    currentRecipes?.map((e) =>{
                        //console.log(currentRecipes);
                        return(
                            <Link to={"/home/" + e.id}>
                                <div key={e.id}>
                                    <Card key={e.id}  title={e.title} img={e.img} dietTypes={e.dietTypes}/>
                                </div>
                            </Link>
                        );
                    })
                }
                
            </div>
        </div>
    )
}