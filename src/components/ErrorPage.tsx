import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import HttpCodes from '../constants/HttpCode';
import "../css/ErrorPage.css";

const ErrorPage: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    const errorMessage = code ? HttpCodes[parseInt(code)] : 'Unexpected error occurred';

    return (
        <>
            <style>
                {`
      html, #root {
        margin: 0;
        padding: 0;
        width: 100%;
        height: auto;
      `}
            </style>
            <div className="error-container">
                <div className="error-content">
                    <div className="error-header">
                        <h1>Error {code}</h1>
                    </div>
                    <p className="error-message">{errorMessage}</p>
                    <Link to="/" className="go-home-button">Go to Homepage</Link>
                </div>
            </div>
        </>

    );
};

export default ErrorPage;
