const axios = require('axios');
const { Op } = require('sequelize');
const { Country, Activity } = require('../db');



// 1º Llamo al endpoint de la api y me traigo toda la info
// 2º traigo la info de la api guardada en la base de datos
// Una vez que guardamos toda la info en la db trabajamos directamente con eso.

const getCountries = async() => {

    try {
        const { data } = await axios.get('https://restcountries.com/v3/all'); //el destructuring lo hgo para poder mapear, me va a traer un arr de obj  //llamamos al endpoint de la api y me trae toda la info q necesito

        await data.forEach(el => { //se gaurda el map de la data de la api con el siguiente 'formato' o 'plantilla de modelo' del obj   //mapeo para que no me traiga todo lo que tiene la api, si no solo lo que yo necesito traerme desde el back para mi app
            Country.findOrCreate({ //a cada elemento del forEach le asignamos un lugar en la db, siendo cada campo correspondiente al valor que haya en la api
                where: { //con el findOrCreate se fija si no está, lo crea, y si está, no
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
const countriesDB = async(name = null) => { //esta fn tiene un arg(name) que después será asignado al valor de una posible req.query en las rutas
    let dbInfo = [];
    if (name) {
        dbInfo = await Country.findAll({ //el findAll() nos permite traer información de una tabla en la base de datos y guardarla en una variable   //Es el Country de la relacion de la db, el de models es la plantilla de Country, Yo necesito la relación creada en la instancia db
            where: {
                name: {
                    [Op.iLike]: `%${name}%` //hace una petición a la db poniendo un 'filtro', donde acepta los que en su campo 'name' tenga algo que incluya lo que llegué por arg
                }
            },
            include: [Activity] //Que tenga relación con Activity si no después nunca me va a traer el país con la actividad. Le puedo indicar que atributos quiero que traiga de la Actividad
        })
    } else {
        dbInfo = await Country.findAll({
            include: [Activity]
        });
    }
    return dbInfo;
}


module.exports = { getCountries, countriesDB };