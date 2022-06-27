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
    //TODO
    //create user using using mongDb
    //redirect to login page
    res.status(301).redirect('/chatapp/auth/login');

})

const loginUser=asyncWrapper(async(req,res)=>{
        //TODO
    //just show chat app
    //-->should server jwt token
    //-->should show application
        //>applcation page should have a chat route
           //>>should have capacity to create room 
           //>>add peopel to system
           //>>remove user from system

        //>should have get details route 
        //>should have option to edit application
           //>>if edit happens then should redirect to password validation
           
})


module.exports={
    serveLogin,
    serveRegister,
    createUser,
    loginUser
}