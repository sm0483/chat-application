const express=require('express');
const router=express.Router();
const passwordValidate=require('../middleware/passwd');

const {
    serveLogin,
    serveRegister,
    createUser,
    logout,
    testRendder

}=require('../controller/user');
const passport = require('passport');




router.route('/auth/login').get(serveLogin).post(passport.authenticate('local',{failureRedirect:'/chatapp/auth/login'}),
(req,res)=>{
    res.redirect('/chatapp/main');
});
router.route('/auth/register').get(serveRegister).post(passwordValidate,createUser);
router.route('/auth/logout').get(logout);
router.route('/main').get(testRendder);



module.exports=router;