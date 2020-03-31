const mongoose = require('mongoose')

const itineraryCommentSchema = new mongoose.Schema({
    itinerary_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

//name of module is the singular version (itinerary) of the database name (itineraries)
module.exports = mongoose.model('itinerariescomment', itineraryCommentSchema)