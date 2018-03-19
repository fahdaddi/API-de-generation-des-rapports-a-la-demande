var express = require('express');
var route = express.Router();


route.get('/',(req,res,next)=>{
  res.render('index');
});


module.exports = route
