const express = require('express');
const bb = require('connect-busboy')
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.port || 1200;
const app = express();

//connect-busboy middleware
app.use(bb());

//bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//connection à la base de données MongoDB
mongoose.connect('mongodb://localhost/noc');
const db = mongoose.connection;

//configuration des liens
const index = require('./routes/index');
const siteshs = require('./routes/siteshs');
const manage = require('./routes/manage')

//declaration du language des vues
app.set('views', path.join("vues"));
app.set('view engine','pug');

//declaration du dossier publique
app.use(express.static(path.join(__dirname,"publique")));

//les routes
app.use('/',index);
app.use('/siteshs',siteshs);
app.use('/manage',manage);
app.get('*',(req,res,next)=>{
  res.render('error_404');
});

app.listen(port,()=>{
  console.log("http:\\localhost:"+port);
})
