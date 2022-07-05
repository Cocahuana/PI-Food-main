import React from "react";
import './Paginado.css'
// Declaro el paginado y me traigo los estados locales
export default function Paginado ({currentPage, recipesPerPage, allRecipes, paginado}){
    const pageNumbers = [];
    //Voy a recorrer un arreglo en el que voy a dividir todas las recetas
    // por paginado así creo varias paginas.
    // Redondeo para arriba porque si me no llegan a 9 los paginados, 
    // quiero que me traiga en la ultima pagina lo que sobre    
        
    for(let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++){
        //Pusheo en el arreglo la cantidad total de paginas que va a tener la app
        pageNumbers.push(i+1);
    }
    return(
        <nav className="paginado__nav">
            <ul className="paginado__ul">
                {
                    //Si tengo el paginado, devolveme con un numerito sus respectivas paginas y hacelas linkeables
                    pageNumbers.map(number => (
                            currentPage === number?
                            <li className="selected" key={number}>
                                {<a onClick={() => paginado(number)}>{number}</a>}
                            </li>
                            :
                            <li className="paginado__li" key={number}>
                                {<a onClick={() => paginado(number)}>{number}</a>}
                            </li>
                    ))
                }
            </ul>
        </nav>
    )
}

// currentPage === number?
// <a className="selected" onClick={() => paginado(number)}>{number}</a>:
// <a onClick={() => paginado(number)}>{number}</a>