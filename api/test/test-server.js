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

const authRoute=require('../routes/auth-user');
const userRoute=require('../routes/user');
const appUser=require('../routes/list');
const messageRoute=require('../routes/message');
const contactRoute=require('../routes/contact');


app.use('/api/v1/auth',authRoute);
app.use('/api/v1/user',userRoute);
app.use('/api/v1/',appUser);
app.use('/api/v1/message',messageRoute);
app.use('/api/v1/contact',contactRoute);





const port=process.env.PORT || 3000;


const server=app.listen(port);

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
module.exports=server;