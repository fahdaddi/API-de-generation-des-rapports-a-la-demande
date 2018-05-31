const User = require('../models/user');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../config/main');
module.exports = (app) => {
  //register
  app.get('/cpanel/register',(req,res,next)=>{
    res.render('./cpanel/register');
  });

  app.post('/cpanel/register',(req,res,next)=>{
    if(!req.body.username || !req.body.password){
      res.json({success: false, message : "username or password not found!"});
    }else {
      var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
      var newUser = new User({
        username : req.body.username,
        password : md5(req.body.password),
        last_login : utc
      });

      //saving the user
      newUser.save((err, userSaved)=>{
        console.log("ERROR", userSaved);
        if(err){
          return res.json({ success : false, message : 'that username already exists!'});
        }
        res.json({success:true , message : 'Successfully created new user.'});
      });
    }
  });


  //Authenticate the user and get JWT
  app.get('/cpanel/Authenticate',(req,res,next)=>{
    res.render('./cpanel/Authenticate');
  });

  app.post('/cpanel/Authenticate',(req,res,next)=>{
    User.findOne({
      username : req.body.username
    }, (err,user)=>{
      if(err) throw err;

      if(!user){
        res.send({success : false , message: 'Authentication failed, '+req.body.username+' not found'});
      } else {
        //check if the password matches
        //TODO: crypt with md5 in frontend
        console.log(user.password, md5(req.body.password));
        if(user.password == md5(req.body.password)){
            //creat the token
            const token = jwt.sign(user.toJSON(), config.secret_Key, {
              expiresIn : config.expiration_time
            });
            res.render('./cpanel/redirect',{success : true, token : "JWT " + token});
        } else {
            res.send({success:false, message : "Authentication failed. Password did not match."})
        }
      }

    });
  });


  app.get('/secured/ping', function(req, res) {
    res.send(200, {text: "All good. You only get this message if you're authenticated"});
  })

  app.post('/secured/authorize-cookie', function(req, res) {
    res.cookie('id_token', req.body.token, { expires: new Date(Date.now() + 36000), httpOnly: true });
    res.send(200, { message: 'Cookie set!' });
  });

};
