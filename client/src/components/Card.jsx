import React from "react";
import { Link } from 'react-router-dom';
import './Card.css' 
export default function Card({img, title, dietTypes, id, createdInDb}){
    const diets = [];
    for(let i = 0; i < dietTypes.length; i++){
        diets.push(dietTypes[i]);
    }

    return (
        <div className="Card">
            <div className="card-container">
                <img className="card-img" src={img} alt="img not found" width="200px" height="250px"/>
                <div className="line"></div>
                <h3>{title}</h3>
                <div className="card-diets-container">
                        {
                            diets.map(e => (
                                <div className="diets-h5-container">
                                    <h5 className="diets-h5" key={e}>
                                        {e}
                                    </h5>
                                </div>
                            ))
                        }
                </div>
                <div className="card-CTA-container">
                    <Link to={`/home/${id}`}>
                        <button className="card-CTA">
                            Details
                        </button>      
                    </Link>
                </div>
                <p>{createdInDb}</p>
            </div>
        </div>
    );
}