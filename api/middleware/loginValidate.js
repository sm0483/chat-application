const joiValidate=require('../jModels/user-login');
const {
    StatusCodes,
    getReasonPhrase
}=require('http-status-codes');

const getMessage=(message)=>{
    if(message.includes('email')){
        return "give a valid email"
    }
    else if(message.includes('password')){
        return "password field can't be empty"
    }
    else if(message.includes(' not allowed')){
        return "request format is not correct"
    }

}

const validate=(req,res,next)=>{
    const validate= joiValidate.validate(req.body);
    console.log("from login form: "+validate.error);
    if(validate.error){
        const errMessage=getMessage(validate.error.message);
        return res.status(StatusCodes.BAD_REQUEST).json({
            "error":errMessage,
            "status":StatusCodes.BAD_REQUEST
        })
    }

    return next();

}

module.exports=validate;