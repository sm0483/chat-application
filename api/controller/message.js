const asyncWrapper = require('../error/asyncWrapper');
const {
    createMessageDb,
    deleteMessageDb,
    getAllMessageDb,
}=require('../db/message-operation');

const { StatusCodes } = require('http-status-codes');
const mongoose=require('mongoose');

//create
//delete
//require


const testRouter=asyncWrapper(async(req,res)=>{
	res.send('test route working ');

})

const createMessage=asyncWrapper(async(req,res)=>{
	const createdMessage=await createMessageDb(req.body);
	res.status(StatusCodes.OK).json({
		"message":createdMessage,
		"status":StatusCodes.OK
	})

})

const deleteMessage=asyncWrapper(async(req,res)=>{
	//TODO
  
})


const getSorted=(response,userId)=>{
	 const sendMessage=response.filter((obj)=>{
		if(obj.senderId.toString()===userId){
			return obj;
		}
	});

	 const recivedMessage=response.filter((obj)=>{
		if(obj.senderId.toString()!==userId){
			return obj;
		}
	})

	return {sendMessage,recivedMessage}


}



const getAllMessage=asyncWrapper(async(req,res)=>{
	//get contactId and fetch all message
	//fetch all message 
	//send back message in sorted from such 
	const {contactId}=req.params;
	const{userId}=req.user;

	const response=await getAllMessageDb({contactId});
	const {sendMessage,recivedMessage}=getSorted(response,userId);

	res.status(StatusCodes.OK).json({
		"sendMessage":[
			...sendMessage
		],
		"recivedMessage":[
			...recivedMessage
		],
		status:StatusCodes.OK
	})

})


module.exports={
	createMessage,
	getAllMessage,
	deleteMessage,
	testRouter
}