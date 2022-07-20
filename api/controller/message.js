const asyncWrapper = require('../error/asyncWrapper');
const contactModel=require('../models/message');

//create
//delete
//require


const createMessage=asyncWrapper(async(req,res)=>{

})

const deleteMessage=asyncWrapper(async(req,res)=>{

})

const getMessage=asyncWrapper(async(req,res)=>{
    //as send id
    //as reciver id
    // club it and sort and send back data to client

    
})


module.exports={
  createMessage,
  getMessage,
  deleteMessage
}