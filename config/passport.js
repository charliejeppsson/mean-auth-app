const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user'); // Bringing in the user model
const config = require('../config/database'); // Bringing in the database

// Export the passport config to make it accessible globally
module.exports = function(passport){
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload);
    User.getUserById(jwt_payload._doc._id, (err, user) => {
      if(err){
        return done(err, false);
      }

      if(user){
        // If a http request to a route set to require authentication is successful (i.e. with the right json web token passed, the whole user object will be returned in json format)
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}
