let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let usersDetailsRouter = require('./routes/userDetails');
let elephantSQL = require('./DB/elephantSQL');
let singleUser = require('./DB/singleUser');
let createUser = require('./DB/createUser');
let updateUser = require('./DB/updateUser');
let deleteUser = require('./DB/deleteUser');
const detailsValidation =require('./validation/validateUser');

let app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users/:id',usersDetailsRouter);
app.use('/elephantUsers',elephantSQL);

// getting a user details by id 
app.use('/elephantUsers/:id',(req,res,next)=>{
  req.id=req.params.id;
  singleUser(req,res);
});

// // creating a new user
// app.use('/newUser/:firstName/:lastName/:age',detailsValidation,(req,res,next)=>{
//   req.firstName=req.params.firstName;
//   req.lastName=req.params.lastName;
//   req.age=req.params.age;
//   console.log("req is ",req.firstName,req.lastName,req.age)
//   createUser(req,res);
// });


// creating a new user
app.use('/newUser',detailsValidation,(req,res,next)=>{
   req.firstName=req.body.firstName;
   req.lastName=req.body.lastName;
   req.age=req.body.age;
   console.log("req is ",req.firstName,req.lastName,req.age)
   createUser(req,res);
 });



// sending message bad input 
app.use('/newUser/*',(req,res,next)=>{
  req.firstName=req.params.firstName;
  req.lastName=req.params.lastName;
  req.age=req.params.age;
  console.log("req is ",req.firstName,req.lastName,req.age)
  if(!req.firstName||!req.lastName||!req.age){
    return res.status(400).send("Bad Request !")
  }
});

// updating user detils
app.use('/updateUser/:id',detailsValidation,(req,res,next)=>{
  req.id=req.params.id;
  req.firstName=req.body.firstName;
  req.lastName=req.body.lastName;
  req.age=req.body.age;
  console.log(`update value of id ${req.id} `,req.firstName,req.lastName,req.age)
  updateUser(req,res);
});


//deleting a user 
app.use('/users/:id',(req,res,next)=>{
  req.id=req.params.id;
  deleteUser(req,res);
});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

