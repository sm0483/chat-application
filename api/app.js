const express= require('express');
const app=express();
require('dotenv').config();
const pageNotFound=require('./middleware/not-found');
const authJwt=require('./middleware/auth');

const User=require('./models/user');



// to read json request
app.use(express.json());
const {connectDb}=require('./db/connect');
const errorHandler=require('./middleware/err');
//routes for auth

const authRoute=require('./routes/auth-user');
const userRoute=require('./routes/user');


app.use('/api/v1/auth',authRoute);
app.use('/api/v1/user',authJwt,userRoute);

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