const Joi=require('joi');
const joiValidate=require('../jModels/contact');
const {StatusCodes}=require('http-status-codes');

const getError=(error)=>{
    const arr=[];
    for(detail of error){
        arr.push(detail.message);
    }
    
    const message=arr.join(',');
    return message;
}


const contactValidate=async(req,res,next)=>{
    const validate=await joiValidate.validate(req.body,{abortEarly:false});
    if(validate.error){
        const errorMessage=getError(validate.error.details);
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        "error":errorMessage,
        "status":StatusCodes.UNPROCESSABLE_ENTITY
        })
    }
    return next(); 
}
    


module.exports=contactValidate;