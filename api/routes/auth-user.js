const express=require('express');
const router=express.Router();
const passwordValidate=require('../middleware/passwd');

const {
    testRoute,
    login,
    registerUser
}=require('../controller/user');






router.route('/login').post(login);
router.route('/register').post(registerUser);
router.route('/test').get(testRoute);


module.exports=router;