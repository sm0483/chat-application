const express= require('express');
const app=express();
require('dotenv').config();
const pageNotFound=require('./middleware/not-found');
//flash message


//use of cookiparser
const cookieParser = require('cookie-parser');



//passport passport-local
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user');



// to read json request
app.use(express.json());
const connectDb=require('./db/connect');
const errorHandler=require('./middleware/err');
//routes for auth

const userRoute=require('./routes/auth-user');
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


  //for auth

app.use(passport.initialize());
app.use(passport.session());






//passport -login presistence
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use('/chatapp',userRoute);

const port=process.env.PORT || 3000;


app.listen(port,()=>{
    console.log('sever running----');
})

const start=async()=>{
    try{
        const connect= await connectDb(process.env.URL);
        console.log('connnected---');
    }catch(err){
        console.log(err);
    }

}
start();

app.use(errorHandler);
app.use(pageNotFound);
module.exports=app;