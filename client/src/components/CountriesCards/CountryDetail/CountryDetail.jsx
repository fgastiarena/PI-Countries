import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCountriesDetails } from "../../../actions/actions";
import Activity from "./Activity/Activity.jsx";
import './CountryDetail.css';

export default function CountryDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const countryDetail = useSelector((state) => state.countryDetail);
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(getCountriesDetails(id));
  }, [dispatch, id]);

  function handleClick(e) {
    e.preventDefault();
    navigate("/home");
  }

  function handleCreate(e) {
    e.preventDefault();
    navigate("/create");
  }

  return (
    <>
      <div>
        <h1>{countryDetail.name}</h1>
        <h3>Id: {countryDetail.id}</h3>
        <img
          className='flag'
          src={countryDetail.flags}
          alt={`flag from ${countryDetail.name}`}
        />
      </div>

      <div>
        <h4>Continent: {countryDetail.continents}</h4>
        <h4>Capital: {countryDetail.capital}</h4>
        <h4>Subregion: {countryDetail.subregion}</h4>
        <h4>Area: {countryDetail.area}km²</h4>
        <h4>Population: {countryDetail.population}</h4>
      </div>

      <div>
        <h2>
          <strong>Activities</strong>
        </h2>
      </div>

      {countryDetail.activities && countryDetail.activities.length > 0 ? (
        countryDetail.activities.map((e) => {
          return (
            <Activity
              key={e.id}
              name={e.name}
              difficulty={e.difficulty}
              duration={e.duration}
              season={e.season}
            />
          );
        })
      ) : (
        <p>This country has no activity for the moment. <strong>Create one! ↙</strong></p>
      )}

      <div>
        {/* <NavLink exact to='/countries'> */}
        <button type="submit" onClick={(e) => handleClick(e)}>
          Back to Home
        </button>{" "}
        {/**/}
        {/* </NavLink> */}
        {/* <NavLink exact to='/create'> */}
        <button type="submit" onClick={(e) => handleCreate(e)}>
          Create Activity
        </button>{" "}
        {/**/}
        {/* </NavLink> */}
      </div>
    </>
  );
}
