const express = require('express')
const router = express.Router()
const User = require('../model/newUserModel.js')
const bcrypt = require('bcrypt');

router.get('/test', (req, res) => {
    res.send({ msg: 'Sign Up test route.' })

})

router.post('/', (req, res) => {
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        user_img: req.body.user_img
    })

    User.findOne({ email : newUser.email }) //TODO COMPARA
        .then(existingUser => {
            if (existingUser) res.status(500).send("This user already exists, please use another email")
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    console.log(newUser);
                    newUser.save()
                        .then(user => {
                            res.json({
                                id: user.id,
                                name: user.name,
                                email: user.email
                            })
                        })
                })
            })
        })
        .catch(err => console.log(err));
})

router.get('/all',
    (req, res) => {
        newUserModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
});

module.exports = router