const route = require('express').Router();
const fs = require('fs');


var villedessites;
var file = 'json/villes.json';
var ville;


route.get('/ajouter_ville',(req,res,next)=>{
  fs.readFile('json/villes.json',(err,data)=>{
    if(err) throw err;
    ville = JSON.parse(data);
  });
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
  fs.readFile('json/villes.json',(err,data)=>{
    if(err) throw err;
    ville = JSON.parse(data);
  });
  res.render("manage/ajouter_site",{
    villes:ville
  });
});



route.post('/ajouter_site',(req,res,next)=>{
  var reqVille = req.body.ville;
  var nouveauSite = ""+req.body.name_ville;
  fs.readFile('json/villes/'+reqVille+'.json',(err,data)=>{
    if(err) console.log(err);
    data=JSON.parse(data);
    data.push(nouveauSite);
    var file = 'json/villes/'+reqVille+'.json';
    fs.writeFile(file,JSON.stringify(data,null,2),(err)=>{
      if(err) throw err;
      console.log(JSON.stringify(data));
      console.log('writing to ' + file);
      res.redirect('/manage/ajouter_site');
    });

  });

});

module.exports = route;
