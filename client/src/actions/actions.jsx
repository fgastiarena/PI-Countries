import axios from 'axios';

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const GET_ERROR = 'GET_ERROR';
export const ORDER_BY_CONTINENT = 'ORDER_BY_CONTINENT';
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION';
export const ORDER_BY_ALPHA = 'ORDER_BY_ALPHA';
export const ORDER_BY_ACTIVITIES = 'ORDER_BY_ACTIVITIES';
export const GET_COUNTRIES_DETAILS = 'GET_COUNTRIES_DETAILS';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const GET_COUNTRIES_NAMES = 'GET_COUNTRIES_NAMES';


export default function getAllCountries() {
    return async function(dispatch){
        try {
            let allCountries = await axios.get('http://localhost:3001/countries');
            return dispatch({
                type: GET_ALL_COUNTRIES,
                payload: allCountries.data
            })
        } catch (error) {
            console.log('Error en actions getAllCountries -> ' + error);
        }
    }
};

export function getCountriesDetails(id) {
    return function(dispatch) {
        try {
            axios.get(`http://localhost:3001/countries/${id}`)
            .then(res => 
                dispatch({
                    type: GET_COUNTRIES_DETAILS,
                    payload: res.data
                }));
        } catch (error) {
            console.log('Error en actions getCountriesDetails -> ' + error);
        }
    } 
};


export function getCountriesNames(name){
    return async function(dispatch) {
        try {
            const countriesJson = await axios.get(`http://localhost:3001/countries?name=${name}`);
            return dispatch({
                type: GET_COUNTRIES_NAMES,
                payload: countriesJson.data
            })
        } catch (error) {
            console.log('Error en actions getCountriesNames -> ' + error);
        }
    }
};


export function postActivity(payload) {
    return async function() {
        try {
           const newAct = await axios.post('http://localhost:3001/activity', payload);
           return newAct;
        } catch (error) {
            console.log('Error en actions postActivity -> ' + error);
        }
    }
};

export function getActivities() {
    return async function(dispatch) {
        try {
            let actJson = await axios.get('http://localhost:3001/activity');
            return dispatch({
                type: GET_ACTIVITIES,
                payload: actJson.data
            })
        } catch (error) {
            console.log('Error en actions getActivities -> ' + error);
        }
    }
};





//FILTERS

export const orderByContinent = (payload) => {
    return {
        type: ORDER_BY_CONTINENT,
        payload
    }
};

export const orderByPopulation = (payload) => {
    return {
        type: ORDER_BY_POPULATION,
        payload
    }
};

export const orderByAlpha = (payload) => {
    return {
        type: ORDER_BY_ALPHA,
        payload
    }
};

export const orderByActivities = (payload) => {
    return {
        type: ORDER_BY_ACTIVITIES,
        payload 
    }
};