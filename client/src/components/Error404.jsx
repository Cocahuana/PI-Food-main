import React from "react";
import { Link } from "react-router-dom";
import './Error404.css';
const Error404 = () => {
    return (
        <div className="bg-404">
            <div className="bg-dark">
                <div className="error-container">
                    <h1 className="error404-h1">404</h1>
                    <h2 className="error404-h2">Page Not Found</h2>
                    <div className="error404-CTA-container">
                        <Link to="/home">
                            <button className="error404-CTA">
                                Go back to Home
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Error404;