const express = require('express')
const router = express.Router()
const itineraryCommentModel = require('../model/itineraryCommentModel')

router.get('/test', (req, res) => {
    res.send({ msg: 'Itineraries comments test route.' })

})

router.post('/', (req, res) => {
    const newItineraryComment = new itineraryCommentModel({
        itinerary_id: req.body.itinerary_id,
        user_id: req.body.user_id,
        comment: req.body.comment,
        time: req.body.time,
    })
    newItineraryComment.save()
        .then(itineraryCommentObject => {
        res.send(itineraryCommentObject)
        })
        .catch(err => {
            res.status(500).send("Error: " + err)
        })
})

router.get('/byitinerary/:itinerary_id',
    (req, res) => {
        let itineraryRequested = req.params.itinerary_id;
        itineraryCommentModel.find({itinerary_id:itineraryRequested})
            .populate('itinerary_id', ["_id", "title", "user", "img"])
            .populate('user_id', ["email", "user_img", "name"]) //TODO PONER USER NAME EN LUGAR EMAIL
            .exec((err, files) => {
                console.log(files);
                res.send(files)
            })
});

router.get('/all',
    (req, res) => {
        itineraryCommentModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
});

module.exports = router