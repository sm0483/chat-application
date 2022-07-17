const {getError}=require('./userValidate')
const joiValidate=require('../jModels/update');
const {StatusCodes}=require('http-status-codes');


const updateValidate=async(req,res,next)=>{
    const validate=await joiValidate.validate(req.body,{abortEarly:false});
    if(validate.error){
        const errorMessage=getError(validate.error.details);
        console.log('from uservalid: '+errorMessage);
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        "error":errorMessage,
        "status":StatusCodes.UNPROCESSABLE_ENTITY
        })

       
    }
    return next(); 
}
   
module.exports=updateValidate;