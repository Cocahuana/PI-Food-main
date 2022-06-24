import React from "react";
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <div>
            <h1>Bienvenidos gente</h1>
            <Link to='/home'>
                <button>Click me</button>
            </Link>
        </div>
    )
}