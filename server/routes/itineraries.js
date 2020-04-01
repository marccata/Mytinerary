const express = require('express')
const router = express.Router()
const itineraryModel = require('../model/itineraryModel')

router.get('/test', (req, res) => {
    res.send({ msg: 'Itineraries test route.' })

})

router.post('/', (req, res) => {
    const newItinerary = new itineraryModel({
        title: req.body.title,
        user: req.body.user,
        city_id: req.body.city_id,
        price: req.body.price,
        hours: req.body.price,
        likes: req.body.likes,
        img: req.body.img,
        user_img: req.body.user_img,
        description: req.body.description
    })

    itineraryModel.findOne({ title: newItinerary.title })
    .then(itinerary => {
        if (itinerary) res.status(500).send("Choose another title, this already exists in the DB")
    }) 
    
    newItinerary.save()
        .then(itinerary => {
        res.send(itinerary)
        })
        .catch(err => {
            res.status(500).send("Error" + err)
        })
})

router.get('/all',
    (req, res) => {
        itineraryModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
});

router.get('/bycity/:city_id',
    (req, res) => {
        let cityRequested = req.params.city_id;
        itineraryModel.find({city_id:cityRequested})
            .populate('city_id') //TODO populate with less things, not everything is needed here and a lot of data is duplicated
            .exec((err, files) => {
                console.log(files);
                res.send(files)
            })
});

module.exports = router