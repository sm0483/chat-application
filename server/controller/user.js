const asyncWrapper=require('../error/asyncWrapper');
const {
    createUserDb,
    createToken
}=require('../db/dboperation');

//serve login route
//serever Register form

const serveLogin=asyncWrapper(async(req,res)=>{
    res.render('login');
})

const serveRegister=asyncWrapper(async(req,res)=>{
    res.render('register');

})

const createUser=asyncWrapper(async(req,res)=>{
    const user=await createUserDb(req.body);
    console.log(user);
})

const loginUser=asyncWrapper(async(req,res)=>{
    res.send('login serverlogin');

})




module.exports={
    serveLogin,
    serveRegister,
    createUser,
    loginUser
}