const { Router } = require('express');
const Sequelize = require('sequelize');
const router = Router();
const { Country, Activity } = require('../db');
const { countriesDB, getCountries } = require("../utils/getCountries");



router.get('/', async(req, res) => { //antes de cargar cualq ruta que ya incluya la barra, primero se va a ejecutar esta fn y desp ejecutará lo que corresponda a lo que venga después de la barra
    const { name } = req.query; //destructuring de lo que me llega por query -> /countries?name="...":

    try {
        let countries = await countriesDB(name);
        // console.log('countries -> ', JSON.stringify(countries));

        if (!countries || countries.length === 0) {
            await getCountries();
            countries = await countriesDB(name);
        };

        res.status(200).send(countries);

    } catch (error) {
        console.eror('error -> ', error);
        res.status(500).json({ error: 'Server error' });
    }

});


router.get('/:idPais', async(req, res) => {
    const { idPais } = req.params;

    try {
        const idName = await Country.findOne({
            where: { id: idPais.toUpperCase() },
            include: [Activity]
        });

        idName ?
            res.status(200).send(idName) :
            res.status(400).json({ error: `There is not a country with ${idPais}` })

    } catch (error) {
        res.status(404).json({ error: 'ID not found' })
    }
})




module.exports = router;