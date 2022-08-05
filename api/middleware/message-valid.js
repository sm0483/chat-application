const Joi=require('joi');
const joiValidate=require('../jModels/message');
const {StatusCodes}=require('http-status-codes');

const getError=(error)=>{
    const arr=[];
    for(detail of error){
        arr.push(detail.message);
    }
    
    const message=arr.join(',');
    return message;
}


const messageValidate=async(req,res,next)=>{
    const validate=await joiValidate.validate(req.body,{abortEarly:false});
    if(validate.error){
        const errorMessage=getError(validate.error.details);
        console.log('form'+errorMessage);
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        "error":errorMessage,
        "status":StatusCodes.UNPROCESSABLE_ENTITY
        })
    }
    return next(); 
}
    


module.exports=messageValidate;