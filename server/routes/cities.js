const express = require('express')
const router = express.Router()
const cityModel = require('../model/cityModel')

router.get('/test', (req, res) => {
    res.send({ msg: 'Cities test route.' })

})

router.post('/', (req, res) => {
    const newCity = new cityModel({
        name: req.body.name,
        country: req.body.country,
        img: req.body.img
    })

    cityModel.findOne({ name: newCity.name })
    .then(city => {
        if (city) res.status(500).send("This city already exists")
    }) 
    
    //TODO PORQUE NEWCITY SAVE NO ES ASINCRONO? NO ENTENDER YO

    newCity.save()
        .then(city => {
        res.send(city)
        })
        .catch(err => {
            res.status(500).send("Error: " + err)
        })
})

router.get('/all',
    (req, res) => {
        cityModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
});

module.exports = router