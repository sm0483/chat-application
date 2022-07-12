const express=require('express');
const router=express.Router();
const userValidate=require('../middleware/userValidate');

const {
    testRoute,
    login,
    registerUser
}=require('../controller/user');


router.route('/login').post(login);
router.route('/register').post(userValidate,registerUser);
router.route('/test').get(testRoute);


module.exports=router;