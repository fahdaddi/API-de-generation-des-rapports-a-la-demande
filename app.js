const express = require('express');
const bb = require('connect-busboy')
const path = require('path');
const mongoose = require('mongoose');


const port = process.env.port || 1200;
const app = express();

//Body-parser connect-busboy middleware
app.use(bb());




//connection à la base de données MongoDB
mongoose.connect('mongodb://localhost/noc');
const db = mongoose.connection;

//configuration des liens
const index = require('./routes/index');
const siteshs = require('./routes/siteshs');


//declaration du language des vues
app.set('views', path.join("vues"));
app.set('view engine','pug');

//declaration du dossier publique
app.use(express.static(path.join(__dirname,"publique")));

//les routes
app.use('/',index);
app.use('/siteshs',siteshs);


app.listen(port,()=>{
  console.log("le serveur fonctionne sur le lien http:\\localhost:"+port);
})
