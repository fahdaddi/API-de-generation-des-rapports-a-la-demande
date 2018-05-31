const jwt = require('jsonwebtoken');

const config = require('./main');
const User = require('../models/user')

function verifyToken(req, res, next) {
  let token;
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    token = req.headers.authorization.split(' ')[1];
  }
  jwt.verify(token, config.secret_Key, (error, decoded) => {
    console.log("decoded" , decoded);
    if (error) {
      const data = handleTokenError(error);
      res.status(401).send(data);
    } else {
      handleTokenSuccess(decoded, (err, authUser) => {
        if (err) {
          res.status(401).send(err);
        } else {
          // eslint-disable-next-line  no-param-reassign
          req.user = authUser;
          req.token = token;
          next();
        }
      });
    }
  });
}
function handleTokenSuccess(decoded, callback) {
  const user = User.findOne({'username':decoded.username}, (err,user)=>{
    console.log("user",user);
    if(err){
      callback({ message: err.message }, null);
    } else if (user === null) {
      callback({ message: 'user not found' }, null);
    } else {
      callback(null, user);
    }
  })

}
function handleTokenError(error) {
  const name = error.name;
  const data = {};
  switch (name) {
    case 'JsonWebTokenError':
      data.errors = ['wrong token provided v5'];
      break;
    case 'TokenExpiredError':
      data.errors = ['token has expired please refresh'];
      break;
    default:
      data.errors = ['unhandled authentication case'];
      break;
  }
  return data;
}

module.exports = verifyToken;
