const asyncWrapper = require("../error/asyncWrapper")
const CustomError=require('../error/custom');
const jwt=require('jsonwebtoken');
const {
    StatusCodes,
    getReasonPhrase
}=require('http-status-codes');



const authJwt=asyncWrapper(async(req,res,next)=>{
    let token=req.headers.authorization;
    if(!token)throw new CustomError("token not valid",401);
    token=token.split(' ')[1];
    try{
        const isValid=await jwt.verify(token,process.env.jwtKey);
        req.user={
            "email":isValid.email,
            "username":isValid.username,
            "userId":isValid.userId
        }
    }
    catch(err){
        throw new CustomError(getReasonPhrase(StatusCodes.UNAUTHORIZED),StatusCodes.UNAUTHORIZED);
    }

    return next();  
})

module.exports=authJwt;