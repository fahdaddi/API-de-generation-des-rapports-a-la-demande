const express = require('express');
const route = express.Router();
const multer  = require('multer');
const xlsxtojson = require('xlsx-to-json-lc');
const xlstojson = require('xls-to-json-lc');
const fs =require('fs');

var results;
var results_ericsson;
var agadir;
var casablanca;
var marrakech;
var meknes;
var oujda;
var rabat;
var tanger;
var classif;
var nomination_erric;
var nomination_erric_2;
var adresses
/*fs.readFile('json/Classification/classif.json','utf-8',(err,data)=>{
  if(err)  console.log("impossible de lire le fichier des classifications :\n"+err);
  classif=data;
});
*/
fs.readFile('json/adresse.json','utf-8',(err,data)=>{
  if(err) console.log("error occured while reading the classif_erric's json file : \n"+err);
  adresses=JSON.parse(data);
});

fs.readFile('json/Classification/sites_erric_nomination_erric.json','utf-8',(err,data)=>{
  if(err) console.log("error occured while reading the classif_erric's json file : \n"+err);
  nomination_erric=JSON.parse(data);
});

fs.readFile('json/Classification/sites_erric_nomination_normale.json','utf-8',(err,data)=>{
  if(err) console.log("error occured while reading the huawei's json file : \n"+err);
  nomination_erric_2=JSON.parse(data);
});

fs.readFile('json/villes/agadir.json','utf-8',(err,data)=>{
  if(err) console.log("error occured while reading the huawei's json file : \n"+err);
  agadir=JSON.parse(data);
});

fs.readFile('json/villes/Casablanca.json','utf-8',(err,data)=>{
  if(err) console.log("an error've been occured while reading the ericsson's json file : \n"+err);
  casablanca = JSON.parse(data);
});

fs.readFile('json/villes/marrakech.json','utf-8',(err,data)=>{
  if(err) console.log("error occured while reading the huawei's json file : \n"+err);
  marrakech=JSON.parse(data);
});

fs.readFile('json/villes/meknes.json','utf-8',(err,data)=>{
  if(err) console.log("error occured while reading the huawei's json file : \n"+err);
  meknes=JSON.parse(data);
});

fs.readFile('json/villes/oujda.json','utf-8',(err,data)=>{
  if(err) console.log("error occured while reading the huawei's json file : \n"+err);
  oujda=JSON.parse(data);
});

fs.readFile('json/villes/rabat.json','utf-8',(err,data)=>{
  if(err) console.log("error occured while reading the huawei's json file : \n"+err);
  rabat=JSON.parse(data);
});

fs.readFile('json/villes/tanger.json','utf-8',(err,data)=>{
  if(err) console.log("error occured while reading the huawei's json file : \n"+err);
  tanger=JSON.parse(data);
});

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
        output: "./publique/converted/Huawei.json", //since we don't need output.json
        lowerCaseHeaders:true
        }, function(err,result){
          if(err) {
            return res.json({error_code:1,err_desc:err, data: null});
          }
          //res.json({error_code:0,err_desc:null, data: result});
        //  res.render("siteshs/type-du-rapport",{
        results=result;
        res.redirect("/siteshs/classification")
      /*  res.render("siteshs/rapport-par-villes",{
            //data:result,
            alarms:result,
            agadir:agadir,
            casablanca:casablanca,
            marrakech:marrakech,
            meknes:meknes,
            oujda:oujda,
            rabat:rabat,
            tanger:tanger
          });*/
        });
    } catch (e){
      res.json({error_code:1,err_desc:"Corupted excel file"});
    }
  });
  //  console.log(req.file);
  //  res.render("siteshs/type-du-rapport");
})

route.get("/upload_ericsson",(req,res,next)=>{
  res.render("siteshs/upload_ericsson");
});

route.post('/upload_ericsson',function(req,res,next){
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
        output: "./publique/converted/ericson.json", //since we don't need output.json
        lowerCaseHeaders:true
        }, function(err,result){
          if(err) {
            return res.json({error_code:1,err_desc:err, data: null});
          }
          //res.json({error_code:0,err_desc:null, data: result});
        //  res.render("siteshs/type-du-rapport",{
        results_ericsson=result;
        res.redirect("/siteshs/classificationeric")
        });
    } catch (e){
      res.json({error_code:1,err_desc:"Corupted excel file"});
    }
  });
  //  console.log(req.file);
  //  res.render("siteshs/type-du-rapport");
})



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
        classif=result;
        res.render("siteshs/rapport-par-villes",{
            alarms:results,
            agadir:agadir,
            casablanca:casablanca,
            marrakech:marrakech,
            meknes:meknes,
            oujda:oujda,
            rabat:rabat,
            tanger:tanger,
            classification:classif,
            adresses:adresses
          });
        });
    } catch (e){
      res.json({error_code:1,err_desc:"Corupted excel file"});
    }
  });
})


/*

route.get("/site/:siteID/:vender",(req,res,next)=>{
  res.render("siteshs/site-hs",
  {
    alarms:results,
    alarm_ericson:results_ericsson,
    classification:classif,
    nomination_erric : nomination_erric,
    nomination_erric_2 : nomination_erric_2,
    site:req.params.siteID,
    vender:req.params.vender
  })
});


route.get("/secteur/:secteurID",(req,res,next)=>{
  var secteurID = req.params.secteurID;
  res.render("siteshs/secteur-hs",{
    alarms:results,
    alarm_ericson:results_ericsson,
    classification:classif,
    secteur:secteurID
  })
});
*/

route.get("/classificationeric",(req,res,next)=>{
  res.render("manage/miseajourclassiferic");
});
route.post('/classificationeric',function(req,res,next){
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
        classif=result;
        res.render("siteshs/rapport-par-villes-eric",{
            alarms_ericson:results_ericsson,
            agadir:agadir,
            casablanca:casablanca,
            marrakech:marrakech,
            meknes:meknes,
            oujda:oujda,
            rabat:rabat,
            tanger:tanger,
            classification:classif,
            nomination_erric : nomination_erric,
            nomination_erric_2 : nomination_erric_2,
            adresses : adresses
          });
        });
    } catch (e){
      res.json({error_code:1,err_desc:"Corupted excel file"});
    }
  });
})


module.exports = route
