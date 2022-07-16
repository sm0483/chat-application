const asyncWrapper=require('../error/asyncWrapper');
const {createUserDb, getUserbyMailDb,}=require('../db/db-operation');
const CustomError = require('../error/custom');
const {getReasonPhrase,StatusCodes}=require('http-status-codes');

const passwordAuth=asyncWrapper(async(req,res,next)=>{
    const {email,password}=req.body;
    const user=await getUserbyMailDb(email);
    const isPassword=await user.comparePassword(password);
    if(!isPassword)throw new CustomError(`${getReasonPhrase(StatusCodes.UNAUTHORIZED)}`,StatusCodes.UNAUTHORIZED);
    req.userDb=user;
    next();
})

module.exports=passwordAuth;