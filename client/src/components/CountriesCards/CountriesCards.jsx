import React from "react";
import { Link } from "react-router-dom";
import './CountriesCards.css';

export default function CountriesCards({ id, name, continents, population, flags }) {
  return (
    <>
      <Link className="container"
      to={`/countries/${id}`}>
        <div className="card">
          <img src={flags} alt="Country flag" />
          
          <h2 className="titleName">{name}</h2>
          <h3 className="text">{continents}</h3>
          <h3 className="text">Population: {population}</h3>

        </div>
      </Link>
    </>
  );
}
