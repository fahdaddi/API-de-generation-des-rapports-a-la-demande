const route = require('express').Router();
const fs = require('fs');
var file = 'json/villes.json';
var ville;
fs.readFile('json/villes.json',(err,data)=>{
  if(err) throw err;
  ville = JSON.parse(data);
});

route.get('/ajouter_ville',(req,res,next)=>{

  res.render("manage/ajouter_ville",{
    villes:ville
  })
});

route.post('/ajouter_ville',(req,res,next)=>{
  var nouvelleVille = req.body.name_ville;
  nouvelleVille = nouvelleVille[0].toUpperCase() + nouvelleVille.substring(1,ville.length);
  ville.push(nouvelleVille);
  fs.writeFile(file,JSON.stringify(ville,null,2),(err)=>{
    if(err) throw err;
    console.log(JSON.stringify(ville));
    console.log('writing to ' + 'json/villes.json');
  });
  res.redirect('/manage/ajouter_ville');
});



route.get('/ajouter_site',(req,res,next)=>{
  res.send("manage/ajouter un site")//changes should go here !!
});

module.exports = route;
