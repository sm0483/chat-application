const 
{
    testRoute,
    createContact,
    // deleteContact,
    getAllMessageId,
    getMessageId,
}=require('../controller/contact');
const authjwt=require('../middleware/token-auth');

const express=require('express');
const router=express.Router();

router.route('/test').get(testRoute);

router.route('/').post(authjwt,createContact);
router.route('/find/:senderId/:reciverId').get(authjwt,getMessageId);
router.route('/find/:senderId').get(authjwt,getAllMessageId);



module.exports=router;