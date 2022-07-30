const asyncWrapper = require('../error/asyncWrapper');
const {
  createMessageDb,
  deleteMessageDb,
  getMessageByUserid,
  getMessageDbByMessageId
}=require('../db/message-operation');

const { StatusCodes } = require('http-status-codes');

//create
//delete
//require


const testRouter=asyncWrapper(async(req,res)=>{
	res.send('test route working ');

})

const createMessage=asyncWrapper(async(req,res)=>{
	//first get message id and message from body of request 
	//create that message
	//send back that message to client

})

const deleteMessage=asyncWrapper(async(req,res)=>{
	//TODO
  
})

const getAllMessage=asyncWrapper(async(req,res)=>{
	//fetch user id from req.userDb and fetch message id from req.params
	// then send both in object to database and find message 
	//send back retrived message

})


module.exports={
	createMessage,
	getAllMessage,
	deleteMessage,
	testRouter
}