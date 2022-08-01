import React from "react";
import { Link } from "react-router-dom";
import './CountriesCards.css';

export default function CountriesCards({ id, name, continents, population, flags }) {
  return (
    <>
      <Link to={`/countries/${id}`}>
        <div>
          <h2 id="titleName">{name}</h2>
          <h3>{continents}</h3>
          <h3>Population: {population}</h3>

          <img className="flags" src={flags} alt="Country flag" />
        </div>
      </Link>
    </>
  );
}
