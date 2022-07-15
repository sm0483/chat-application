const asyncWrapper=require('../error/asyncWrapper');
const {createUserDb, getUserbyMailDb,}=require('../db/db-operation');
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
    const {email,password}=req.body;
    const user=await getUserbyMailDb(email);
    const responce=user.comparePassword(password);
    if(!responce)throw new CustomError("invalid credentails",401);
    const token=user.createJwt();
    res.status(StatusCodes.OK).json({
        "token":token,
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