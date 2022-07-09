const asyncWrapper=require('../error/asyncWrapper');
const {createUserDb}=require('../db/dboperation');
const CustomError = require('../error/custom');


//serve login route
//serever Register form

const serveLogin=asyncWrapper(async(req,res)=>{
    const errorMessage=res.locals.error;
    const loginMessage=res.locals.success;
    if(errorMessage && errorMessage.length){
        return res.render('login',{msg:undefined,error:errorMessage});
    }
    else if(loginMessage && loginMessage.length){
        return res.render('login',{msg:loginMessage,error:undefined});
    }
    return res.render('login',{msg:undefined});
    
})


const serveRegister=asyncWrapper(async(req,res)=>{
    const passwordMessage=res.locals.password;
    const userExistMessage=res.locals.userExist;
    if(passwordMessage && passwordMessage.length){
        return res.render('register',{msg:passwordMessage});
    }
    else if(userExistMessage && userExistMessage.length){
        return res.render('register',{msg:userExistMessage});
    }
    res.render('register',{msg:passwordMessage});


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