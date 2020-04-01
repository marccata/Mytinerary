const mongoose = require('mongoose')

const itineraryCommentSchema = new mongoose.Schema({
    itinerary_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'itinerary',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
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