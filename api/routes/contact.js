const 
{
    testRoute,
    createContact,
    // deleteContact,
    getAllMessageId,
    getMessageId,
}=require('../controller/contact');
const authjwt=require('../middleware/token-auth');
const matchToken=require('../middleware/check-token');
const contactValidate=require('../middleware/contact-valid');

const express=require('express');
const router=express.Router();

router.route('/test').get(testRoute);

router.route('/').post(contactValidate,matchToken,authjwt,createContact);
router.route('/find/:senderId/:reciverId').get(matchToken,authjwt,getMessageId);
router.route('/find/:senderId').get(matchToken,authjwt,getAllMessageId);



module.exports=router;