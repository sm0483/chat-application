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
    res.status(StatusCodes.OK).json({
        "test":"working",
        "status":StatusCodes.OK
    })
})


const registerUser=asyncWrapper(async(req,res)=>{
    const newUser=await createUserDb(req.body);
    const token=newUser.createJwt();
    res.status(StatusCodes.OK).json({
        "token":token,
        "status":StatusCodes.OK
    })
})


module.exports={
    login,
    registerUser
}