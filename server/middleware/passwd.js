const CustomError = require('../error/custom');
const customError=require('../error/custom');
const mdRegex=new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
const stRegex=new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))');
const passwordValidate=(req,res,next)=>{
    const passwd=req.body.password;
    const testStrong=stRegex.test(passwd);
    const testMedium=mdRegex.test(passwd);
    if(testStrong){
        req.level="strong";
        return next();
    }
    else if(testMedium){
        req.level="medium";
        return next();
    }
    throw new CustomError('password doesn"t support',400);
}

module.exports=passwordValidate;