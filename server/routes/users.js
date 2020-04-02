const express = require('express')
const router = express.Router()
const User = require('../model/userModel.js')
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const passport = require("../middleware/passport");

router.get('/test', (req, res) => {
    res.send({ msg: 'Sign Up test route.' })

})

router.post('/', [check('email').isEmail()], (req, res) => { //THE CHECK EMAIL PART IS A FEATURE FROM EXPRESS VALIDATOR TO CHECK IF EMAIL IS AN EMAIL
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        user_img: req.body.user_img,
        name: req.body.name
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

router.get("/auth/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        console.log(req.user)
      User
        .findById(req.user._id )
        .select("-password") //DO NOT RETURN PASSWORD IN ARRAY
        .then(user => {
          res.json(user);
        })
    
        .catch(err => res.status(404).json({ error: "User does not exist!" }));
    }
);

router.get('/all',
    (req, res) => {
        User.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
});

//EDITING THIS
/*
router.post("/fav-itinerary/", (req, res) => {
    
    let newUser = new User({
        user: req.body.user,
        fav_itinerary: req.body.fav_itinerary,
    })    

    User.findById( req.user._id ) 
        .then(existingUser => {

            if(!existingUser) res.status(400).json({msg: 'Error: user does not exist'})
            
            // SI EL USUARIO EXISTE
            if (existingUser) { 

                fav_itinerary.save()
                .then(fav_itinerary => {
                    res.send(fav_itinerary)
                })
                .catch(err => {
                    res.status(500).send("Error" + err)
                })

            }
            // SI EL USUARIO NO EXISTE: ERROR
            else res.status(500).send("This user doesn't exist")
    
        }
    
});
*/

module.exports = router