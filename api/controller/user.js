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
    const responce=await user.comparePassword(password);
    console.log(responce);
    if(!responce)throw new CustomError(`${getReasonPhrase(StatusCodes.UNAUTHORIZED)}`,StatusCodes.UNAUTHORIZED);
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