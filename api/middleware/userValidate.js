const CustomError = require('../error/custom');
const joiValidate=require('../jModels/user');
const {
    StatusCodes,
    getReasonPhrase
}=require('http-status-codes');

const getError=(validate)=>{
    let errorArray=[];
    for(detail of validate){
        errorArray.push(detail.message);
    }
    let message="";
    for(error of errorArray){
        if(error.includes('not allowed')){
            message=message+` ${error},`
        }
        else if(error.includes("email")){
            message=message+" please fill valid email,";
        }
        else if(error.includes("password")){
            message=message+"give valid password{Test@2001},"
        }
        else if(error.includes("username")){
            message=message+"give valid username{atleast 4 charecter},";
        }
    }
    return message;
}




const userValidate=async(req,res,next)=>{
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
    

module.exports={userValidate,getError};