const asyncWrapper=require('../error/asyncWrapper');
const {createUserDb}=require('../db/db-operation');
const CustomError = require('../error/custom');


const {
    StatusCodes,
    getReasonPhrase
}=require('http-status-codes');



//routes
//----------------
//>login routes
//>register routes


const login=asyncWrapper(async(req,res)=>{
    res.status(200).json({
        "test":"working",
        "status":200
    })
})


const registerUser=asyncWrapper(async(req,res)=>{
    const newUser=await createUserDb(req.body);
    const token=newUser.createJwt();
    res.status(200).json({
        "token":token,
        "status":200
    })
})


module.exports={
    login,
    registerUser
}