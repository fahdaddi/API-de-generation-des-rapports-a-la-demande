const express = require('express');
const route = express.Router();
const multer  = require('multer');
const xlsxtojson = require('xlsx-to-json-lc');
const xlstojson = require('xls-to-json-lc');


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
        output: "./publique/converted/data.json", //since we don't need output.json
        lowerCaseHeaders:true
        }, function(err,result){
          if(err) {
            return res.json({error_code:1,err_desc:err, data: null});
          }
          //res.json({error_code:0,err_desc:null, data: result});
          res.render("siteshs/type-du-rapport",{
            data:result
          });
        });
    } catch (e){
      res.json({error_code:1,err_desc:"Corupted excel file"});
    }
  });
  //  console.log(req.file);
  //  res.render("siteshs/type-du-rapport");
})


module.exports = route
