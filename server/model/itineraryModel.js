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
    },
    city_name: {
        type: String,
        required: true
    },
    likes: {
        type: String,
        required: false
    },
    hours: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: false
    }
})

//name of module is the singular version (itinerary) of the database name (itineraries)
module.exports = mongoose.model('itinerary', itinerarySchema)