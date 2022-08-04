const axios = require('axios');
const { Op } = require('sequelize');
const { Country, Activity } = require('../db');



const getCountries = async() => {

    try {
        const { data } = await axios.get('https://restcountries.com/v3/all');

        await data.forEach(el => { //se gaurda el map de la data de la api con el siguiente 'formato' o 'plantilla de modelo' del obj
            Country.findOrCreate({ //a cada elemento del forEach le asignamos un lugar en la db, siendo cada campo correspondiente al valor que haya en la api
                where: {
                    id: el.cca3,
                    name: el.name.common,
                    flags: el.flags[0],
                    continents: el.continents[0],
                    capital: el.capital ? el.capital[0] : "Capital not found",
                    subregion: el.subregion ? el.subregion : 'Subregion not found',
                    area: el.area,
                    population: el.population
                }
            })
        })

    } catch (error) {
        console.error('Error en getCountries -> ', error);
    }
}

//Obtener de la db
const countriesDB = async(name = null) => {
    let dbInfo = [];
    if (name) {
        dbInfo = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            include: [Activity]
        })
    } else {
        dbInfo = await Country.findAll({
            include: [Activity]
        });
    }
    return dbInfo;
}


module.exports = { getCountries, countriesDB };