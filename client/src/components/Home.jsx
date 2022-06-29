import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { getRecipes, filterByDiets, orderByTitle, orderByHealthScore } from "../actions";
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
    const [orden, setOrden] = useState('');
    const [ordenHS, setOrdenHS] = useState('');
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
        setCurrentPage(1);
    }
    function handleFilterDiets(e){
        dispatch(filterByDiets(e.target.value));
    }

    function handleSortTitle(e){
        e.preventDefault();
        dispatch(orderByTitle(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSortHealthScore(e){
        e.preventDefault();
        dispatch(orderByHealthScore(e.target.value));
        setCurrentPage(1);
        setOrdenHS(`Ordenado ${e.target.value}`)
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
                <select onChange={e => handleSortTitle(e)}>
                    <option value="ascendente">A - Z</option>
                    <option value="descendente">Z - A</option>
                </select>
                <select onChange={e => handleSortHealthScore(e)}>
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
                                <Link to={`/home/${e.id}`}>
                                        <Card key={e.id}  title={e.title} img={e.img} dietTypes={e.dietTypes}/>
                                </Link>
                        );
                    })
                }
                
            </div>
        </div>
    )
}