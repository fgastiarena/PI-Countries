import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getAllCountries from "../../actions/actions.jsx";
import CountriesCards from "../CountriesCards/CountriesCards.jsx";
import Filters from "../CountriesCards/Filters/Filters.jsx";
import { Loading } from "../LoadingPage/Loading.jsx";
import Nav from "../Nav/Nav.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import './Home.css';

export default function Home() {
  const dispatch = useDispatch(); //para ir despachando mis acciones cuando utilice esta const
  const allCountries = useSelector((state) => state.countries); //traigo todo lo que está en el estado de countries
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState("");
  const error = useSelector((state) => state.error);

  //Pagination
  const countriesForFirstPage = 9;
  const countriesForRestOfPages = 10;

  const [indexFirstCountry, setIndexFirstCountry] = useState(0);
  const [indexLastCountry, setIndexLastCountry] = useState(countriesForFirstPage);

  const countriesInActualPage = allCountries.slice( 
    indexFirstCountry,
    indexLastCountry
  );

  const pagination = (e) => {
    const pageNumber = e.target.value; //onClick btn
    setIndexFirstCountry(pageNumber === 1 ? 0 : (countriesForRestOfPages * (pageNumber - 1) - 1)); //si estoy en la pag 1 quiero mi FirstIndex en 0
    setIndexLastCountry(pageNumber === 1 ? countriesForFirstPage :  ((countriesForRestOfPages * (pageNumber))) - 1);
  };

  
  //traigo del estado los countries cuando se monta el componente
  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  return (
    <div className="container-home">
      {loading === true ? (
        <Loading setLoading={setLoading} />
      ) : (
        <div>
          <h1>CountriesApp</h1>
        </div>
      )}

      <Nav setOrder={setOrder}/>
      <Filters setOrder={setOrder} />

      <Pagination
        countriesForRestOfPages={countriesForRestOfPages}
        allCountries={allCountries.length}  //necesito un valor numérico
        pagination={pagination}
        countriesForFirstPage={countriesForFirstPage}
      />

      <div>

        {countriesInActualPage?.length !== 0 ? (
          countriesInActualPage.map((c) => {
            return (
              <CountriesCards
                key={c.id}
                id={c.id}
                name={c.name}
                continents={c.continents}
                population={c.population}
                flags={c.flags}
              />
            );
          })
        ) : (
          <h1>{error}</h1>
        )}

        <div>
          <a href="#">
            <button className="btn-up">Up</button>
          </a>
        </div>
      </div>
    </div>
  );
}

