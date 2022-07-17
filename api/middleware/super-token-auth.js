const asyncWrapper = require("../error/asyncWrapper");
const CustomError=require('../error/custom');
const jwt=require('jsonwebtoken');
const {
    StatusCodes,
    getReasonPhrase
}=require('http-status-codes');



const supertokenValidate=asyncWrapper(async(req,res,next)=>{
    let token=req.headers.authorization;
     if(!token)throw new CustomError("token not present",StatusCodes.UNAUTHORIZED);
    token=token.split(' ')[1];
    try{
        const isValid=await jwt.verify(token,process.env.jwtSuperKey);
        if( !isValid.scope ||isValid.scope!="update-delete") throw new Error('error');
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

module.exports=supertokenValidate;
