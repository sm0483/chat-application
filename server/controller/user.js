const asyncWrapper=require('../error/asyncWrapper');
const {createUserDb}=require('../db/dboperation');
const CustomError = require('../error/custom');
const passport=require('passport');


//serve login route
//serever Register form

const serveLogin=asyncWrapper(async(req,res)=>{
    res.render('login',{ msg:res.locals.success});
})


const serveRegister=asyncWrapper(async(req,res)=>{
    res.render('register');

})

const createUser=asyncWrapper(async(req,res)=>{
    const user=await createUserDb(req.body);
    req.flash('success','user created successfully');
    res.redirect('/chatapp/auth/login');
})


const logout=asyncWrapper(async(req,res)=>{
    req.logout(function(err){
        if(err)throw new CustomError("internal error",500);
    });
    res.redirect('/chatapp/auth/login');
})


//move frm here
const testRendder=asyncWrapper(async(req,res)=>{
    req.flash('message');

    if(req.isAuthenticated()){
        return res.render('dummy');
    }
    return res.redirect('/chatapp/auth/login');

})
// end--



module.exports={
    serveLogin,
    serveRegister,
    createUser,
    logout,
    testRendder
}