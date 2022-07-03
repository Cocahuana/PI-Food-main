import React from "react";
import './LandingPage.css';
import {Link} from 'react-router-dom';
import bgLandingPageImage from '../assets/images/soup.jpg';

export default function LandingPage(){
    return(
        <div className="LandingPage">
            <div className="home-hero">
                <div className="home-text">
                    <p className="home-text__text">HI</p>
                    <p className="home-text__text2">THERE!</p>
                    <h1 className="home-text__title">Looking for juicy and helthy recipes?</h1>
                    <div className="home-text__link">
                        <Link to='/home'>
                            <button className="CTA-landingPage">YES!</button>
                        </Link>
                    </div>
                    <p className="home-text__text3">Still here? </p>
                    <p className="home-text__text4">click YES! and find out!!</p>
                </div>

            </div>
        </div>
    )
}