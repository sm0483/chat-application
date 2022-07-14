const joiValidate=require('../jModels/user-login');
const {getError}=require('../middleware/userValidate');
const {
    StatusCodes,
    getReasonPhrase
}=require('http-status-codes');


const loginValidate=async(req,res,next)=>{
    const validate=await joiValidate.validate(req.body,{abortEarly:false});
    if(validate.error){
        let errorMessage=getError(validate.error.details);
        console.log('from uservalid: '+errorMessage);
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        "error":errorMessage,
        "status":StatusCodes.UNPROCESSABLE_ENTITY
        })

       
    }
    return next(); 
}

module.exports={loginValidate};