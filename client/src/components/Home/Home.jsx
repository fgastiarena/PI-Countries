import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getAllCountries from "../../actions/actions.jsx";
import CountriesCards from "../CountriesCards/CountriesCards.jsx";
import Filters from "../CountriesCards/Filters/Filters.jsx";
import { Loading } from "../LoadingPage/Loading.jsx";
import Nav from "../Nav/Nav.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import "./Home.css";
import notFound from '../img/notFound.gif';

export default function Home() {
  const dispatch = useDispatch(); //para ir despachando mis acciones cuando utilice esta const
  const allCountries = useSelector((state) => state.countries); //traigo todo lo que está en el estado de countries
  const stateFirstIndexPage = useSelector((state) => state.firstIndexPage);
  const isLoading = useSelector((state) => state.isLoading);
  const [order, setOrder] = useState("");
  const error = useSelector((state) => state.error);

  //Pagination
  const countriesForFirstPage = 9;
  const countriesForRestOfPages = 10;

  const [indexFirstCountry, setIndexFirstCountry] = useState(0);
  const [indexLastCountry, setIndexLastCountry] = useState(countriesForFirstPage);

  const [countriesInActualPage, setCountriesInActualPage] = useState([]);
  
  const pagination = (e) => {
    const pageNumber = e.target.value; //onClick btn
    const initialIndex = (pageNumber === 1 ? 0 : countriesForRestOfPages * (pageNumber - 1) - 1);

    const finalIndex = (pageNumber === 1
      ? countriesForFirstPage
      : countriesForRestOfPages * pageNumber - 1);

    setIndexFirstCountry(initialIndex);
    setIndexLastCountry(finalIndex);

    setCountriesInActualPage(allCountries.slice(initialIndex, finalIndex));
  };

  useEffect(() => {
    setCountriesInActualPage(allCountries.slice(stateFirstIndexPage ?? indexFirstCountry, indexLastCountry));
  }, [allCountries[0]])

  //traigo del estado los countries cuando se monta el componente
  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  return (
    <div className="container-home">
      {isLoading ? (
        <Loading/>
      ) : (
        <div>
          {/* <h1>CountriesApp</h1> */}
          <Nav />
        </div>
      )}

      <div className="filtros-home">
        <Filters setOrder={setOrder} />
      </div>

      {allCountries.length === 0 && <div className="miCiela">Pues no mi ciela, busca bien !
      <img className="img-john" src={notFound} alt='not found'/>
      </div>}
      {allCountries.length > 0 && 
      <div>
        <Pagination
        countriesForRestOfPages={countriesForRestOfPages}
        allCountries={allCountries.length} //necesito un valor numérico
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
            <button className="btn-up">Up ↑</button>
          </a>
        </div>
      </div>
      </div>
      }
    </div>
  );
}
