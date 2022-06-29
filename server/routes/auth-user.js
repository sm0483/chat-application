const express=require('express');
const router=express.Router();
const passwordValidate=require('../middleware/passwd');

const {
    serveLogin,
    serveRegister,
    loginUser,
    createUser

}=require('../controller/user');



router.route('/auth/login').get(serveLogin).post(loginUser);
router.route('/auth/register').get(serveRegister).post(passwordValidate,createUser);



module.exports=router;