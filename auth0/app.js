var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
const app = express();
app.get('/test',(req,res,next)=>{
 res.send({message:"Server is on"});
})
// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
// Handle auth failure error messages
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({message: err.message,error: {} });
});
app.listen(3001,()=>{
console.log("Server is now running on port 3001");
});
module.exports = app;