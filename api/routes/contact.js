const 
{
    testRoute,
    createContact,
    // deleteContact,
    getAllMessageId,
    getMessageId,
}=require('../controller/contact');

const express=require('express');
const router=express.Router();

router.route('/test').get(testRoute);

router.route('/').post(createContact);
router.route('/find/:senderId/:reciverId').get(getMessageId);
router.route('/find/:senderId').get(getAllMessageId);



module.exports=router;