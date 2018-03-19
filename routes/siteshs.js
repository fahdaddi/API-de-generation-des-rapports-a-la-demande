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

var upload = multer({ storage: storage });




//route.use(upload());
route.get("/upload",(req,res,next)=>{
  res.render("siteshs/upload");
});

route.post('/upload',upload.single("file"),function(req,res,next){
    console.log(req.file);
    res.render("siteshs/type-du-rapport");
})


module.exports = route
