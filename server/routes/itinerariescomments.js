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
    /* TODO REVIEW AND CLEAN THIS
    // IF THE ITINERARY HAS ALREADY SOME COMMENT, ADD THE COMMENT TO THAT DB OBJECT
    if(itineraryCommentModel.findOne({ itinerary_id: newItineraryComment.itinerary_id })){
        itineraryCommentModel.findOne({ itinerary_id: newItineraryComment.itinerary_id })
        .then(existingItinerary => {
            existingItinerary.insert(newItineraryComment.comment)
                .catch(err => {
                    res.status(500).send("Error: " + err)
                })
        })
    // IF THE ITINERARY HAS NO COMMENTS, MAKE A NEW OBJECT IN COLLECTION WITH THE COMMENT
    } else {
        */
        newItineraryComment.save()
            .then(itineraryCommentObject => {
            res.send(itineraryCommentObject)
            })
            .catch(err => {
                res.status(500).send("Error: " + err)
            })
   // }
    
})

router.get('/byitinerary/:itinerary_id',
    (req, res) => {
        let itineraryRequested = req.params.itinerary_id;
        itineraryCommentModel.find({itinerary_id:itineraryRequested})
            .populate('itinerary_id')
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