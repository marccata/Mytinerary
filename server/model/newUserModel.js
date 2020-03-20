const mongoose = require('mongoose')

const newUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    user_img: {
        type: String,
    }
})

//name of module is the singular version (city) of the database name (cities)
module.exports = mongoose.model('user', newUserSchema)
