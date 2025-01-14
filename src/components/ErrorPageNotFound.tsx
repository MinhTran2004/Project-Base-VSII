import React from 'react';
import { Link } from 'react-router-dom';
import HttpCodes from '../constants/HttpCode';
import "../css/ErrorPage.css";

const ErrorPageNotFound: React.FC = () => {
  const status: number = 404;
  const errorMessage = status ? HttpCodes[status] : 'Unexpected error occurred';

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
            <h1>Error {status}</h1>
          </div>
          <p className="error-message">{errorMessage}</p>
          <Link to="/" className="go-home-button">Go to Homepage</Link>
        </div>
      </div>
    </>

  );
};

export default ErrorPageNotFound;