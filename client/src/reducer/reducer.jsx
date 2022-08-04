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
  SET_LOADING,
} from "../actions/actions.jsx";

let initialState = {
  countries: [],
  allCountries: [],
  error: "",
  countryDetail: [],
  activities: [],
  firstIndexPage: null,
  isLoading: false
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload, 
        allCountries: action.payload,
        firstIndexPage: null
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
          countries: action.payload,
          firstIndexPage: 0
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
          e.activities?.map(el => el.name).includes(action.payload)
         );
         return {
           ...state,
           countries: activityFilter
         };


      case SET_LOADING:
        return {
          ...state,
          isLoading: action.payload.isLoading
        }

    default:
      return state;
  }
}

export default rootReducer;
