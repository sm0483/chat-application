const CustomError = require('../error/custom');
const joiValidate=require('../jModels/user');
const {
    StatusCodes,
    getReasonPhrase
}=require('http-status-codes');

const getError=(validate)=>{
    if(validate.includes("email")){
        return "Not an email";
    }
    else if(validate.includes("password")){
        return "password must have at least one Capital letter and number and one sympol";
    }
    else if(validate.includes("username")){
        return "username must have atleast 4 terms";
    }
}




const userValidate=async(req,res,next)=>{
    const validate=await joiValidate.validate(req.body);
    console.log(validate.error);
    if(validate.error){
        const errorMessage=getError(validate.error.message);
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            "error":errorMessage,
            "status":StatusCodes.UNPROCESSABLE_ENTITY
            })

       
    }
    return next(); 
}
    

module.exports=userValidate;