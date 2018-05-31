const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/main');

module.exports = (passport)=>{
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
  opts.secretOrKey = config.secret_Key;
  passport.use(new jwtStrategy(opts , (jwt_payload,done)=>{
    User.findOne({id:jwt_payload.id} , (err,user)=>{
      if(err){
        return done(err,false);
      }
      if(user){
        done(null,user);
      } else{
        done(null,false)
      }
    });
  }));
}
