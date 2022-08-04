const { Router } = require('express');
const Sequelize = require('sequelize');
const router = Router();
const { Country, Activity } = require('../db');
const { countriesDB, getCountries } = require("../utils/getCountries");



router.get('/', async(req, res) => {
    const { name } = req.query;

    try {
        let countries = await countriesDB(name);

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