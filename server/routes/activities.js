const express = require('express')
const router = express.Router()
const activityModel = require('../model/activityModel')

router.get('/test', (req, res) => {
    res.send({ msg: 'Activities test route.' })

})

router.post('/', (req, res) => {
    const newActivity = new activityModel({
        itinerary_id: req.body.itinerary_id,
        title: req.body.title,
        img: req.body.img
    })

    activityModel.findOne({ title: newActivity.title })
    .then(activity => {
        if (activity) res.status(500).send("This activity already exists")
    }) 

    newActivity.save()
        .then(activity => {
        res.send(activity)
        })
        .catch(err => {
            res.status(500).send("Error: " + err)
        })
})

router.get('/all',
    (req, res) => {
        activityModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
});

router.get('/byitinerary/:itinerary_id',
    (req, res) => {
        let itineraryRequested = req.params.itinerary_id;
        activityModel.find({itinerary_id:itineraryRequested})
            .populate('itinerary_id')
            .exec((err, files) => {
                console.log(files);
                res.send(files)
            })
});

module.exports = router