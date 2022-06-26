const express= require('express');
const http=require('http');
const app=express();
const server=http.createServer(app);
const {Server}=require('socket.io');
const io=new Server(server);
const path=require('path');
require('dotenv').config();
app.use(express.json());
const connectDb=require('./db/connect');
const errorHandler=require('./middleware/err');
//routes for auth

const userRoute=require('./routes/auth-user');
//app.use(require('body-parser').json());


app.set('view engine','ejs');
app.set('views','/home/user/Desktop/project/real-time-chat-app/views/html');

io.on('connection',(socket)=>{
    console.log('a user connected');

})



app.use('/chatapp',userRoute);


const port=process.env.PORT || 3000;



server.listen(port,()=>{
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

module.exports=app;