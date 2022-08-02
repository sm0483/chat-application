const asyncWrapper = require("../error/asyncWrapper")
const CustomError=require('../error/custom');
const jwt=require('jsonwebtoken');
const {
    StatusCodes,
    getReasonPhrase
}=require('http-status-codes');



const matchTokenWithUserId=asyncWrapper(async(req,res,next)=>{
        let token=req.headers.authorization;
        const {senderId}=req.body;
        if(!token)throw new CustomError("token not present",StatusCodes.UNAUTHORIZED);
        token=token.split(' ')[1];
        try{
            const isValid=await jwt.verify(token,process.env.jwtKey);

            if(isValid.userId!==senderId){
                throw new Error();
            }
        }
        catch(err){
            throw new CustomError(getReasonPhrase(StatusCodes.UNAUTHORIZED),StatusCodes.UNAUTHORIZED);
        }
    
        return next();  
    

})


module.exports=matchTokenWithUserId;