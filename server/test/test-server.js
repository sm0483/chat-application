const express= require('express');
const http=require('http');
const app=express();
const path=require('path');
require('dotenv').config();
const flashMiddleware=require('../middleware/flash');

const pageNotFound=require('../middleware/not-found');
//flash message

const flash=require('connect-flash');
//use of cookiparser
const cookieParser = require('cookie-parser');



//passport passport-local
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('../models/user');



// to read body from html page
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("/home/user/Desktop/project/real-time-chat-app/views"));

app.use(express.json());
const errorHandler=require('../middleware/err');
//routes for auth

const userRoute=require('../routes/auth-user');
//app.use(require('body-parser').json());

app.use(cookieParser("hellowordl"));


//used for passport
app.use(
    require("express-session")({
      secret: process.env.sessionKey,
      resave: false,
      saveUninitialized: false
    })
  );

app.use(flash());
//pasport-local

app.use(passport.initialize());
app.use(passport.session());

app.use(flashMiddleware);




//passport -login presistence
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.set('view engine','ejs');
app.set('views','/home/user/Desktop/project/real-time-chat-app/views/html');


app.use('/test/chatapp',userRoute);

const port=process.env.PORT || 5000;





app.use(errorHandler);
app.use(pageNotFound);

module.exports=app;