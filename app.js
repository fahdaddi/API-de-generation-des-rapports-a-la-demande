const express = require('express');
const bb = require('connect-busboy')
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongoos = require('mongoose');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');


const config = require('./config/main')
const port = process.env.port || 1200;
const app = express();
const User = require('./models/user');
const verifyToken = require('./config/authmidlleware')
//connect-busboy middleware
app.use(bb());

//bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//connection à la base de données MongoDB
mongoose.connect(config.database);
const db = mongoose.connection;

//configuration des liens
const index = require('./routes/index');
const siteshs = require('./routes/siteshs');
const manage = require('./routes/manage');
//const cpanel = require('./routes/cpanel');
//declaration du language des vues
app.set('views', path.join("vues"));
app.set('view engine','pug');

//login midllewar------------------------------------------------------------------------


// Initialize passport
app.use(passport.initialize());

//Bring in passport Strategy
require('./config/passport')(passport);




//login midllewar end------------------------------------------------------------------------











//declaration du dossier publique
app.use(express.static(path.join(__dirname,"publique")));

require('./routes/cpanel')(app);
app.use('/',index);
app.use(verifyToken);
//les routes
app.use('/siteshs',siteshs);
app.use('/manage', manage);
//app.use('/cpanel',cpanel);

app.get('*',(req,res,next)=>{
  res.render('error_404');
});

app.listen(port,()=>{
  console.log("http:\\localhost:"+port);
})
