import React from "react";
import './Card.css' 
export default function Card({img, title, dietTypes}){
    return (
        <div className="Card">
            <h3>{title}</h3>
            <h5>{dietTypes}</h5>
            <img src={img} alt="img not found" width="200px" height="250px"/>
        </div>
    );
}