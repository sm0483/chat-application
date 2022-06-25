const express=require('express');
const router=express.Router();

const {
    loginUser,
    registerUser
}=require('../controller/user');


router.route('/register').post(registerUser) //create user
router.route('/login').post(loginUser) // login user

module.exports=router;