const express = require('express')
const router = express.Router()
const User = require('../model/userModel.js')
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

router.get('/test', (req, res) => {
    res.send({ msg: 'Sign Up test route.' })

})

router.post('/', [check('email').isEmail()], (req, res) => { //THE CHECK EMAIL PART IS A FEATURE FROM EXPRESS VALIDATOR TO CHECK IF EMAIL IS AN EMAIL
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        user_img: req.body.user_img
    })

    //THIS IS THE ERROR ALERT FROM EXPRESS VALIDATOR IN CASE THAT EMAIL IS NOT AN EMAIL
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

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
        User.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
});

module.exports = router