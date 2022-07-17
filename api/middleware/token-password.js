const asyncWrapper = require("../error/asyncWrapper");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const { getUserByQuery } = require("../db/db-operation");
const CustomError = require("../error/custom");
const {getReasonPhrase,StatusCodes}=require('http-status-codes');

const decodeToken=async (password,token)=>{
    const userData=await jwt.verify(token,process.env.jwtKey);
    const data=matchPassword(password,userData.userId);
    return data;
}

const matchPassword=async(password,userId)=>{
    const user=await getUserByQuery({_id:userId});
    const isPassword=await user.comparePassword(password);
    if(isPassword){
        return user;
    }
    return false;
}


const validateTokenWithPassword=asyncWrapper(async(req,res,next)=>{
    let token=req.headers.authorization;
    const {password}=req.body;
    if(!token)throw new CustomError("token not present",StatusCodes.UNAUTHORIZED);
    token=token.split(' ')[1];
    try{
        const data=await decodeToken(password,token);
        if(!data){
            throw new Error('invalid cred');
        }
        req.userDb=data;
    }
    catch(err){
        throw new CustomError(getReasonPhrase(StatusCodes.UNAUTHORIZED),StatusCodes.UNAUTHORIZED);
    }

    return next();
  
})

module.exports=validateTokenWithPassword;