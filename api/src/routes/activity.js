const { Router } = require('express');
const Sequelize = require('sequelize');
const router = Router();
const { Country, Activity } = require('../db');


router.post('/', async(req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;

    try {
        await createActivitiesAndAddCountries({ name, difficulty, duration, season }, countries);
        res.send('Activity created');

    } catch (error) {
        res.status(500).send('Error creating the activity -->' + error)
    }

});

router.get('/', async(req, res) => {
    try {
        const activities = await Activity.findAll({
            // include: { model: Country, attributes: ["id", "name"] },
            include: [Country],
            attributes: ["id", "name"]
        });
        res.json(activities);
    } catch (error) {
        res.json({ error: "There is not an activity created" });
    }
})

const createActivitiesAndAddCountries = async(activity, countries = []) => {
    const activities = await Activity.create({ //fn
        name: activity.name,
        difficulty: activity.difficulty,
        duration: activity.duration,
        season: activity.season
    });
    countries.forEach(async country => {

        let countryDB = await Country.findAll({ where: { id: country } }) //busco info en una tabla de la db y creo una variable
        if (countryDB) {
            activities.addCountries(countryDB);
        }
    })
}



module.exports = router;