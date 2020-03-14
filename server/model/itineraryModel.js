const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    city_id: {
        type: String,
        required: true
    }
})

//name of module is the singular version (itinerary) of the database name (itineraries)
module.exports = mongoose.model('itinerary', itinerarySchema)