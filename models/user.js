const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
  username :{
    type : String,
    lowercase : true,
    unique : true,
    required : true
  },
  password:{
    type : String,
    required : true
  },
  last_login : {
    type : String,
    required: true
  },
  role:{
    type : String,
    enum : ["Client" , "Admin"],
    default : "Client"
  }
});

module.exports = mongoose.model('User',userSchema);
