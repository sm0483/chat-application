//server set up for testing purpose

const express= require('express');
const app=express();
require('dotenv').config();
const pageNotFound=require('../middleware/not-found');

const User=require('../models/user');



// to read json request
app.use(express.json());
const {connectDb,closeDb}=require('../db/connect');
const errorHandler=require('../middleware/err');
//routes for auth

const userRoute=require('../routes/auth-user');


app.use('/api/v1/auth',userRoute);

const port=process.env.PORT || 3000;


app.listen(port);

const start=async()=>{
    try{
        const connect= await connectDb(process.env.URL);
    }catch(err){
        console.log(err);
    }

}
start();

app.use(errorHandler);
app.use(pageNotFound);
module.exports=app;