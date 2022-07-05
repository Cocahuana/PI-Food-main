import React from "react";
import './Home.css'
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
        //Revisar
        dispatch(filterByDiets(e.target.value));
        setCurrentPage(1);
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
        <div className="home grid-container">
            <div className="home-filters">
                <h1 className="home-filters__title">FOOD PI</h1>
                
            </div>
            <div className="home-paginado">
                <div className="home-painado-container">
                    <Paginado
                        recipesPerPage={recipesPerPage}
                        allRecipes={allRecipes.length}
                        paginado= {paginado}
                        currentPage={currentPage}
                    />
                </div>
            </div>
            <div className="home-searchbar">
                
                <h3 className="searchbar-h3-1">Sort in Alphabetical order</h3>
                <div className="filter-a-z">
                    <select onChange={e => handleSortTitle(e)}>
                        <option value="ascendente">A - Z</option>
                        <option value="descendente">Z - A</option>
                    </select>
                </div>
                <h3 className="searchbar-h3-2">Order by Health Score</h3>
                <div className="filter-healthScore">
                    <select onChange={e => handleSortHealthScore(e)}>
                        <option value="mostHS">Most HealthScore</option>
                        <option value="lessHS">Less HealthScore</option>
                    </select>
                </div>
                <h3 className="searchbar-h3-3">Ordey by Diet Type</h3>
                <div className="filter-diet">
                    <select onChange={e => {handleFilterDiets(e)}}>
                        <option value='All'>All</option>
                        <option value='gluten free'>Gluten Free</option>
                        <option value='ketogenic'>Ketogenic</option>
                        <option value='vegetarian'>Vegetarian</option>
                        <option value='lacto vegetarian'>Lacto Vegetarian</option>
                        <option value='lacto ovo vegetarian'>Lacto ovo Vegetarian</option>
                        <option value='ovo vegetarian'>Ovo Vegetarian</option>
                        <option value='vegan'>Vegan</option>
                        <option value='pescatarian'>Pescatarian</option>
                        <option value='pescetarian'>Pescetarian</option>
                        <option value='paleo'>Paleo</option>
                        <option value='paleolithic'>Paleolithic</option>
                        <option value='primal'>Primal</option>
                        <option value='fodmap friendly'>Fodmap friendly</option>
                        <option value='low fodmap'>Low Fodmap</option>
                        <option value='whole 30'>Whole 30</option>
                    </select>
                </div>



                <div className="home-searchbar__searchbar">
                    <SearchBar setCurrentPage={setCurrentPage}/>
                </div>
                <div className="home-searchbar__reloadRecipes">
                    <div className="flex justify-center align-center w100 h100">
                        <button className="searchbar__reloadRecipesCTA" onClick={e => {handleClick(e)}}>
                            Reload Recipes
                        </button>
                    </div>
                </div>
                <div className="home-searchbar__createRecipe">
                    <Link to='/postRecipe'>
                        <div className="flex justify-center align-center w100 h100">
                            <button className="searchbar__reloadRecipesCTA">
                                Create a Recipe 
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="home-cards">
                {
                    currentRecipes.length === 0 ? (
                        <h2 className="error-msg">Recipes not found!</h2>
                    ):
                    //Renderizo el componente card
                    //Primero pregunto si existe
                    currentRecipes?.map((e) =>{
                        //console.log(currentRecipes);
                        return(
                            <Card key={e.id} id={e.id}  title={e.title} img={e.img} dietTypes={e.dietTypes}/>
                        );
                    })
                }
            </div>
        </div>
    )
}