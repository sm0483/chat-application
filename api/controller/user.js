const asyncWrapper=require('../error/asyncWrapper');
const {createUserDb}=require('../db/dboperation');
const CustomError = require('../error/custom');


const {
    StatusCodes,
    getReasonPhrase
}=require('http-status-codes');



// New Structure
//login routes

//---->
// createUser
// Login user

;

const testRoute=asyncWrapper(async(req,res)=>{
    res.send('hello world');
})


const login=asyncWrapper(async(req,res)=>{
    res.send('hello world');
})


const registerUser=asyncWrapper(async(req,res)=>{
    const newUser=await createUserDb(req.body);
    res.status(200).json(newUser);
})


module.exports={
    testRoute,
    login,
    registerUser
}