const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
    itinerary_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'city',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
    }
})

//name of module is the singular version (city) of the database name (cities)
module.exports = mongoose.model('activity', citySchema)
