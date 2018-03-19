const express = require('express');
const route = express.Router();
const multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './publique/upload')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({
  storage: storage,
  fileFilter : function(req, file, callback) { //file filter
    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
      return callback(new Error('Wrong extension type'));
    }
    callback(null, true);
  }
}).single("file");




//route.use(upload());
route.get("/upload",(req,res,next)=>{
  res.render("siteshs/upload");
});

route.post('/upload',function(req,res,next){
  upload(req,res,function(err){
    if(err){
      res.json({error_code:1,err_desc:err});
      return;
    }
    res.send("siteshs/type-du-rapport");
  });
  //  console.log(req.file);
  //  res.render("siteshs/type-du-rapport");
})


module.exports = route
