const express=require('express');
const router=express.Router();
const matchTokenWithInput=require('../middleware/token-userId');
const authJwt=require('../middleware/token-auth');
const messageValidate=require('../middleware/message-valid');



const {	
	createMessage,
	getAllMessage,
	deleteMessage,
	testRouter
}=require('../controller/message');

// get /:id getMessage
// post / create message
// delete /:id delete message

//while fetching from database there should use senderId and contactId together
//else they get access to all message with only contactId
//to avoid that set up middleware which decrypt the token use userId from there in next request
// it will end that flow

router.route('/test').get(authJwt,testRouter);
router.route('/:contactId').get(authJwt,getAllMessage);
router.route('/').post(messageValidate,authJwt,matchTokenWithInput,createMessage);

module.exports=router;