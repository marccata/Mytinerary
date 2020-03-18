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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'city',
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
    },
    img: {
        type: String,
        required: false
    },
    user_img: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
})

//name of module is the singular version (itinerary) of the database name (itineraries)
module.exports = mongoose.model('itinerary', itinerarySchema)