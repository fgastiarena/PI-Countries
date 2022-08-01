import {
  GET_ALL_COUNTRIES,
  GET_ERROR,
  ORDER_BY_CONTINENT,
  ORDER_BY_POPULATION,
  ORDER_BY_ALPHA,
  ORDER_BY_ACTIVITIES,
  GET_COUNTRIES_DETAILS,
  GET_ACTIVITIES,
  GET_COUNTRIES_NAMES,
} from "../actions/actions.jsx";

let initialState = {
  countries: [],
  allCountries: [],
  error: "",
  countryDetail: [],
  activities: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload, //en mi state countries y allcoutries que son arrays vacíos en un principio, guardo todo lo que me indique mi action GET_ALL_COUNTRIES
        allCountries: action.payload,
      };

    case GET_ERROR:
      return {
        ...state,
        error: action.payload,
        countries: [],
      };

      case GET_COUNTRIES_DETAILS:
        return {
          ...state,
          countryDetail: action.payload
        };
      
      case GET_ACTIVITIES:
        return {
          ...state,
          activities: action.payload,
        };
      
      case GET_COUNTRIES_NAMES:
        return {
          ...state,
          countries: action.payload
        }
      
    case ORDER_BY_CONTINENT:
      const countriesByContinent =
        action.payload === "DEFAULT"
          ? state.allCountries
          : state.allCountries.filter((e) => e.continents === action.payload);
      return {
        ...state,
        countries: countriesByContinent,
      };

    case ORDER_BY_ALPHA:
      const sortAlpha =
        action.payload === "Asc"
          ? state.countries.sort((a, b) => a.name.localeCompare(b.name))
          : state.countries.sort((a, b) => b.name.localeCompare(a.name));

      return {
        ...state,
        countries: sortAlpha,
      };

    case ORDER_BY_POPULATION:
      const population =
        action.payload === "AscPop"
          ? state.countries.sort((a, b) => a.population - b.population)
          : state.countries.sort((a, b) => b.population - a.population);
      return {
        ...state,
        countries: population,
      };
    
      case ORDER_BY_ACTIVITIES:
        const countriesACtivities = state.allCountries;
        const activityFilter = action.payload === 'All' ? countriesACtivities : countriesACtivities.filter(e => 
          // e.activities && e.activities.map(el => el.name).includes(action.payload)
          e.activities?.map(el => el.name).includes(action.payload)
         );
         return {
           ...state,
           countries: activityFilter
         };


    default:
      return state;
  }
}

export default rootReducer;
