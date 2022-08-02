const asyncWrapper = require('../error/asyncWrapper');
const {
    createMessageDb,
    deleteMessageDb,
    getAllMessageDb,
}=require('../db/message-operation');

const { StatusCodes } = require('http-status-codes');

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

const getAllMessage=asyncWrapper(async(req,res)=>{
	//get contactId and fetch all message
	//fetch all message 
	//send back message in sorted from such 
	const {contactId}=req.params;

	const response=await getAllMessageDb({contactId});
	
	res.status(StatusCodes.OK).json({
		"message":response,
		"status":StatusCodes.OK
	})
	// {
	// 	message:{
	// 	    sendMesage:[],
	// 	    recivedMessage:[],
	// 	},
	// 	status:StatusCodes.OK

		
	// }

})


module.exports={
	createMessage,
	getAllMessage,
	deleteMessage,
	testRouter
}