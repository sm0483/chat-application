const asyncWrapper = require("../error/asyncWrapper")
const CustomError=require('../error/custom');
const jwt=require('jsonwebtoken');
const {
    StatusCodes,
    getReasonPhrase
}=require('http-status-codes');



const matchToken=asyncWrapper(async(req,res,next)=>{
    let token=req.headers.authorization;
    const method=req.method;
    if(!token)throw new CustomError("token not present",StatusCodes.UNAUTHORIZED);
    token=token.split(' ')[1];
    try{
        const isValid=await jwt.verify(token,process.env.jwtKey);
        const senderId=isValid.userId;
        if(method==='POST'){
            if(req.body.senderId!==senderId) throw new CustomError(getReasonPhrase(StatusCodes.FORBIDDEN),StatusCodes.FORBIDDEN);
        }
    }
    catch(err){
        throw new CustomError(getReasonPhrase(StatusCodes.UNAUTHORIZED),StatusCodes.UNAUTHORIZED);
    }

    return next();  
})

 module.exports=matchToken;