const express=require('express');
const router=express.Router();
const matchTokenWithInput=require('../middleware/match-token');
const authJwt=require('../middleware/token-auth');


const {	
	createMessage,
	getAllMessage,
	deleteMessage,
	testRouter
}=require('../controller/message');

// get /:id getMessage
// post / create message
// delete /:id delete message

//while fetching from database there should use senderId and messageid together
//else they get access to all message with only message id
//to avoid that set up middleware which decrypt the token use userId from there in next request
// it will end that flow

router.route('/test').get(testRouter);
router.route('/:messageId').get(getAllMessage).delete(deleteMessage);
router.route('/').post(createMessage);

module.exports=router;