const route = require('express').Router();
const fs = require('fs');
const multer  = require('multer');
const xlsxtojson = require('xlsx-to-json-lc');
const xlstojson = require('xls-to-json-lc');




var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './json/Classification')
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


route.get("/classification",(req,res,next)=>{
  res.render("manage/miseajourclassif");
});

route.post('/classification',function(req,res,next){
  let exceltojson;
  upload(req,res,function(err){
    if(err){
      res.json({error_code:1,err_desc:err});
      return;
    }
    if(!req.file){
      res.json({error_code:1,err_desc:"No file passed"});
      return;
    }
    if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
      exceltojson = xlsxtojson;
    } else {
      exceltojson = xlstojson;
    }
    try {
      exceltojson({
        input: req.file.path, //the same path where we uploaded our file
        output: "./json/Classification/classif.json", //since we don't need output.json
        lowerCaseHeaders:true
        }, function(err,result){
          if(err) {
            return res.json({error_code:1,err_desc:err, data: null});
          }
        results=result;
        res.redirect("/siteshs/upload");
        });
    } catch (e){
      res.json({error_code:1,err_desc:"Corupted excel file"});
    }
  });
})


route.get('/ajouter_site',(req,res,next)=>{
  res.send("manage/ajouter un site")//changes should go here !!
});

module.exports = route;
