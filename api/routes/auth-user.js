const express=require('express');
const router=express.Router();
const {userValidate}=require('../middleware/userValidate');
const {loginValidate}=require('../middleware/loginValidate');
const passwordAuth=require('../middleware/password-auth');
const passwordValidateWithToken=require('../middleware/token-password');




const {
    login,
    registerUser,
    updateToken
}=require('../controller/auth-user');


router.route('/login').post(passwordAuth,loginValidate,login);
router.route('/register').post(userValidate,registerUser);
router.route('/authorize').post(passwordValidateWithToken,updateToken);

module.exports=router;