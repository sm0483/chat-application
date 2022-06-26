const asyncWrapper=require('../error/asyncWrapper');

//-->server login page 
//-->server regiter page

// after login 


const serveLogin=asyncWrapper(async(req,res)=>{
    res.render('login.ejs');
})

const serveRegister=asyncWrapper(async(req,res)=>{
    res.render('register.ejs');
})

const createUser=asyncWrapper(async(req,res)=>{
    //create user using using mongDb
    //redirect to login page
    res.status(301).redirect('/chatapp/auth/login');

})

const loginUser=asyncWrapper(async(req,res)=>{
    //open chat application
})


module.exports={
    serveLogin,
    serveRegister,
    createUser,
    loginUser
}