const express = require('express')
const router = express.Router()
const User = require('../model/userModel.js')
const itineraryModel = require('../model/itineraryModel')
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
        console.log("req user: ", req.user)
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

router.put('/fav-itinerary/:itinerary_id',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {

        console.log(req.user)
        
        let itineraryToUpdate = req.params.itinerary_id;

        // Check that the desired itinerary exists
        itineraryModel.findById(itineraryToUpdate)
        .then(itinerary => {
            if (itinerary) {

                // Find the user to update
                User.findById(req.user._id)
                .then(user=> {

                    // Find the itinerary to update
                    User.findOne({fav_itineraries:itineraryToUpdate})
                    .then(repeatedItinerary=> {
                        
                        if(repeatedItinerary){

                            // Delete the itinerary from favourites
                            user.fav_itineraries.splice(itineraryToUpdate)
                            return user.save()

                        } else {
                             
                            // Save the itinerary as favourite in logged user's object
                            user.fav_itineraries.push(itineraryToUpdate)
                            return user.save()

                        }

                    })
                    .then(updatedUser => {
                        // Return on postman the updated user
                        console.log(updatedUser)
                        res.send(updatedUser)
                    })
                    .catch(err => { res.status(500).send("Error" + err) })
                    
                })
                
            }

        })
        .catch(err => { res.status(500).send("Error" + err) })

    }
);

module.exports = router