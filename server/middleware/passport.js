const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require("../model/userModel");
const key = require("../keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey= key.secretOrKey;

module.exports = passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );

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