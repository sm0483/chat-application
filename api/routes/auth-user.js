const express=require('express');
const router=express.Router();
const {userValidate}=require('../middleware/userValidate');
const {loginValidate}=require('../middleware/loginValidate');
const passwordAuth=require('../middleware/password-auth');


const {
    login,
    registerUser
}=require('../controller/auth-user');


router.route('/login').post(passwordAuth,loginValidate,login);
router.route('/register').post(userValidate,registerUser);


module.exports=router;