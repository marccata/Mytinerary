const express = require('express')
const router = express.Router()
const User = require('../model/userModel.js')
const bcrypt = require('bcrypt');
const key = require("../keys.js");
const jwt = require("jsonwebtoken");


router.get('/test', (req, res) => {
    res.send({ msg: 'Log in test route.' })

})

router.post('/', (req, res) => {

    let logInUser = {
        email: req.body.email,
        password: req.body.password,
    }

    const payload = {
        email: logInUser.email,
        user_img: logInUser.user_img
    };

    const options = {expiresIn: 2592000};

    console.log(logInUser);

    User.findOne({ email : logInUser.email }) 
        .then(existingUser => {
            if(!existingUser) res.status(400).json({msg: 'Wrong user'})

            
            // SI EL USUARIO EXISTE
            if (existingUser) { 
                // CHECK SI LA CONTRASEÑA ES CORRECTA
                bcrypt.compare(logInUser.password, existingUser.password)
                    .then(passwordOk => {
                        console.log(passwordOk)
                        // SI LA CONTRASEÑA ESTA MAL: ERROR
                        if(!passwordOk) return res.status(400).json({msg: 'Wrong password'});
                        
                        // SI LA CONTRASEÑA ES OK, CREA EL TOKEN
                        jwt.sign(
                            payload,
                            key.secretOrKey,
                            options,
                            (err, token) => {
                                if(err){
                                    res.json({
                                        success: false,
                                        token: "There was an error"
                                    });
                                } else {
                                    res.json({
                                        success: true,
                                        token: token
                                    });
                                }
                            }
                        )
                        

                    })
            } 

            // SI EL USUARIO NO EXISTE: ERROR
            else res.status(500).send("This user doesn't exist")
            
        })
        .catch(err => console.log(err));

})

router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      userModel
        .findOne({ _id: req.user.id })
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

module.exports = router