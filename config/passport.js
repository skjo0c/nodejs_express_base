const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
// const User = mongoose.model("users");
const User = require("../models/User");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      //   console.log(jwt_payload);
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            const {
              _id: id,
              username,
              email,
              firstName,
              lastName,
              address,
              mobile,
              avatar
            } = user;
            returnUser = {
              userId: id,
              username,
              email,
              firstName,
              lastName,
              address,
              mobile,
              avatar
            };
            return done(null, returnUser);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
